import { z } from '@botpress/sdk';

// Input and Output Schemas for createTable
export const createTableInputSchema = z.object({
  tableName: z.string().describe('The name of the table to create.').placeholder('users'),
  columns: z.string().describe('A comma-separated string representing the columns and their types').placeholder('id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE NOT NULL')
});

export const createTableOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the operation was successful'),
  message: z.string().describe('A message related to the operation result'),
  data: z.object({
    rowCount: z.number().optional().describe('Number of rows affected'),
    rows: z.array(z.any()).optional().describe('The resulting rows')
  }).optional()
});

// Input and Output Schemas for dropTable
export const dropTableInputSchema = z.object({
  tableName: z.string().describe('The name of the table to drop.').placeholder('users')
});

export const dropTableOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the operation was successful'),
  message: z.string().describe('A message related to the operation result'),
  data: z.object({
    rowCount: z.number().optional().describe('Number of rows affected'),
    rows: z.array(z.any()).optional().describe('The resulting rows')
  }).optional()
});

// Input and Output Schemas for insertData
export const insertDataInputSchema = z.object({
  table: z.string().describe('The name of the table.').placeholder('users'),
  columns: z.string().describe('A comma-separated string of columns').placeholder('name,email'),
  values: z.string().describe('A comma-separated string of values').placeholder('John Doe,john.doe@example.com')
});

export const insertDataOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the operation was successful'),
  message: z.string().describe('A message related to the operation result'),
  data: z.object({
    rowCount: z.number().optional().describe('Number of rows affected'),
    rows: z.array(z.any()).optional().describe('The resulting rows')
  }).optional()
});

// Input and Output Schemas for deleteData
export const deleteDataInputSchema = z.object({
  table: z.string().describe('The name of the table.').placeholder('users'),
  conditions: z.string().describe('A comma-separated string of conditions').placeholder('email = john.doe@example.com, age > 30'),
  logicalOperator: z.string().describe('The logical operator to join conditions').optional().default('AND').placeholder('AND')
});

export const deleteDataOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the operation was successful'),
  message: z.string().describe('A message related to the operation result'),
  data: z.object({
    rowCount: z.number().optional().describe('Number of rows affected'),
    rows: z.array(z.any()).optional().describe('The resulting rows')
  }).optional()
});

// Input and Output Schemas for updateData
export const updateDataInputSchema = z.object({
  table: z.string().describe('The name of the table.').placeholder('users'),
  updateColumn: z.string().describe('A comma-separated string of columns to update. For example, name,email').placeholder('name,email'),
  newValue: z.string().describe('A comma-separated string of new values to set. For example, Jane Doe,jane.doe@example.com').placeholder('Jane Doe,jane.doe@example.com'),
  conditions: z.string().describe('A semicolon-separated string of conditions. For example, email = john.doe@example.com;age > 30').placeholder('email = john.doe@example.com;age > 30'),
  logicalOperator: z.string().describe('The logical operator to join conditions. For example, AND, OR').optional().default('AND').placeholder('AND')
});


export const updateDataOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the operation was successful'),
  message: z.string().describe('A message related to the operation result'),
  data: z.object({
    rowCount: z.number().optional().describe('Number of rows affected'),
    rows: z.array(z.any()).optional().describe('The resulting rows')
  }).optional()
});

// Input and Output Schemas for queryData
export const queryDataInputSchema = z.object({
  table: z.string().describe('The name of the table.').placeholder('users'),
  selectColumn: z.string().describe('A comma-separated string of columns to select').placeholder('name,email'),
  conditions: z.string().describe('A comma-separated string of conditions').placeholder('email = john.doe@example.com, age > 30'),
  logicalOperator: z.string().describe('The logical operator to join conditions').optional().default('AND').placeholder('AND')
});

export const queryDataOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the operation was successful'),
  message: z.string().describe('A message related to the operation result'),
  data: z.object({
    rowCount: z.number().optional().describe('Number of rows affected'),
    rows: z.array(z.any()).optional().describe('The resulting rows')
  }).optional()
});

// Input and Output Schemas for customQuery
export const customQueryInputSchema = z.object({
  query: z.string().describe('The SQL query to execute.').placeholder('SELECT * FROM users WHERE email = $1'),
});

export const customQueryOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the operation was successful'),
  message: z.string().describe('A message related to the operation result'),
  data: z.object({
    rowCount: z.number().optional().describe('Number of rows affected'),
    rows: z.array(z.any()).optional().describe('The resulting rows')
  }).optional()
});
