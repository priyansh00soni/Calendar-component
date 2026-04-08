import React from 'react';
import CalendarCard from './components/CalendarCard';

function App() {
  return (
    <div className="relative w-screen min-h-screen bg-[#9fe0fcd6] font-sans selection:bg-sky-200/50 overflow-y-auto flex items-center justify-center p-4 sm:p-8 ">
      <div className="absolute top-5 left-5 z-20 hidden sm:flex items-center justify-center rounded-[1.5rem] bg-white/95 p-3 shadow-[0_16px_60px_-40px_rgba(15,23,42,0.9)] border border-slate-200/80">
        <img src="/hero.png" alt="TUF logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
      </div>
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-sky-300/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-slate-400/10 blur-[100px] pointer-events-none" />
      
      <CalendarCard />
    </div>
  );
}

export default App;
