let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;

const monthNames = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const lastDate = lastDay.getDate();
  const today = new Date();
  let datesHTML = "";

  document.getElementById(
    "month-year"
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    datesHTML += `<div class="inactive">${prevLastDay - i}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const isToday =
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
    const isWeekend =
      new Date(currentYear, currentMonth, i).getDay() % 7 === 0 ||
      new Date(currentYear, currentMonth, i).getDay() % 7 === 6;
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === i &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;
    let classes = "";
    if (isToday) classes += "today ";
    if (isWeekend) classes += "weekend ";
    if (isSelected) classes += "selected ";
    datesHTML += `<div class="${classes.trim()}" onclick="selectDate(${i})">${i}</div>`;
  }

  const remainingCells = (firstDayIndex + lastDate) % 7;
  if (remainingCells !== 0) {
    for (let i = 1; i <= 7 - remainingCells; i++) {
      datesHTML += `<div class="inactive">${i}</div>`;
    }
  }

  document.getElementById("dates").innerHTML = datesHTML;
}

function selectDate(day) {
  selectedDate = new Date(currentYear, currentMonth, day);
  renderCalendar();
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

renderCalendar();
