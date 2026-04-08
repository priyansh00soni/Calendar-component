import React from 'react';
import HeroHeader from './HeroHeader';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import { useCalendar } from '../hooks/useCalendar';
import { getMonthYearKey } from '../utils/dateHelpers';

export default function CalendarCard() {
  const {
    currentMonth,
    setCurrentMonth,
    grid,
    rangeStart,
    rangeEnd,
    hoveredDate,
    selecting,
    goToNextMonth,
    goToPrevMonth,
    goToToday, 
    handleDayClick,
    handleDayHover,
  } = useCalendar();

  const monthKey = getMonthYearKey(currentMonth);

  // Find title and which dates are active for the notes side
  let contextTitle = `General Notes — ${currentMonth.toLocaleString('en-US', { month: 'long' })}`;
  let activeDates = [];

  if (rangeStart && rangeEnd) {
    // range selected!!
    const isSameMonth = rangeStart.getMonth() === rangeEnd.getMonth() && rangeStart.getFullYear() === rangeEnd.getFullYear();
    const startStr = rangeStart.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const endStr = isSameMonth 
        ? rangeEnd.getDate().toString() 
        : rangeEnd.toLocaleString('en-US', { month: 'short', day: 'numeric' });

    contextTitle = `${startStr} – ${endStr}`;
    
    // Fill the dates array 
    let current = new Date(rangeStart);
    current.setHours(0,0,0,0);
    let end = new Date(rangeEnd);
    end.setHours(0,0,0,0);
    
    while (current <= end) {
      activeDates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  } else if (rangeStart) {
    // selected single day
    contextTitle = rangeStart.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    activeDates = [rangeStart];
  }

  return (
    <div className="relative z-10 w-full lg:h-full max-w-5xl lg:max-h-[850px] mx-auto bg-white/80 backdrop-blur-3xl rounded-[24px] border border-white/60 overflow-visible lg:overflow-hidden flex flex-col shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)]">
      <HeroHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
        onToday={goToToday}
      />

      <div className="p-6 sm:p-8 flex flex-col min-h-0 overflow-visible lg:overflow-auto lg:flex-1">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:flex-1 overflow-visible min-h-0">
          <div className="w-full lg:w-[65%] flex flex-col lg:h-full lg:order-2 min-h-0">
            <CalendarGrid
              grid={grid}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              hoveredDate={hoveredDate}
              selecting={selecting}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
              monthKey={monthKey}
            />
          </div>
          <div className="w-full lg:w-[35%] overflow-hidden lg:h-full lg:order-1 min-h-0">
            <NotesPanel 
              activeDates={activeDates} 
              contextTitle={contextTitle} 
              monthKey={monthKey} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
