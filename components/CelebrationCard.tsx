import React from 'react';
import { BirthdayInfo } from '../types';

interface CelebrationCardProps {
  employee: BirthdayInfo;
  cardId: string;
}

const CelebrationCard: React.FC<CelebrationCardProps> = ({ employee, cardId }) => {
  const bgGreen = '#112d22';
  const gold = '#FFB703';

  return (
    <div
      id={cardId}
      className="fixed -left-[5000px] top-0 w-[1080px] h-[1350px] overflow-hidden flex flex-col"
      style={{
        backgroundColor: bgGreen,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Textura diagonal sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent 0,
            transparent 3px,
            rgba(255,255,255,0.2) 3px,
            rgba(255,255,255,0.2) 4px
          )`,
        }}
      />

      {/* Balloons – top-left: green + white */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-44 h-56 rounded-[50%]"
          style={{
            top: 24,
            left: 32,
            transform: 'rotate(-15deg)',
            background: 'radial-gradient(circle at 28% 28%, #3d7a5c, #1B4332)',
            boxShadow: '16px 16px 36px rgba(0,0,0,0.35)',
          }}
        >
          <div className="absolute top-[12%] left-[18%] w-[22%] h-[28%] rounded-full bg-white/25" />
        </div>
        <div
          className="absolute w-40 h-52 rounded-[50%]"
          style={{
            top: 72,
            left: 88,
            transform: 'rotate(-28deg)',
            background: 'radial-gradient(circle at 28% 28%, #f8fafc, #cbd5e1)',
            boxShadow: '12px 12px 28px rgba(0,0,0,0.25)',
          }}
        >
          <div className="absolute top-[12%] left-[18%] w-[20%] h-[26%] rounded-full bg-white/50" />
        </div>
        {/* Top-right: green + golden yellow */}
        <div
          className="absolute w-44 h-56 rounded-[50%]"
          style={{
            top: 24,
            right: 32,
            left: 'auto',
            transform: 'rotate(12deg)',
            background: 'radial-gradient(circle at 28% 28%, #3d7a5c, #1B4332)',
            boxShadow: '-16px 16px 36px rgba(0,0,0,0.35)',
          }}
        >
          <div className="absolute top-[12%] left-[18%] w-[22%] h-[28%] rounded-full bg-white/25" />
        </div>
        <div
          className="absolute w-40 h-52 rounded-[50%]"
          style={{
            top: 72,
            right: 88,
            left: 'auto',
            transform: 'rotate(26deg)',
            background: `radial-gradient(circle at 28% 28%, #fde047, #a16207)`,
            boxShadow: '-12px 12px 28px rgba(0,0,0,0.3)',
          }}
        >
          <div className="absolute top-[12%] left-[18%] w-[20%] h-[26%] rounded-full bg-white/35" />
        </div>
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center flex-1 pt-20 px-16">
        {/* Polaroid frame – white, tilted, photo only */}
        <div
          className="bg-white flex flex-col items-stretch overflow-hidden"
          style={{
            width: 560,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 24,
            boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
            transform: 'rotate(-4deg)',
          }}
        >
          <div
            className="w-full bg-gray-200 overflow-hidden border border-gray-200"
            style={{ aspectRatio: '1', minHeight: 420 }}
          >
            {employee.photoUrl ? (
              <img
                src={employee.photoUrl}
                alt={employee.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-agro-title font-black text-[#1B4332]"
                style={{ fontSize: 160 }}
              >
                {employee.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* "Feliz aniversário" – below polaroid, script, verde que destaca no fundo */}
        <h2
          className="font-cursive text-center mt-8"
          style={{
            color: '#95d5b2',
            fontSize: 92,
            lineHeight: 1,
            textShadow: '0 2px 12px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.2)',
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          Feliz aniversário
        </h2>

        {/* Message – white, highlight in gold */}
        <div className="max-w-2xl text-center mt-10 px-4">
          <p
            className="leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: 26,
              fontWeight: 400,
            }}
          >
            Que este novo ano de vida seja repleto de{' '}
            <span style={{ color: gold, fontWeight: 700 }}>saúde, paz e conquistas</span>.
            Desejamos sucesso em sua vida, com muitas realizações pessoais e profissionais.
            Aproveite seu dia, felicidades!
          </p>
        </div>
      </div>

      {/* Footer – line, branding left, pin right */}
      <div
        className="relative z-10 flex justify-between items-end px-16 pb-14 pt-8"
        style={{
          borderTop: '1px solid #1f2937',
        }}
      >
        <div className="text-left">
          <div
            className="uppercase tracking-[0.35em] font-black"
            style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}
          >
            Agropecuária
          </div>
          <div
            className="font-black uppercase tracking-wider"
            style={{ color: '#fff', fontSize: 36, fontFamily: "'Playfair Display', serif" }}
          >
            Stival
          </div>
          <div
            className="mt-1.5 h-0.5"
            style={{ width: '55%', backgroundColor: gold }}
          />
        </div>
        <div
          className="flex items-center justify-center rounded-xl bg-white"
          style={{ width: 72, height: 72, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
        >
          <svg
            className="text-gray-700"
            style={{ width: 36, height: 36 }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CelebrationCard;
