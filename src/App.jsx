import React from 'react';
import CalendarCard from './components/CalendarCard';

function App() {
  return (
    <div className="relative w-screen h-screen bg-[#f8fafc] font-sans selection:bg-sky-200/50 overflow-hidden flex items-center justify-center p-4 sm:p-8">
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-sky-300/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-slate-400/10 blur-[100px] pointer-events-none" />
      
      <CalendarCard />
    </div>
  );
}

export default App;
