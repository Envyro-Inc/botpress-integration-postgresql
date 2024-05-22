import { getClient } from '../client';
import { dropTableInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const dropTable: Implementation['actions']['dropTable'] = async ({ ctx, logger, input }) => {
  const validatedInput = dropTableInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    await dbClient.connect()
    const { tableName } = validatedInput;

    // Validate the table name to ensure it's safe to use
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
      throw new Error('Invalid table name');
    }

    const query = `DROP TABLE ${tableName}`;
    
    // Log the constructed query for debugging
    logger.forBot().debug(`Constructed query: ${query}`);

    const result = await dbClient.query(query, []);

    logger.forBot().info(`Successful - Drop Table '${tableName}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: "Table Dropped",
    };
  } catch (error) {
    logger.forBot().debug(`'Drop Table' exception: ${JSON.stringify(error)}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
