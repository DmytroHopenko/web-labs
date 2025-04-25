const MAX_NAME_LENGTH = 32;
const MAX_SURNAME_LENGTH = 64;
const BDATE_LENGTH = 4;
const MIN_BDATE_YEAR = 1900;
const NAME_SURNAME_REGEX = /^[a-zA-Z-]+$/;

class User {
  constructor(name, surname, bDate) {
    this.setName(name);
    this.setSurname(surname);
    this.setBDate(bDate);
  }

  getName() {
    return this._name;
  }

  setName(newName) {
    if (typeof newName !== 'string' || !NAME_SURNAME_REGEX.test(newName) || newName.length > MAX_NAME_LENGTH) {
      throw new Error(`Name must contain only letters and hyphens, with a maximum length of ${MAX_NAME_LENGTH} characters.`);
    }
    this._name = newName;
  }

  getSurname() {
    return this._surname;
  }

  setSurname(newSurname) {
    if (typeof newSurname !== 'string' || !NAME_SURNAME_REGEX.test(newSurname) || newSurname.length > MAX_SURNAME_LENGTH) {
      throw new Error(`Surname must contain only letters and hyphens, with a maximum length of ${MAX_SURNAME_LENGTH} characters.`);
    }
    this._surname = newSurname;
  }

  getBDate() {
    return this._bDate;
  }

  setBDate(newBDate) {
    const bDateStr = String(newBDate);
    const currentYear = new Date().getFullYear();
    if (!/^[0-9]+$/.test(bDateStr) || bDateStr.length !== BDATE_LENGTH || parseInt(bDateStr, 10) < MIN_BDATE_YEAR || parseInt(bDateStr, 10) > currentYear) {
      throw new Error(`Birth year must be a 4-digit number between ${MIN_BDATE_YEAR} and ${currentYear}.`);
    }
    this._bDate = parseInt(bDateStr, 10);
  }

  getFullName() {
    return `${this._name} ${this._surname}`;
  }

  getFullInfo() {
    return `${this.getFullName()}, ${this._bDate}`;
  }
}

export default User;