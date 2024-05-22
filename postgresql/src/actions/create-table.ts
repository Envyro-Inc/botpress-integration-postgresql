import { getClient } from '../client';
import { createTableInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const createTable: Implementation['actions']['createTable'] = async ({ ctx, logger, input }) => {
  const validatedInput = createTableInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    await dbClient.connect();

    const { tableName, columns } = validatedInput;

    // Use columns directly as it is now a string
    const columnsDefinition = columns.split(',').map(col => col.trim()).join(', ');
    const query = `CREATE TABLE ${tableName} (${columnsDefinition})`;

    // Log the constructed query for debugging
    logger.forBot().debug(`Constructed query: ${query}`);

    const result = await dbClient.query(query, []);

    logger.forBot().info(`Successful - Create Table '${tableName}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: "Table Created",
    };
  } catch (error) {
    logger.forBot().debug(`'Create Table' exception: ${JSON.stringify(error)}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
