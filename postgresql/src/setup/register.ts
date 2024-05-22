import { getClient } from 'src/client';
import type { RegisterFunction } from '../misc/types';

export const register: RegisterFunction = async ({ ctx, logger }) => {
  let dbClient;

  try {
    // Get the Postgres client
    dbClient = getClient(ctx.configuration);

    await dbClient.connect();

    // Test the connection by running a simple query
    const result = await dbClient.query('SELECT NOW()', []);
    logger.forBot().info(result)
    logger.forBot().info("Successfully accessed PostgreSQL: Integration can proceed");
  } catch (error) {
    // If there's an error in the command, it will come here
    logger.forBot().error("Failed to access PostgreSQL: Check configuration", error);
    return; // Stop the registration process if access fails
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
