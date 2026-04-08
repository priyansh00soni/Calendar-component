import { useState, useCallback, useMemo } from 'react';
import { isBefore, buildGrid } from '../utils/dateHelpers';

export function useCalendar(initialDate = new Date()) {
  // Start at the first of the month for the given date
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selecting, setSelecting] = useState(false);

  // Re-calculate the grid whenever the month changes
  const grid = useMemo(
    () => buildGrid(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth]
  );

  const goToNextMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  const handleDayClick = useCallback(
    (date) => {
      // Start a new range or pick the first date
      if (!selecting) {
        setRangeStart(date);
        setRangeEnd(null);
        setSelecting(true);
      } else {
        // Finish range
        if (isBefore(date, rangeStart)) {
          setRangeEnd(rangeStart);
          setRangeStart(date);
        } else {
          setRangeEnd(date);
        }
        setSelecting(false);
        setHoveredDate(null);
      }

      // Quick resetif clicked gain
      if (!selecting && rangeStart && rangeEnd) {
        setRangeStart(date);
        setRangeEnd(null);
        setSelecting(true);
      }
    },
    [selecting, rangeStart, rangeEnd]
  );

  const handleDayHover = useCallback(
    (date) => {
      if (selecting) {
        setHoveredDate(date);
      }
    },
    [selecting]
  );

  return {
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
  };
}
