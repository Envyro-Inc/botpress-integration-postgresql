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
   * A comma-separated string of columns. For example, name,email
   */
  columns: string;
  /**
   * A comma-separated string of values. For example, John Doe,john.doe@example.com
   */
  values: string;
}
