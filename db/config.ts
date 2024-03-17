import { defineDb, defineTable, column } from 'astro:db';

const Student = defineTable({
  columns: {
    id: column.text({ default: Math.random().toString() }),
    firstName: column.text(),
    lastName: column.text()
  },
});


// https://astro.build/db/config
export default defineDb({
  tables: { Student },
});





