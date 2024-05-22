import { Client } from 'pg';
import { Config } from './misc/types';
import * as bp from '.botpress'
import * as bpclient from "@botpress/client";
import { messages } from '@botpress/sdk';

/**
 * PostgresApi Class: Provides methods to interact with a PostgreSQL database.
 *
 * Methods:
 * - connect: Establishes a connection to the database.
 * - disconnect: Closes the database connection.
 * - query: Executes a query on the database.
 */

export class PostgresApi {
  private client: Client;

  constructor(user: string, host: string, database: string, password: string, port: number) {
    this.client = new Client({
      user,
      host,
      database,
      password,
      port,
    });
  }

  /**
   * Establishes a connection to the database.
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  async connect(): Promise<void> {
    await this.client.connect();
  }

  /**
   * Closes the database connection.
   * @returns {Promise<void>} A promise that resolves when the connection is closed.
   */
  async disconnect(): Promise<void> {
    await this.client.end();
  }

  /**
   * Executes a query on the database.
   * @param {string} query - The SQL query to execute.
   * @returns {Promise<any>} A promise that resolves to the query result.
   */
  async query(query: string, params: string[], successMessage: string): Promise<any> {
    try {
      const result = await this.client.query(query, params);
      // Ensure rowCount is set to 0 if null
      const rowCount = result.rowCount ?? 0;
      return {
        success: true,
        message: successMessage,
        data: {
          rowCount: rowCount,
          rows: result.rows
        }
      };
    }
    catch (error: unknown) {
      const message = (error instanceof Error) ? error.message : "An unknown error occurred";
      return { success: false, message: message };
    }
  }  
}

export function getClient(config: Config) {
  return new PostgresApi(config.dbUser, config.dbHost, config.dbName, config.dbPassword, config.dbPort);
}
