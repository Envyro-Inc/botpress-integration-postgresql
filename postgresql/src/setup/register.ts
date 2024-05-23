import { getClient } from 'src/client';
import * as bpclient from "@botpress/client";
import type { RegisterFunction } from '../misc/types';

export const register: RegisterFunction = async ({ ctx, logger }) => {
  let dbClient;

  try {
    // Get the Postgres client
    dbClient = getClient(ctx.configuration);

    await dbClient.connect();

    // Test the connection by running a simple query
    const result = await dbClient.query('SELECT NOW()', [], "Test registration query completed.");
    if (result.success == false) {
      throw new Error(result.message);
    }

    logger.forBot().info(result)
    logger.forBot().info("Successfully accessed PostgreSQL: Integration can proceed");
    if (dbClient) {
      await dbClient.disconnect();
    }
  } catch (error) {
    // If there's an error in the command, it will come here
    logger.forBot().error("Failed to access PostgreSQL: Check configuration", error);

    throw new bpclient.RuntimeError(
      `Configuration ${error}`
    );
  }
};
