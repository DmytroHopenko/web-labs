const MAX_NAME_LENGTH = 128;
const ZIP_CODE_LENGTH = 5;
const NAME_REGEX = /^[a-zA-Z\s-]+$/;
const ZIP_CODE_REGEX = /^[0-9]+$/;

class University {
  constructor(name, city, zipCode) {
    this.setName(name);
    this.setCity(city);
    this.setZipCode(zipCode);
  }


  getName() {
    return this._name;
  }

  
  setName(newName) {
    if (typeof newName !== 'string' || !NAME_REGEX.test(newName) || newName.length > MAX_NAME_LENGTH) {
      throw new Error(`Name must contain only letters, spaces, and hyphens, with a maximum length of ${MAX_NAME_LENGTH} characters.`);
    }
    this._name = newName;
  }

  getCity() {
    return this._city;
  }

  setCity(newCity) {
    this._city = newCity;
  }

  getZipCode() {
    return this._zipCode;
  }

  setZipCode(newZipCode) {
    const zipCodeStr = String(newZipCode);
    if (!ZIP_CODE_REGEX.test(zipCodeStr) || zipCodeStr.length > ZIP_CODE_LENGTH) {
      throw new Error(`Zip code must contain only digits with a maximum length of ${ZIP_CODE_LENGTH}.`);
    }
    this._zipCode = parseInt(zipCodeStr, 10);
  }

  getAddress() {
    return `"${this._name}" - ${this._city.toUpperCase()}, ${this._zipCode}`;
  }
}

export default University;