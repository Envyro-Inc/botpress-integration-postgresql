import { getClient } from '../client';
import { deleteDataInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const deleteData: Implementation['actions']['deleteData'] = async ({ ctx, logger, input }) => {
  const validatedInput = deleteDataInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    await dbClient.connect()
    const { table, conditions, logicalOperator } = validatedInput;

    // Parse conditions
    const conditionsArray = conditions.split(',').map(cond => cond.trim());

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

    const query = `DELETE FROM ${table} WHERE ${whereClauses}`;
    
    // Log the constructed query and parameters for debugging
    logger.forBot().debug(`Constructed query: ${query}`);
    logger.forBot().debug(`Query parameters: ${JSON.stringify(params)}`);

    const result = await dbClient.query(query, params);

    logger.forBot().info(`Successful - Delete Data from '${table}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return {
      success: true,
      message: 'Data deleted successfully',
      data: result
    };
  } catch (error) {
    logger.forBot().debug(`'Delete Data' exception: ${JSON.stringify(error)}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
