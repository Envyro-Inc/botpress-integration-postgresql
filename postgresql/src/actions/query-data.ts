import { getClient } from '../client';
import { queryDataInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const queryData: Implementation['actions']['queryData'] = async ({ ctx, logger, input }) => {
  const validatedInput = queryDataInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    dbClient.connect()
    const { table, selectColumn, conditions, logicalOperator } = validatedInput;

    // Parse selectColumn
    const selectColumnsArray = selectColumn.split(',').map(col => col.trim());

    // Parse conditions
    const conditionsArray = conditions.split(',').map(cond => cond.trim());

    // Construct the SELECT clause
    const selectClause = selectColumnsArray.join(', ');

    // Construct the WHERE clause
    const whereClauses = conditionsArray.map((condition, index) => {
      const match = condition.match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
      if (!match) {
        throw new Error(`Invalid condition format: ${condition}`);
      }
      const [, column, operator, value] = match;
      return `${column.trim()} ${operator.trim()} $${index + 1}`;
    }).join(` ${logicalOperator} `);

    const params = conditionsArray.map(condition => {
      const match = condition.match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
      return match ? match[3].trim() : '';
    });

    const query = `SELECT ${selectClause} FROM ${table} WHERE ${whereClauses}`;
    
    // Log the constructed query and parameters for debugging
    logger.forBot().debug(`Constructed query: ${query}`);
    logger.forBot().debug(`Query parameters: ${JSON.stringify(params)}`);

    const result = await dbClient.query(query, params);

    logger.forBot().info(`Successful - Query Data from '${table}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return result
  } catch (error) {
    logger.forBot().debug(`'Query Data' exception: ${JSON.stringify(error)}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
