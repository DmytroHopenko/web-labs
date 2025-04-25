import User from './user.js';
import University from './university.js';

const YEAR_LENGTH = 4;
const MIN_YEAR = 1900;

class Student extends User {
  static counter = 0;

  constructor(name, surname, bDate, year, university) {
    super(name, surname, bDate);
    this.setYear(year);
    this.setUniversity(university);
    Student.counter++;
  }

  getYear() {
    return this._year;
  }

  setYear(newYear) {
    const yearStr = String(newYear);
    const currentYear = new Date().getFullYear();
    if (!/^[0-9]+$/.test(yearStr) || yearStr.length !== YEAR_LENGTH || parseInt(yearStr, 10) < MIN_YEAR || parseInt(yearStr, 10) > currentYear) {
      throw new Error(`Admission year must be a 4-digit number between ${MIN_YEAR} and ${currentYear}.`);
    }
    this._year = parseInt(yearStr, 10);
  }

  getUniversity() {
    return this._university;
  }

  setUniversity(newUniversity) {
    if (newUniversity && !(newUniversity instanceof University)) {
      throw new Error('University must be an instance of the University class.');
    }
    this._university = newUniversity;
  }

  getCourse() {
    const currentYear = new Date().getFullYear();
    const course = currentYear - this._year;
    return Math.min(Math.max(1, course), 6);
  }

  isFinished() {
    const currentYear = new Date().getFullYear();
    return currentYear - this._year > 6;
  }

  static getCounter() {
    return Student.counter;
  }

  getFullInfo() {
    const baseInfo = super.getFullInfo();
    const universityName = this._university ? `"${this._university.getName()}"` : 'Unknown University';
    return `${baseInfo}, ${universityName}, ${this._year}`;
  }
}

export default Student;