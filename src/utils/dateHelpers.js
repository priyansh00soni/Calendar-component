// Pure functions only — local time stripped to midnight to prevent UTC drift

export const stripTime = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isBefore = (d1, d2) => stripTime(d1) < stripTime(d2);
export const isAfter = (d1, d2) => stripTime(d1) > stripTime(d2);

export const getMonthYearKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

export const buildGrid = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  //grid
  let startOffset = firstDayOfMonth.getDay() - 1;
  if (startOffset === -1) startOffset = 6;

  const grid = [];
  const today = stripTime(new Date());

  // Previous month overflow
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, daysInPrevMonth - i);
    grid.push(createDayObject(d, false, today));
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    grid.push(createDayObject(d, true, today));
  }

  // Next month overflow 
  let nextMonthDay = 1;
  while (grid.length < 42) {
    const d = new Date(year, month + 1, nextMonthDay++);
    grid.push(createDayObject(d, false, today));
  }

  return grid;
};

const createDayObject = (date, isCurrentMonth, today) => {
  const dayOfWeek = date.getDay();
  return {
    date,
    id: date.getTime(),
    isCurrentMonth,
    isToday: isSameDay(date, today),
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    label: date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
};
