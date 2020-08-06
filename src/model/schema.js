import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'salesforce_id', type: 'string' },
        { name: 'orid', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'status', type: 'string' },
      ],
    }),
  ],
});
