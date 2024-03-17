import { Student, db, } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Student).values([
		{ firstName: "Ali", lastName: "Al-Shaikh", id: "1" },
		{ firstName: "Hassan", lastName: "", id: "2" }
	])
}
