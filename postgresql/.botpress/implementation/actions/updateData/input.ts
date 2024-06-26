/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Input {
  /**
   * The name of the table.
   */
  table: string;
  /**
   * A comma-separated string of columns to update. For example, name,email
   */
  updateColumn: string;
  /**
   * A comma-separated string of new values to set. For example, Jane Doe,jane.doe@example.com
   */
  newValue: string;
  /**
   * A semicolon-separated string of conditions. For example, email=john.doe@example.com;age>30
   */
  conditions: string;
  /**
   * The logical operators to join conditions. For example, AND,OR
   */
  logicalOperators?: string;
}
