import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../hooks/useNotes';

// day note entry
function DayNote({ dateObj }) {
  const dayKey = `day-${dateObj.getTime()}`;
  const dayLabel = dateObj.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const { notes, setNotes, saveState } = useNotes(dayKey);

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold text-slate-800">{dayLabel}</h4>
        <div className="flex-shrink-0 flex items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {saveState === 'saving' ? (
                <span className="text-amber-500">Saving...</span>
            ) : (
                <span className="text-emerald-500 transition-opacity duration-500 opacity-70">Saved</span>
            )}
        </div>
      </div>
      <div className="w-full relative rounded-md overflow-hidden transition-all duration-300"
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #e2e8f0 27px, #e2e8f0 28px)' }}>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tasks for this day..."
          spellCheck="false"
          className="w-full min-h-[112px] bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-sm font-medium text-slate-700 p-0 m-0 placeholder:text-slate-400 placeholder:font-normal"
          style={{ lineHeight: '28px' }}
        />
      </div>
    </div>
  );
}

// Full month notes
function MonthNote({ monthKey, contextTitle }) {
  const { notes, setNotes, saveState } = useNotes(monthKey);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800 truncate min-w-0" title={contextTitle}>
          {contextTitle}
        </h3>
        <div className="flex-shrink-0 flex items-center text-[11px] font-bold uppercase tracking-wider">
            {saveState === 'saving' ? (
                <span className="text-amber-500 opacity-90">Saving...</span>
            ) : (
                <span className="text-emerald-600 opacity-70">✓ Saved</span>
            )}
        </div>
      </div>
      <div className="flex-1 min-h-[224px] relative w-full rounded-lg overflow-hidden transition-all duration-300"
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #e2e8f0 27px, #e2e8f0 28px)' }}>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={`Jot down general notes for the month...`}
          spellCheck="false"
          className="w-full min-h-[224px] bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-sm font-medium text-slate-800 p-0 m-0 placeholder:text-slate-400 placeholder:font-normal"
          style={{ lineHeight: '28px' }}
        />
      </div>
    </div>
  );
}

export default function NotesPanel({ activeDates, contextTitle, monthKey }) {
  return (
    <div className="flex flex-col lg:h-full pr-0 lg:pr-6 lg:border-r border-slate-200 overflow-visible min-h-0">
      <div className="w-full lg:h-full overflow-y-auto pr-2 custom-scrollbar overflow-x-hidden min-h-0">
        <AnimatePresence mode="wait">
          {activeDates && activeDates.length > 0 ? (
            <motion.div 
              key="agenda-view"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col"
            >
              <h3 className="text-base font-extrabold text-slate-800 mb-6 pb-2 border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-10">
                Agenda: {contextTitle}
              </h3>
              <AnimatePresence>
                {activeDates.map((date, i) => (
                  <motion.div 
                    key={date.getTime()}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <DayNote dateObj={date} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="month-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <MonthNote monthKey={monthKey} contextTitle={contextTitle} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
