import React, { useState, useEffect, useMemo } from 'react';
import { Employee, Unit } from '../types';
import { MONTHS, getDaysInMonth } from '../utils/date-utils';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employeeToEdit?: Employee | null;
  isSaving?: boolean;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSave, employeeToEdit, isSaving = false }) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    birthDay: 1,
    birthMonth: 1,
    unit: Unit.CAMPO,
    position: '',
    phone: '',
    photoUrl: '',
  });

  const maxDay = useMemo(
    () => getDaysInMonth(formData.birthMonth ?? 1),
    [formData.birthMonth]
  );

  const days = useMemo(() => Array.from({ length: maxDay }, (_, i) => i + 1), [maxDay]);

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    } else {
      setFormData({
        name: '',
        birthDay: 1,
        birthMonth: 1,
        unit: Unit.CAMPO,
        position: '',
        phone: '',
        photoUrl: '',
      });
    }
  }, [employeeToEdit, isOpen]);

  useEffect(() => {
    const day = formData.birthDay ?? 1;
    if (day > maxDay) {
      setFormData((prev) => ({ ...prev, birthDay: maxDay }));
    }
  }, [maxDay, formData.birthDay]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#1B4332]/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden my-auto">
        <div className="agro-gradient p-6 sm:p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-agro-title italic">
              {employeeToEdit ? 'Atualizar Dados' : 'Novo Colaborador'}
            </h2>
            <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest opacity-60">
              Sistema de Celebração
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form
          className="p-6 sm:p-10 space-y-5 sm:space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData as Employee);
          }}
        >
          <div>
            <label className="block text-[9px] sm:text-[10px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">
              Nome completo
            </label>
            <input
              required
              disabled={isSaving}
              className="w-full bg-[#F9F7F2] rounded-2xl px-5 py-3 sm:py-4 outline-none border-2 border-transparent focus:border-[#FFB703] transition-all font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              value={formData.name ?? ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[9px] sm:text-[10px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">
              Aniversário (dia e mês)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                required
                disabled={isSaving}
                className="w-full bg-[#F9F7F2] rounded-2xl px-5 py-3 sm:py-4 outline-none border-2 border-transparent focus:border-[#FFB703] transition-all text-sm appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                value={formData.birthDay ?? 1}
                onChange={(e) => setFormData({ ...formData, birthDay: Number(e.target.value) })}
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {String(d).padStart(2, '0')} (dia)
                  </option>
                ))}
              </select>
              <select
                required
                disabled={isSaving}
                className="w-full bg-[#F9F7F2] rounded-2xl px-5 py-3 sm:py-4 outline-none border-2 border-transparent focus:border-[#FFB703] transition-all text-sm appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                value={formData.birthMonth ?? 1}
                onChange={(e) => setFormData({ ...formData, birthMonth: Number(e.target.value) })}
              >
                {MONTHS.map((name, i) => (
                  <option key={i} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">
                Unidade
              </label>
              <select
                disabled={isSaving}
                className="w-full bg-[#F9F7F2] rounded-2xl px-5 py-3 sm:py-4 outline-none border-2 border-transparent focus:border-[#FFB703] transition-all text-sm appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                value={formData.unit ?? Unit.CAMPO}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value as Unit })}
              >
                {Object.values(Unit).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">
                Cargo
              </label>
              <input
                required
                disabled={isSaving}
                className="w-full bg-[#F9F7F2] rounded-2xl px-5 py-3 sm:py-4 outline-none border-2 border-transparent focus:border-[#FFB703] transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                value={formData.position ?? ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] sm:text-[10px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">
              WhatsApp
            </label>
            <input
              placeholder="5511999999999"
              type="tel"
              disabled={isSaving}
              className="w-full bg-[#F9F7F2] rounded-2xl px-5 py-3 sm:py-4 outline-none border-2 border-transparent focus:border-[#FFB703] transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              value={formData.phone ?? ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[9px] sm:text-[10px] uppercase font-black text-gray-400 mb-2 ml-1 tracking-widest">
              Foto (opcional)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#F9F7F2] p-4 rounded-2xl">
              <div className="w-16 h-16 sm:w-12 sm:h-12 bg-white rounded-xl overflow-hidden flex-shrink-0 border">
                {formData.photoUrl ? (
                  <img src={formData.photoUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20 text-2xl sm:text-lg">
                    📸
                  </div>
                )}
              </div>
              <div className="flex-grow w-full">
                <input
                  type="file"
                  accept="image/*"
                  disabled={isSaving}
                  onChange={handleFileChange}
                  className="w-full text-[10px] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-[#1B4332] file:text-white file:uppercase file:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-4 sm:py-5 bg-[#1B4332] hover:bg-[#AACC00] text-white font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-2xl transition-all shadow-xl text-xs sm:text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Salvando...' : employeeToEdit ? 'Atualizar' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
