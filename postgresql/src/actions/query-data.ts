import { getClient } from '../client';
import { queryDataInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const queryData: Implementation['actions']['queryData'] = async ({ ctx, logger, input }) => {
  const validatedInput = queryDataInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    await dbClient.connect();
    const { table, selectColumn, conditions, logicalOperators } = validatedInput;

    // Parse selectColumn
    const selectColumnsArray = selectColumn.split(',').map(col => col.trim());

    // Parse conditions and logical operators
    const conditionsArray = conditions.split(';').map(cond => cond.trim());
    const operatorsArray = logicalOperators.split(',').map(op => op.trim());

    // Ensure we have one fewer operator than conditions
    if (operatorsArray.length !== conditionsArray.length - 1) {
      throw new Error(`The number of logical operators must be one less than the number of conditions.`);
    }

    // Construct the SELECT clause
    const selectClause = selectColumnsArray.join(', ');

    // Construct the WHERE clause
    let whereClause = '';
    for (let i = 0; i < conditionsArray.length; i++) {
      const match = conditionsArray[i].match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
      if (!match) {
        throw new Error(`Invalid condition format: ${conditionsArray[i]}`);
      }
      const [, column, operator, value] = match;
      whereClause += `${column.trim()} ${operator.trim()} $${i + 1}`;
      if (i < operatorsArray.length) {
        whereClause += ` ${operatorsArray[i]} `;
      }
    }

    const params = conditionsArray.map(condition => {
      const match = condition.match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
      return match ? match[3].trim() : '';
    });

    const query = `SELECT ${selectClause} FROM ${table} WHERE ${whereClause}`;

    // Log the constructed query and parameters for debugging
    logger.forBot().debug(`Constructed query: ${query}`);
    logger.forBot().debug(`Query parameters: ${JSON.stringify(params)}`);

    const result = await dbClient.query(query, params, "Read query completed.");

    logger.forBot().info(`Successful - Query Data from '${table}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    logger.forBot().debug(`'Query Data' exception: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
