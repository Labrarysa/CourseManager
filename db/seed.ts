import { Faker, ar } from '@faker-js/faker';
import { Circle, Group, Student, db, } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// Generate random 10 students
	await db.insert(Student).values(Array.from({ length: 100 }, () => createRandomStudent()))

	await db.insert(Circle).values(Array.from({ length: 12 }, (_, i) => ({ number: i + 1 })))

	await db.insert(Group).values(generateGroups())
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

function generateGroups() {
	const groups = []
	const randomNum = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
	for (let i = 0; i < 12; i++) {
		for (let j = 0; j < randomNum; j++) {
			groups.push({ circle: i, name: faker.person.firstName() }) // Just fake names :)
		}
	}

	return groups;
}