import { exit } from 'process';
import { seedCategories, seedDishes, seedEmployees, seedIngredients, seedMessages, seedOrders, seedUsers } from './seed/seed.mjs';

/*

    This is our default setup for a seeding file - it is low key and primitive until we have found
    the struture for our projects.

*/

console.log('----------------------')
console.log('Media College Viborg')
console.log('Seeding files')
console.log('----------------------\n')

await seedUsers();
await seedDishes();
await seedMessages();
await seedEmployees();
await seedIngredients();
await seedCategories();
await seedOrders();

console.log('\n----------------------')
console.log('Seeding files completed')
console.log('----------------------')

exit();