import { Faker, ar } from '@faker-js/faker';
import { Student, db, } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// Generate random 10 students
	await db.insert(Student).values(Array.from({ length: 100 }, () => createRandomStudent()))
}


const faker = new Faker({
	locale: [ar],
});

/**
 * Create a random student data.
 * Warning: It is not typed yet.
 * @returns student
 */
function createRandomStudent() {
	return {
		id: faker.string.uuid(),
		firstName: faker.person.firstName("male"),
		fatherName: faker.person.firstName("male"),
		grandFatherName: faker.person.firstName("male"),
		lastName: faker.person.lastName(),
		birthDate: faker.date.between({ from: new Date(2000), to: new Date(2015) })
	}
}