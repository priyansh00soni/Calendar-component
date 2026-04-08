import React, { memo } from 'react';

const DayCell = memo(({ dayObj, isStart, isEnd, isInRange, onClick, onHover }) => {
  const { date, isCurrentMonth, isToday, isWeekend, label } = dayObj;
  const dayNum = date.getDate();

  // the background for the selection range
  let bgClasses = '';
  if (isInRange) {
    if (isStart && isEnd) bgClasses = 'bg-sky-100 rounded-full';
    else if (isStart) bgClasses = 'bg-sky-100 rounded-l-full';
    else if (isEnd) bgClasses = 'bg-sky-100 rounded-r-full';
    else bgClasses = 'bg-sky-100';
  }

  const isSelected = isStart || isEnd;


  const textColor = !isCurrentMonth
    ? 'text-slate-300'
    : isSelected
      ? 'text-white'
      : isWeekend
        ? 'text-[#1A9BE6]'
        : 'text-slate-700';

  const ringClass = isToday && !isSelected ? 'ring-2 ring-slate-900 ring-inset' : '';

  const selectionCircle = isSelected
    ? 'bg-[#1A9BE6]'
    : 'hover:bg-slate-100';

  return (
    <div
      className={`relative w-full h-10 sm:h-11 flex items-center justify-center ${bgClasses}`}
      onMouseEnter={() => onHover(date)}
    >
      <button
        type="button"
        aria-label={label}
        onClick={() => onClick(date)}
        disabled={!isCurrentMonth}
        className={`
          z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full
          text-[13px] font-bold transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1
          ${textColor} ${ringClass} ${isCurrentMonth ? selectionCircle : 'cursor-default opacity-25'}
        `}
      >
        {dayNum}
      </button>
    </div>
  );
});

DayCell.displayName = 'DayCell';
export default DayCell;
