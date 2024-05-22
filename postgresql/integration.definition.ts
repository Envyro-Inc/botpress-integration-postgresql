import { IntegrationDefinition, Schema, z } from '@botpress/sdk';
import { name, integrationName } from './package.json';

import {
  createTableInputSchema,
  createTableOutputSchema,
  dropTableInputSchema,
  dropTableOutputSchema,
  insertDataInputSchema,
  insertDataOutputSchema,
  deleteDataInputSchema,
  deleteDataOutputSchema,
  updateDataInputSchema,
  updateDataOutputSchema,
  queryDataInputSchema,
  queryDataOutputSchema,
  customQueryInputSchema,
  customQueryOutputSchema,
} from './src/misc/custom-schemas';

export default new IntegrationDefinition({
  name: integrationName ?? name,
  version: '24.5.0',
  title: 'PostgreSQL',
  readme: 'hub.md',
  icon: 'icon.svg',
  description: 
    'Empower your Botpress chatbot with PostgreSQL to manage your database. Create, query, update, and delete database tables directly through your chatbot. Ideal for automating database workflows.',
  configuration: {
    schema: z.object({
      dbUser: z.string(),                 // PostgreSQL User
      dbHost: z.string(),                 // PostgreSQL Host
      dbName: z.string(),                 // PostgreSQL Database Name
      dbPassword: z.string().hidden(),    // PostgreSQL Password
      dbPort: z.number(),                 // PostgreSQL Port
    })
  },
  events: {},
  user: {
    tags: {
      id: {
        title: "PostgreSQL User",
      }
    }
  },
  channels: {},
  states: {},
  actions: {
    createTable: {
      title: 'Create Table',
      input: {
        schema: createTableInputSchema
      },
      output: {
        schema: createTableOutputSchema
      }
    },
    dropTable: {
      title: 'Drop Table',
      input: {
        schema: dropTableInputSchema
      },
      output: {
        schema: dropTableOutputSchema
      }
    },
    insertData: {
      title: 'Insert Data',
      input: {
        schema: insertDataInputSchema
      },
      output: {
        schema: insertDataOutputSchema
      }
    },
    deleteData: {
      title: 'Delete Data',
      input: {
        schema: deleteDataInputSchema
      },
      output: {
        schema: deleteDataOutputSchema
      }
    },
    updateData: {
      title: 'Update Data',
      input: {
        schema: updateDataInputSchema
      },
      output: {
        schema: updateDataOutputSchema
      }
    },
    queryData: {
      title: 'Query Data',
      input: {
        schema: queryDataInputSchema
      },
      output: {
        schema: queryDataOutputSchema
      }
    },
    customQuery: {
      title: 'Custom Query',
      input: {
        schema: customQueryInputSchema
      },
      output: {
        schema: customQueryOutputSchema
      }
    }
  }
});
