
import React, { useState, useEffect, useMemo } from 'react';
import { Employee, BirthdayInfo, Unit } from './types';
import { employeeService } from './services/employeeService';
import { calculateBirthdayInfo } from './utils/date-utils';
import BirthdayCard from './components/BirthdayCard';
import Timeline from './components/Timeline';
import FilterBar from './components/FilterBar';
import Celebration from './components/Celebration';
import EmployeeModal from './components/EmployeeModal';
import CelebrationCard from './components/CelebrationCard';

declare const html2canvas: any;

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [selectedUnit, setSelectedUnit] = useState<Unit | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [exportingId, setExportingId] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    const data = await employeeService.getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const birthdayData = useMemo(() => {
    return employees.map(calculateBirthdayInfo).sort((a, b) => a.daysUntil - b.daysUntil);
  }, [employees]);

  const todayBirthdays = useMemo(() => birthdayData.filter(e => e.isToday), [birthdayData]);
  const upcomingBirthdays = useMemo(() => birthdayData.filter(e => !e.isToday).slice(0, 5), [birthdayData]);

  const filteredData = useMemo(() => {
    return birthdayData.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      const birthMonth = new Date(emp.birthDate).getUTCMonth();
      const matchMonth = selectedMonth === 'all' || birthMonth === selectedMonth;
      const matchUnit = selectedUnit === 'all' || emp.unit === selectedUnit;
      return matchSearch && matchMonth && matchUnit;
    });
  }, [birthdayData, searchTerm, selectedMonth, selectedUnit]);

  const handleSave = async (employee: Employee) => {
    await employeeService.saveEmployee(employee);
    await fetchEmployees();
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente remover este colaborador do sistema de lembretes?')) {
      await employeeService.deleteEmployee(id);
      await fetchEmployees();
    }
  };

  const handleShareOrExport = async (employee: BirthdayInfo, mode: 'export' | 'share' = 'export') => {
    setExportingId(employee.id);
    await new Promise(resolve => setTimeout(resolve, 600));

    const element = document.getElementById(`export-card-${employee.id}`);
    if (!element) {
      setExportingId(null);
      return;
    }

    try {
      const canvas = await html2canvas(element, { 
        useCORS: true, 
        logging: false,
        scale: 2,
        backgroundColor: '#112d22'
      });

      const blob: Blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      const fileName = `parabens-stival-${employee.name.toLowerCase().replace(/\s/g, '-')}.jpg`;
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      const beautifulText = `Parabéns, ${employee.name}! 🎂 Desejamos que este novo ciclo seja iluminado, repleto de saúde, paz e muitas alegrias. Que sua trajetória continue sendo marcada pelo sucesso e por grandes realizações, tanto na vida pessoal quanto na carreira. Aproveite seu dia ao máximo! 🎈🥳`;

      if (mode === 'share' && navigator.share) {
        try {
          await navigator.share({
            files: [file],
            text: beautifulText,
            title: `Aniversário de ${employee.name}`
          });
        } catch (shareErr) {
          downloadAndWhatsApp(blob, fileName, employee.phone, beautifulText);
        }
      } else {
        downloadAndWhatsApp(blob, fileName, employee.phone, beautifulText, mode === 'export');
      }
    } catch (err) {
      console.error("Erro no processamento:", err);
    } finally {
      setExportingId(null);
    }
  };

  const downloadAndWhatsApp = (blob: Blob, fileName: string, phone: string, text: string, onlyDownload = false) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    if (!onlyDownload) {
      setTimeout(() => {
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text + '\n\n(Anexe a imagem que acabamos de baixar!)')}`;
        window.open(waUrl, '_blank');
      }, 500);
    }
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F2] p-6 space-y-4">
        <div className="w-16 h-16 border-4 border-[#FFB703] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#1B4332] font-black uppercase tracking-widest text-xs text-center">Carregando Celebrações...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <Celebration active={todayBirthdays.length > 0} />
      
      <header className="agro-gradient text-[#F9F7F2] pt-12 md:pt-16 pb-20 md:pb-24 px-4 md:px-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 relative z-10">
          <div className="text-center md:text-left w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-3">
               <div className="bg-[#FFB703] p-3 rounded-2xl shadow-xl flex-shrink-0">
                  <span className="text-2xl md:text-3xl">🎂</span>
               </div>
               <h1 className="font-agro-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                Lembrete Juliana <br className="hidden lg:block"/> 
                <span className="text-[#FFB703] opacity-90">Agropecuária Stival</span>
               </h1>
            </div>
            <p className="text-[#AACC00] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs">Gestão Estratégica de Pessoas</p>
          </div>
          
          <button 
            onClick={() => { setEditingEmployee(null); setIsModalOpen(true); }}
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-[#FFB703] hover:bg-white text-[#1B4332] font-black px-8 md:px-10 py-4 md:py-5 rounded-3xl transition-all shadow-[0_10px_30px_rgba(255,183,3,0.3)] hover:-translate-y-1 active:scale-95"
          >
            <span className="tracking-widest uppercase text-xs md:text-sm">Novo Cadastro</span>
            <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto -mt-10 md:-mt-12 px-4 md:px-6 space-y-8 md:space-y-12">
        <FilterBar 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
          selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            
            <section>
              <h2 className="text-xl md:text-2xl font-black text-[#1B4332] uppercase tracking-tighter mb-6 md:mb-8 flex items-center gap-4">
                <span className="w-8 md:w-12 h-1 bg-[#FFB703] rounded-full"></span> Celebrações de Hoje
              </h2>

              {todayBirthdays.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {todayBirthdays.map(emp => (
                    <div key={emp.id} className="relative group">
                       <BirthdayCard 
                          employee={emp} 
                          onShare={(e) => handleShareOrExport(e, 'share')}
                        />
                       <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-row md:flex-col gap-2 md:gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => handleShareOrExport(emp, 'export')}
                            className="bg-white/90 backdrop-blur p-2.5 md:p-3 rounded-xl shadow-xl hover:bg-[#FFB703] text-[#1B4332] transition-all"
                            title="Apenas Baixar Imagem"
                          >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </button>
                          <button 
                             onClick={() => { setEditingEmployee(emp); setIsModalOpen(true); }}
                             className="bg-white/90 backdrop-blur p-2.5 md:p-3 rounded-xl shadow-xl hover:bg-[#AACC00] text-[#1B4332] transition-all"
                          >
                             <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </button>
                       </div>
                       {exportingId === emp.id && <CelebrationCard employee={emp} cardId={`export-card-${emp.id}`} />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[32px] md:rounded-[40px] p-10 md:p-16 text-center border-4 border-dashed border-[#F4F1DE]">
                   <span className="text-5xl md:text-6xl mb-6 block">🗓️</span>
                   <h3 className="text-xl md:text-2xl font-black text-[#1B4332] mb-2 uppercase tracking-tighter">Nenhum Aniversário Hoje</h3>
                   <p className="text-sm md:text-base text-gray-400">Tudo calmo por aqui. Aguardando a próxima celebração.</p>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-black text-[#1B4332] uppercase tracking-tighter mb-6 md:mb-8 flex items-center gap-4">
                 <span className="w-6 md:w-8 h-1 bg-[#AACC00] rounded-full"></span> Lista de Colaboradores
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredData.length > 0 ? (
                  filteredData.map(emp => (
                    <div key={emp.id} className="relative group bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-center justify-between border border-transparent hover:border-[#FFB703]/30">
                       <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-[#F9F7F2] border border-[#F4F1DE] flex-shrink-0">
                             {emp.photoUrl ? <img src={emp.photoUrl} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full font-black text-[#1B4332]">{emp.name.charAt(0)}</div>}
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-bold text-[#1B4332] text-xs md:text-sm leading-tight truncate">{emp.name}</p>
                            <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1 truncate">
                              {new Date(emp.birthDate).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})} • {emp.unit}
                            </p>
                          </div>
                       </div>
                       <div className="flex gap-1 md:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all ml-2">
                          <button onClick={() => { setEditingEmployee(emp); setIsModalOpen(true); }} className="p-1.5 text-[#1B4332] hover:text-[#FFB703] transition-colors"><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                          <button onClick={() => handleDelete(emp.id)} className="p-1.5 text-[#1B4332] hover:text-red-500 transition-colors"><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-400 italic bg-white/50 rounded-2xl border-2 border-dashed border-[#F4F1DE] text-sm">Nenhum registro encontrado nesta busca.</div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-8 md:space-y-12">
             <div className="bg-[#1B4332] p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB703] rounded-full -mr-16 -mt-16 opacity-10 group-hover:scale-125 transition-transform duration-700"></div>
                <h3 className="font-agro-title text-xl md:text-2xl mb-6 text-white border-b border-white/10 pb-4">Resumo do Painel</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-[#AACC00] text-[10px] uppercase font-black tracking-widest">Colaboradores</span>
                      <span className="text-white text-2xl md:text-3xl font-black leading-none">{employees.length}</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[#AACC00] text-[10px] uppercase font-black tracking-widest">Aniversários Hoje</span>
                      <span className="text-[#FFB703] text-2xl md:text-3xl font-black leading-none">{todayBirthdays.length}</span>
                   </div>
                </div>
             </div>

             <Timeline employees={upcomingBirthdays} />
             
             <div className="bg-[#FFB703] p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-xl text-[#1B4332] relative overflow-hidden">
                <span className="text-4xl md:text-5xl opacity-10 absolute -bottom-4 -left-4">🎈</span>
                <h4 className="font-agro-title text-lg md:text-xl mb-2 italic">Agropecuária Stival</h4>
                <p className="text-xs md:text-sm font-medium leading-relaxed">
                   "Cultivando conexões, valorizando cada talento em nossa história."
                </p>
             </div>
          </aside>
        </div>
      </main>

      <EmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        employeeToEdit={editingEmployee}
      />

      <footer className="max-w-6xl mx-auto mt-16 md:mt-24 border-t border-[#F4F1DE] py-10 md:py-12 px-6 text-center">
         <p className="text-[10px] uppercase font-black tracking-[0.4em] md:tracking-[0.5em] text-[#1B4332] mb-3 opacity-60">Agropecuária Stival</p>
         <p className="text-[10px] md:text-xs italic text-gray-400 tracking-wide px-4">"Valorizando quem faz nossa história crescer todos os dias."</p>
      </footer>
    </div>
  );
};

export default App;
