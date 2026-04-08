import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MONTH_IMAGES = [
  'https://picsum.photos/id/10/1200/400',
  'https://picsum.photos/id/11/1200/400',
  'https://picsum.photos/id/12/1200/400',
  'https://picsum.photos/id/13/1200/400',
  'https://picsum.photos/id/14/1200/400',
  'https://picsum.photos/id/15/1200/400',
  'https://picsum.photos/id/16/1200/400',
  'https://picsum.photos/id/17/1200/400',
  'https://picsum.photos/id/18/1200/400',
  'https://picsum.photos/id/19/1200/400',
  'https://picsum.photos/id/28/1200/400',
  'https://picsum.photos/id/29/1200/400'
];

const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function HeroHeader({ currentMonth, setCurrentMonth, onPrev, onNext, onToday }) {
  const monthIndex = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const year = currentMonth.getFullYear();

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // We want a slight delay before the month actually swaps to make it feel smoother
  const handleDelayedPrev = () => setTimeout(onPrev, 200);
  const handleDelayedNext = () => setTimeout(onNext, 200);

  //click the hero to close
  const closePopovers = () => {
    setShowYearPicker(false);
    setShowMonthPicker(false);
  };

  return (
    <motion.div 
      layout
      className="relative w-full h-[320px] sm:h-[380px] overflow-hidden group shrink-0 bg-[#1A9BE6]"
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          onClick={closePopovers}
          key={monthIndex}
          src={MONTH_IMAGES[monthIndex]}
          alt={`Scene for ${monthName}`}
          className="absolute inset-0 w-full h-full object-cover cursor-default"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* The wavy bottom edge - improved to cover gaps */}
      <svg
        onClick={closePopovers}
        className="absolute bottom-0 left-0 w-full h-[150px] pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polygon points="0,85 55,100 100,75 100,100 0,100" fill="#f8fafc" />
        <polygon points="0,60 40,90 100,25 100,75 55,100 0,85" fill="#1A9BE6" />
        {/* Extra layer to ensure no top-edge white sliver appears */}
        <rect x="0" y="99" width="100" height="2" fill="#f8fafc" />
      </svg>

      {/* month and year text */}
      <div className="absolute bottom-[20px] sm:bottom-[30px] right-8 sm:right-12 z-20 flex flex-col items-end text-white text-right select-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={year}
            onClick={() => { setShowYearPicker(!showYearPicker); setShowMonthPicker(false); }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg sm:text-2xl font-light tracking-[0.3em] mb-0 cursor-pointer hover:opacity-100 hover:text-sky-100 transition-colors drop-shadow-md relative z-30"
          >
            {year}
          </motion.p>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.h2
            key={monthName}
            onClick={() => { setShowMonthPicker(!showMonthPicker); setShowYearPicker(false); }}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-5xl sm:text-7xl font-light tracking-[0.1em] uppercase leading-none mt-1 cursor-pointer hover:opacity-90 transition-opacity drop-shadow-lg relative z-30"
          >
            {monthName}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Popover for selectingyear */}
      <AnimatePresence>
        {showYearPicker && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-28 right-12 z-40 bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-2xl p-2 flex flex-col h-48 overflow-y-auto w-24 custom-scrollbar ring-1 ring-white/20"
          >
            {[...Array(21)].map((_, i) => {
              const yr = year - 10 + i;
              return (
                <button
                  key={yr}
                  onClick={() => {
                    setCurrentMonth((prev) => new Date(yr, prev.getMonth(), 1));
                    setShowYearPicker(false);
                  }}
                  className={`py-1.5 px-2 text-sm text-center rounded-md transition-colors ${
                    yr === year ? 'bg-sky-500 text-white font-bold' : 'hover:bg-slate-700 text-slate-200 font-medium'
                  }`}
                >
                  {yr}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popover for month */}
      <AnimatePresence>
        {showMonthPicker && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-28 right-8 z-40 bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-2xl p-3 grid grid-cols-3 gap-2 w-64 ring-1 ring-white/20"
          >
            {MONTH_NAMES_SHORT.map((mon, idx) => (
              <button
                key={mon}
                onClick={() => {
                  setCurrentMonth((prev) => new Date(prev.getFullYear(), idx, 1));
                  setShowMonthPicker(false);
                }}
                className={`py-2 text-sm text-center rounded-md transition-colors ${
                  idx === monthIndex ? 'bg-sky-500 text-white font-bold' : 'hover:bg-slate-700 text-slate-200 font-medium'
                }`}
              >
                {mon}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation and jumping to today */}
      <div className="absolute top-4 left-6 md:top-6 md:left-8 z-10 flex items-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelayedPrev}
          aria-label="Previous Month"
          className="w-12 h-12 rounded-full bg-slate-900/40 backdrop-blur-md hover:bg-slate-900 transition-colors duration-300 flex items-center justify-center cursor-pointer shadow-xl border border-white/20 text-white"
        >
          <svg className="w-5 h-5 -ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToday}
          className="px-4 py-2 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs font-bold uppercase tracking-widest border border-white/20 transition-colors shadow-lg"
        >
          Today
        </motion.button>
      </div>

      <div className="absolute top-4 right-6 md:top-6 md:right-8 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelayedNext}
          aria-label="Next Month"
          className="w-12 h-12 rounded-full bg-slate-900/40 backdrop-blur-md hover:bg-slate-900 transition-colors duration-300 flex items-center justify-center cursor-pointer shadow-xl border border-white/20 text-white"
        >
          <svg className="w-5 h-5 -mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
