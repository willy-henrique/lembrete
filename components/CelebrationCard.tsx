
import React from 'react';
import { BirthdayInfo } from '../types';

interface CelebrationCardProps {
  employee: BirthdayInfo;
  cardId: string;
}

const CelebrationCard: React.FC<CelebrationCardProps> = ({ employee, cardId }) => {
  return (
    <div 
      id={cardId}
      className="fixed -left-[5000px] top-0 w-[1080px] h-[1350px] overflow-hidden flex flex-col items-center justify-between p-20 shadow-2xl"
      style={{ 
        background: `radial-gradient(circle at center, #24523B 0%, #112d22 100%)`,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Texture Overlay (Compatível com html2canvas) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)`,
        backgroundSize: '4px 4px'
      }}></div>

      {/* Glossy Corporate Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Balloon Left 1 (Emerald) */}
        <div className="absolute top-12 left-16 w-48 h-64 rounded-[50%] rotate-[-12deg]" style={{
          background: 'radial-gradient(circle at 30% 30%, #4D9272, #1B4332)',
          boxShadow: '20px 20px 40px rgba(0,0,0,0.3)'
        }}>
          <div className="absolute top-[15%] left-[20%] w-[20%] h-[30%] bg-white/20 rounded-[50%]"></div>
        </div>
        {/* Balloon Left 2 (Silver) */}
        <div className="absolute top-32 left-32 w-44 h-56 rounded-[50%] rotate-[-25deg]" style={{
          background: 'radial-gradient(circle at 30% 30%, #E5E7EB, #9CA3AF)',
          boxShadow: '15px 15px 30px rgba(0,0,0,0.2)'
        }}>
          <div className="absolute top-[15%] left-[20%] w-[15%] h-[25%] bg-white/40 rounded-[50%]"></div>
        </div>

        {/* Balloon Right 1 (Gold) */}
        <div className="absolute top-12 right-16 w-48 h-64 rounded-[50%] rotate-[12deg]" style={{
          background: 'radial-gradient(circle at 30% 30%, #FDE047, #A16207)',
          boxShadow: '-20px 20px 40px rgba(0,0,0,0.3)'
        }}>
          <div className="absolute top-[15%] left-[20%] w-[20%] h-[30%] bg-white/30 rounded-[50%]"></div>
        </div>
        {/* Balloon Right 2 (Emerald) */}
        <div className="absolute top-32 right-32 w-44 h-56 rounded-[50%] rotate-[25deg]" style={{
          background: 'radial-gradient(circle at 30% 30%, #4D9272, #1B4332)',
          boxShadow: '-15px 15px 30px rgba(0,0,0,0.2)'
        }}>
          <div className="absolute top-[15%] left-[20%] w-[15%] h-[25%] bg-white/20 rounded-[50%]"></div>
        </div>
      </div>

      {/* Central Content Section */}
      <div className="relative z-10 flex flex-col items-center w-full mt-24">
        {/* The Gallery Frame */}
        <div className="bg-white p-8 pb-20 shadow-[0_50px_100px_rgba(0,0,0,0.6)] transform rotate-[-1deg] border border-gray-100">
          <div className="w-[580px] h-[580px] bg-gray-200 overflow-hidden shadow-inner border border-gray-300">
            {employee.photoUrl ? (
              <img src={employee.photoUrl} alt={employee.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#1B4332] text-[15rem] font-black bg-[#F4F1DE] font-agro-title">
                {employee.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="mt-12 text-center">
            <h2 className="font-cursive text-[7.5rem] text-[#1B4332] leading-none drop-shadow-sm">Feliz aniversário</h2>
          </div>
        </div>
      </div>

      {/* Message & Branding Section */}
      <div className="relative z-10 w-full flex flex-col items-center px-24 pb-12">
        <div className="max-w-4xl text-center space-y-8 mb-20">
          <p className="text-[2.2rem] font-light leading-snug text-white/95 tracking-wide">
            Que este novo ano de vida seja repleto de <br/>
            <span className="font-bold text-[#FFB703]">saúde, paz e conquistas</span>. Desejamos sucesso <br/>
            em sua vida, com muitas realizações pessoais <br/>
            e profissionais. Aproveite seu dia, felicidades!
          </p>
        </div>

        {/* Footer Brand */}
        <div className="w-full flex justify-end items-end border-t border-white/10 pt-12">
          <div className="flex items-center gap-8">
            <div className="text-right">
              <span className="block text-xl font-black uppercase tracking-[0.3em] text-[#FFB703] leading-none">Fazenda</span>
              <span className="block text-4xl font-agro-title font-black uppercase tracking-[0.1em] text-white">Boi Verde</span>
              <div className="h-1 bg-[#FFB703] mt-2 ml-auto" style={{ width: '60%' }}></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-xl">
               <svg className="w-16 h-16 text-[#1B4332]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 10 C30 10 20 25 20 45 C20 65 50 90 50 90 C50 90 80 65 80 45 C80 25 70 10 50 10 Z M50 60 C40 60 35 50 35 40 C35 30 40 25 50 25 C60 25 65 30 65 40 C65 50 60 60 50 60 Z" />
                  <path d="M40 75 L60 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
               </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-5">
         <span className="text-[8px] font-mono text-white rotate-90 block origin-left">ISSUE_REF_{employee.id.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default CelebrationCard;
