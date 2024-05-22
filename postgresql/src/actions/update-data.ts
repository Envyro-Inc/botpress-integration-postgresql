import { getClient } from '../client';
import { updateDataInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const updateData: Implementation['actions']['updateData'] = async ({ ctx, logger, input }) => {
  const validatedInput = updateDataInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    dbClient.connect()
    const { table, updateColumn, newValue, conditions, logicalOperator } = validatedInput;

    // Parse updateColumn and newValue
    const updateColumnsArray = updateColumn.split(',').map(col => col.trim());
    const newValuesArray = newValue.split(',').map(val => val.trim());

    if (updateColumnsArray.length !== newValuesArray.length) {
      throw new Error('The number of update columns and values must match');
    }

    // Parse conditions
    const conditionsArray = conditions.split(',').map(cond => cond.trim());

    // Construct the SET clause
    const setClauses = updateColumnsArray.map((col, index) => `${col} = $${index + 1}`).join(', ');

    // Construct the WHERE clause
    const whereClauses = conditionsArray.map((condition, index) => {
      const match = condition.match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
      if (!match) {
        throw new Error(`Invalid condition format: ${condition}`);
      }
      const [, column, operator, value] = match;
      return `${column.trim()} ${operator.trim()} $${updateColumnsArray.length + index + 1}`;
    }).join(` ${logicalOperator} `);

    const params = [
      ...newValuesArray,
      ...conditionsArray.map(condition => {
        const match = condition.match(/(.+?)(=|!=|<|>|<=|>=)(.+)/);
        return match ? match[3].trim() : '';
      })
    ];

    const query = `UPDATE ${table} SET ${setClauses} WHERE ${whereClauses}`;
    
    // Log the constructed query and parameters for debugging
    logger.forBot().debug(`Constructed query: ${query}`);
    logger.forBot().debug(`Query parameters: ${JSON.stringify(params)}`);

    const result = await dbClient.query(query, params);

    logger.forBot().info(`Successful - Update Data in '${table}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return result
  } catch (error) {
    logger.forBot().debug(`'Update Data' exception: ${JSON.stringify(error)}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
