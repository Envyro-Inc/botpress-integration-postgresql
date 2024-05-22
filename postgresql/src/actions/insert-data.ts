import { getClient } from '../client';
import { insertDataInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const insertData: Implementation['actions']['insertData'] = async ({ ctx, logger, input }) => {
  const validatedInput = insertDataInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    await dbClient.connect();

    const { table, columns, values } = validatedInput;

    // Parse columns and values
    const columnsArray = columns.split(',').map(col => col.trim());
    const valuesArray = values.split(',').map(val => val.trim());

    if (columnsArray.length !== valuesArray.length) {
      throw new Error('The number of columns must match the number of values');
    }

    const columnNames = columnsArray.join(', ');
    const valuePlaceholders = valuesArray.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO ${table} (${columnNames}) VALUES (${valuePlaceholders})`;
    
    // Log the constructed query and parameters for debugging
    logger.forBot().debug(`Constructed query: ${query}`);
    logger.forBot().debug(`Query parameters: ${JSON.stringify(valuesArray)}`);

    const result = await dbClient.query(query, valuesArray);

    logger.forBot().info(`Successful - Insert Data into '${table}'`);
    logger.forBot().debug(`Response - ${JSON.stringify(result)}`);

    return result;
  } catch (error) {
    logger.forBot().debug(`'Insert Data' exception: ${JSON.stringify(error)}`);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
