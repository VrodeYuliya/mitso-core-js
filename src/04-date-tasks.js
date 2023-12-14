function parseDataFromRfc2822(value) {
  return new Date(value);
}

function parseDataFromIso8601(value) {
  return new Date(value);
}

function isLeapYear(date) {
  const year = date.getFullYear();
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}

function timeSpanToString(startDate, endDate) {
  const timeDiff = endDate - startDate;
  const milliseconds = Math.floor(timeDiff % 1000);
  const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(milliseconds).padStart(3, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function angleBetweenClockHands(date) {
  const hours = date.getUTCHours() % 12;
  const minutes = date.getUTCMinutes();

  const hoursAngle = 0.5 * (60 * hours + minutes);
  const minutesAngle = 6 * minutes;

  let angle = Math.abs(hoursAngle - minutesAngle);
  angle = Math.min(360 - angle, angle);

  return (angle * Math.PI) / 180;
}

function getDay(dayNumber, isLeap) {
  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: isLeap ? 29 : 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];

  let remainingDays = dayNumber;
  let currentMonthIndex = 0;

  while (remainingDays > months[currentMonthIndex].days) {
    remainingDays -= months[currentMonthIndex].days;
    currentMonthIndex += 1;
  }

  const monthName = months[currentMonthIndex].name;
  const dayOfMonth = remainingDays;

  return `${monthName}, ${dayOfMonth}`;
}

module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
  getDay,
};
