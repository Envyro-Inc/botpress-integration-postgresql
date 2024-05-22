import { getClient } from '../client';
import { customQueryInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const customQuery: Implementation['actions']['customQuery'] = async ({ ctx, logger, input }) => {
  const validatedInput = customQueryInputSchema.parse(input);

  let dbClient;

  try {
    dbClient = getClient(ctx.configuration);
    await dbClient.connect()

    const { query } = validatedInput;
    logger.forBot().info(`${JSON.stringify(query)}`);

    const result = await dbClient.query(query, [], "Custom query completed.");
    
    logger.forBot().info(`Successful - Custom Query`);
    logger.forBot().info(result)
    return result;
  } catch (error) {
    logger.forBot().info(`'Custom query' exception ${JSON.stringify(error)}`);
    throw error; 
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
