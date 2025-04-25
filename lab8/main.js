import University from './university.js';
import User from './user.js';
import Student from './student.js';
import Worker from './worker.js';


const lp = new University('National University Lviv Polytechnic', 'Lviv', 79000);
console.log(lp.getAddress());

try {
  lp.setName('Lviv National University');
  lp.setZipCode('79001');
  console.log(lp.getAddress());
} catch (error) {
  console.error('University Error:', error.message);
}

const user1 = new User('Misha', 'Savchak', 1991);
console.log(user1.getFullName());
console.log(user1.getFullInfo());

try {
  new User('Invalid Name!', 'Savchak', 1991);
} catch (error) {
  console.error('User Error:', error.message);
}

const student1 = new Student('Misha', 'Savchak', 1991, 2014, lp);
console.log(student1.getCourse());
console.log(student1.isFinished());
console.log(Student.getCounter());
console.log(student1.getFullInfo());

const student2 = new Student('FirstName', 'LastName', 2000, 2019);
console.log(student2.getCourse());
console.log(student2.isFinished());
console.log(Student.getCounter());
console.log(student2.getFullName());
console.log(student2.getFullInfo());

try {
  new Student('Name', 'Surname', 2000, 'invalid', lp);
} catch (error) {
  console.error('Student Error:', error.message);
}
try {
  new Student('Name', 'Surname', 2000, 2020, {});
} catch (error) {
  console.error('Student Error:', error.message);
}


const worker = new Worker('Misha', 'Savchak', 1991, 20, 34);
console.log(worker.getFullName());
console.log(worker.isRetired());
console.log(worker.getSalary());
console.log(worker.getDays());
console.log(worker.getRate());
worker.setRetired(true);
console.log(worker.getSalary());
console.log(Worker.getCounter());

try {
  new Worker('Name', 'Surname', 2000, 'abc', 10);
} catch (error) {
  console.error('Worker Error:', error.message);
}
try {
  new Worker('Name', 'Surname', 2000, 30, 'xyz');
} catch (error) {
  console.error('Worker Error:', error.message);
}