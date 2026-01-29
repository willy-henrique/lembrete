
import React from 'react';
import { Unit } from '../types';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedMonth: number | 'all';
  setSelectedMonth: (val: number | 'all') => void;
  selectedUnit: Unit | 'all';
  setSelectedUnit: (val: Unit | 'all') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm, setSearchTerm,
  selectedMonth, setSelectedMonth,
  selectedUnit, setSelectedUnit
}) => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-md border border-[#D8E2DC] flex flex-col lg:flex-row gap-4 lg:items-end">
      <div className="w-full flex-grow">
        <label className="block text-[9px] md:text-[10px] uppercase font-bold text-gray-400 mb-1.5 ml-1 tracking-widest">Buscar Colaborador</label>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Nome ou posição..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F9F7F2] border-none rounded-xl px-4 py-3 md:py-2.5 text-sm focus:ring-2 focus:ring-[#74C69D] outline-none transition-all"
          />
          <span className="absolute right-4 top-3.5 md:top-3 text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:flex gap-4 w-full lg:w-auto">
        <div className="w-full lg:w-48">
          <label className="block text-[9px] md:text-[10px] uppercase font-bold text-gray-400 mb-1.5 ml-1 tracking-widest">Mês</label>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full bg-[#F9F7F2] border-none rounded-xl px-4 py-3 md:py-2.5 text-sm focus:ring-2 focus:ring-[#74C69D] outline-none appearance-none cursor-pointer"
          >
            <option value="all">Mês: Todos</option>
            {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
        </div>

        <div className="w-full lg:w-48">
          <label className="block text-[9px] md:text-[10px] uppercase font-bold text-gray-400 mb-1.5 ml-1 tracking-widest">Unidade</label>
          <select 
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value as any)}
            className="w-full bg-[#F9F7F2] border-none rounded-xl px-4 py-3 md:py-2.5 text-sm focus:ring-2 focus:ring-[#74C69D] outline-none appearance-none cursor-pointer"
          >
            <option value="all">Unidade: Todas</option>
            {Object.values(Unit).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
