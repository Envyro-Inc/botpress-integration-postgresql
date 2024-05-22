import { getClient } from '../client';
import type { UnregisterFunction } from '../misc/types';

export const unregister: UnregisterFunction = async ({ ctx, logger }) => {
  let dbClient;

  try {
    // Get the Postgres client
    dbClient = getClient(ctx.configuration);

    await dbClient.connect();

    // Perform any necessary cleanup actions here
    // For example, close any open connections or clean up any temporary tables

    // Log the action to indicate that the unregister process has been completed
    logger.forBot().info("Unregister process for PostgreSQL integration completed successfully.");
  } catch (error) {
    // If there's an error during the unregister process, log it
    logger.forBot().error("Failed to unregister PostgreSQL integration: Check configuration", error);
  } finally {
    if (dbClient) {
      await dbClient.disconnect();
    }
  }
};
