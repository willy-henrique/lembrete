
import React from 'react';
import { BirthdayInfo } from '../types';
import BirthdayCard from './BirthdayCard';

interface TimelineProps {
  employees: BirthdayInfo[];
}

const Timeline: React.FC<TimelineProps> = ({ employees }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#1B4332] p-3 rounded-2xl shadow-lg border border-white/5">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#FFB703]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
           </svg>
        </div>
        <h2 className="text-2xl font-black text-[#1B4332] uppercase tracking-tighter">Próximos Eventos</h2>
      </div>

      <div className="relative pl-10 space-y-8 before:content-[''] before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[3px] before:bg-[#F4F1DE] before:rounded-full">
         {employees.length > 0 ? employees.map((emp) => (
           <div key={emp.id} className="relative group">
              <div className="absolute -left-[35px] top-4 w-6 h-6 rounded-full bg-white border-4 border-[#1B4332] group-hover:border-[#FFB703] z-10 shadow-sm transition-colors"></div>
              <BirthdayCard employee={emp} variant="compact" />
           </div>
         )) : (
           <p className="text-gray-400 italic text-sm py-4">Nenhum evento futuro identificado.</p>
         )}
      </div>
    </div>
  );
};

export default Timeline;
