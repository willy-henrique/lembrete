
import React, { useState } from 'react';
import { BirthdayInfo } from '../types';
import { formatBirthDateDisplay } from '../utils/date-utils';

interface BirthdayCardProps {
  employee: BirthdayInfo;
  variant?: 'compact' | 'main';
  onShare?: (employee: BirthdayInfo) => Promise<void>;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ employee, variant = 'main', onShare }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShareClick = async () => {
    if (onShare) {
      setIsSharing(true);
      await onShare(employee);
      setIsSharing(false);
    } else {
      const text = `Feliz aniversário, ${employee.name}! 🎂 Desejo muita saúde, felicidade e sucesso em sua caminhada. Aproveite muito o seu dia! 🥳🎈`;
      window.open(`https://wa.me/${employee.phone}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center p-3 bg-white rounded-xl shadow-sm border border-[#D8E2DC] hover:border-[#74C69D] transition-colors">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-[#F4F1DE] flex-shrink-0 border-2 border-[#74C69D]">
          {employee.photoUrl ? (
            <img src={employee.photoUrl} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-[#1B4332] text-xs font-bold">
               {employee.name.charAt(0)}
             </div>
          )}
        </div>
        <div className="ml-3 flex-grow overflow-hidden">
          <h4 className="font-semibold text-xs md:text-sm truncate">{employee.name}</h4>
          <p className="text-[10px] text-gray-400 truncate">{employee.unit}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
           <span className="text-[10px] md:text-xs font-bold text-[#1B4332] block">{formatBirthDateDisplay(employee.birthDate)}</span>
           <span className="text-[8px] md:text-[10px] text-[#74C69D] uppercase tracking-wider font-bold">
             {employee.isToday ? 'HOJE' : `em ${employee.daysUntil}d`}
           </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden p-5 md:p-6 rounded-[2rem] md:rounded-2xl shadow-lg border-2 ${employee.isToday ? 'border-[#FFB703] bg-white' : 'border-transparent bg-white'}`}>
      {employee.isToday && (
        <div className="absolute top-0 right-0 bg-[#FFB703] text-[#1B4332] px-3 md:px-4 py-1 rounded-bl-xl font-black text-[9px] md:text-xs uppercase tracking-widest shadow-md">
          Aniversariante
        </div>
      )}
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        <div className="relative">
          <div className={`w-28 h-28 md:w-32 md:h-32 rounded-[2rem] md:rounded-3xl overflow-hidden bg-[#F4F1DE] shadow-inner border-4 ${employee.isToday ? 'border-[#FFB703]' : 'border-[#74C69D]'}`}>
            {employee.photoUrl ? (
              <img src={employee.photoUrl} alt={employee.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#1B4332] text-4xl md:text-5xl font-bold">
                {employee.name.charAt(0)}
              </div>
            )}
          </div>
          {employee.isToday && (
             <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg border border-gray-100">
                <span className="text-xl md:text-2xl">🎂</span>
             </div>
          )}
        </div>

        <div className="flex-grow text-center md:text-left w-full">
          <div className="mb-3 md:mb-4">
            <h3 className="text-xl md:text-2xl font-black text-[#1B4332] leading-tight mb-1">{employee.name}</h3>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-[#B7E4C7] px-2 py-0.5 rounded text-[8px] md:text-[10px] uppercase font-bold text-[#1B4332] tracking-widest">{employee.unit}</span>
              <span className="text-xs md:sm font-medium text-gray-500 opacity-80">{employee.position}</span>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start gap-6 md:gap-8 mb-6">
             <div className="flex flex-col">
               <span className="text-[9px] md:text-[10px] uppercase text-gray-400 font-bold tracking-widest">Idade</span>
               <span className="text-base md:text-lg font-black text-[#1B4332]">{employee.age} anos</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[9px] md:text-[10px] uppercase text-gray-400 font-bold tracking-widest">Data</span>
               <span className="text-base md:text-lg font-black text-[#1B4332]">{formatBirthDateDisplay(employee.birthDate)}</span>
             </div>
          </div>

          <button 
            onClick={handleShareClick}
            disabled={isSharing}
            className={`w-full md:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-[#74C69D] hover:bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-2xl md:rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-95 ${isSharing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSharing ? (
              <>
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Gerando Card...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Felicitar agora
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;
