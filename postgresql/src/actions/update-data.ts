import { getClient } from '../client';
import { updateDataInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const updateData: Implementation['actions']['updateData'] = async ({ ctx, logger, input }) => {
  const validatedInput = updateDataInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    await dbClient.connect();
    const { table, updateColumn, newValue, conditions, logicalOperators } = validatedInput;

    // Parse updateColumn and newValue
    const updateColumnsArray = updateColumn.split(',').map(col => col.trim());
    const newValuesArray = newValue.split(',').map(val => val.trim());

    if (updateColumnsArray.length !== newValuesArray.length) {
      throw new Error('The number of update columns and values must match');
    }

    // Parse conditions and logical operators
    const conditionsArray = conditions.split(';').map(cond => cond.trim());
    const operatorsArray = logicalOperators.split(',').map(op => op.trim());

    // Ensure we have one fewer operator than conditions
    if (operatorsArray.length !== conditionsArray.length - 1) {
      throw new Error(`The number of logical operators must be one less than the number of conditions.`);
    }

    // Construct the SET clause
    const setClauses = updateColumnsArray.map((col, index) => `${col} = $${index + 1}`).join(', ');

    // Construct the WHERE clause
    let whereClause = '';
    for (let i = 0; i < conditionsArray.length; i++) {
      const match = conditionsArray[i].match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
      if (!match) {
        throw new Error(`Invalid condition format: ${conditionsArray[i]}`);
      }
      const [, column, operator, value] = match;
      whereClause += `${column.trim()} ${operator.trim()} $${updateColumnsArray.length + i + 1}`;
      if (i < operatorsArray.length) {
        whereClause += ` ${operatorsArray[i]} `;
      }
    }

    const params = [
      ...newValuesArray,
      ...conditionsArray.map(condition => {
        const match = condition.match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
        return match ? match[3].trim() : '';
      })
    ];

    const query = `UPDATE ${table} SET ${setClauses} WHERE ${whereClause}`;
    
    // Log the constructed query and parameters for debugging
    logger.forBot().debug(`Constructed query: ${query}`);
    logger.forBot().debug(`Query parameters: ${JSON.stringify(params)}`);

    const result = await dbClient.query(query, params, "Update query completed.");

    logger.forBot().info(`Successful - Update Data in '${table}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    logger.forBot().debug(`'Update Data' exception: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
