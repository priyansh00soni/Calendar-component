import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DayCell from './DayCell';
import { isSameDay, isBefore, isAfter } from '../utils/dateHelpers';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Animations for the whole 
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.015, delayChildren: 0.1 }
  }
};

// Animation for day
const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
};

export default function CalendarGrid({
  grid,
  rangeStart,
  rangeEnd,
  hoveredDate,
  selecting,
  onDayClick,
  onDayHover,
  monthKey,
}) {
  const containerRef = useRef(null);

  //keyboard nav
  const handleKeyDown = (e) => {
    if (!containerRef.current) return;
    const buttons = Array.from(
      containerRef.current.querySelectorAll('button:not([disabled])')
    );
    const currentIndex = buttons.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') nextIndex += 1;
    else if (e.key === 'ArrowLeft') nextIndex -= 1;
    else if (e.key === 'ArrowDown') nextIndex += 7;
    else if (e.key === 'ArrowUp') nextIndex -= 7;

    if (nextIndex >= 0 && nextIndex < buttons.length && nextIndex !== currentIndex) {
      e.preventDefault();
      buttons[nextIndex].focus();
    }
  };

  //  find out if a day is part of a selection or a hover-preview
  const getCellState = (date) => {
    const isStart = isSameDay(date, rangeStart);
    const isEnd = isSameDay(date, rangeEnd);

    let isInRange = false;
    if (rangeStart && rangeEnd) {
      isInRange =
        (isSameDay(date, rangeStart) || isAfter(date, rangeStart)) &&
        (isSameDay(date, rangeEnd) || isBefore(date, rangeEnd));
    } else if (selecting && hoveredDate) {
      const activeStart = isBefore(rangeStart, hoveredDate) ? rangeStart : hoveredDate;
      const activeEnd = isAfter(rangeStart, hoveredDate) ? rangeStart : hoveredDate;
      isInRange =
        (isSameDay(date, activeStart) || isAfter(date, activeStart)) &&
        (isSameDay(date, activeEnd) || isBefore(date, activeEnd));
    }

    let visualStart = isStart;
    let visualEnd = isEnd;
    if (selecting && hoveredDate) {
      visualStart = isSameDay(date, isBefore(rangeStart, hoveredDate) ? rangeStart : hoveredDate);
      visualEnd = isSameDay(date, isAfter(rangeStart, hoveredDate) ? rangeStart : hoveredDate);
    }

    return { visualStart, visualEnd, isInRange };
  };

  return (
    <div className="flex-1 w-full flex flex-col" ref={containerRef} onKeyDown={handleKeyDown}>
      {/* Header for weekdays */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => {
          const isWeekend = day === 'Sat' || day === 'Sun';
          return (
            <div
              key={day}
              className={`text-center text-[10px] font-bold uppercase tracking-widest py-1.5 ${
                isWeekend ? 'text-[#1A9BE6]' : 'text-slate-600'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Motion effect for day selection (multiiple) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={monthKey}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid grid-cols-7 gap-y-[1px]"
        >
          {grid.map((dayObj) => {
            const { visualStart, visualEnd, isInRange } = getCellState(dayObj.date);
            return (
              <motion.div key={dayObj.id} variants={itemVariants} className="w-full h-full">
                <DayCell
                  dayObj={dayObj}
                  isStart={visualStart}
                  isEnd={visualEnd}
                  isInRange={isInRange}
                  onClick={onDayClick}
                  onHover={onDayHover}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
