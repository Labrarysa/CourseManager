import { defineDb, defineTable, column } from 'astro:db';

const Student = defineTable({
  columns: {
    id: column.text(), // Later we will automate it to get a default uuid.
    firstName: column.text(),
    fatherName: column.text(),
    grandFatherName: column.text(),
    lastName: column.text(),
    birthDate: column.date()
  },
});


// https://astro.build/db/config
export default defineDb({
  tables: { Student },
});





