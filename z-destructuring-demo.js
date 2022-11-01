const fruits = 'apple banana pear'.split(' '); // In order of bestness

// const bestFruit = fruits[0];
// const secondBestFruit = fruits[1];

const [bestFruit, secondBestFruit, thirdBestFruit] = fruits;

const person = {
  name: 'Garrett',
  email: 'garrett@lighthouselabs.ca', // Not a real email address, don't contact me there!
  location: 'West',
  timezone: 'PST',
};

// const name = person.name;
// const email = person.email;

const { name: teacherName, email } = person;
console.log(person.name);
console.log(teacherName);
