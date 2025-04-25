import User from './user.js';

class Worker extends User {
  static counter = 0;

  constructor(name, surname, bDate, rate, days) {
    super(name, surname, bDate);
    this.setRate(rate);
    this.setDays(days);
    this._retired = false;
    Worker.counter++;
  }

  getRate() {
    return this._rate;
  }

  setRate(newRate) {
    const rateStr = String(newRate);
    if (!/^[0-9]+$/.test(rateStr)) {
      throw new Error('Rate must contain only digits.');
    }
    this._rate = parseInt(rateStr, 10);
  }

  getDays() {
    return this._days;
  }

  setDays(newDays) {
    const daysStr = String(newDays);
    if (!/^[0-9]+$/.test(daysStr)) {
      throw new Error('Days must contain only digits.');
    }
    this._days = parseInt(daysStr, 10);
  }

  isRetired() {
    return this._retired;
  }

  setRetired(newRetired) {
    this._retired = Boolean(newRetired);
  }

  getSalary() {
    return this._retired ? 0 : this._days * this._rate;
  }

  static getCounter() {
    return Worker.counter;
  }
}

export default Worker;