import { Employee, BirthdayInfo } from '../types';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export function getMonthName(monthIndex: number): string {
  return MONTHS[monthIndex] ?? '';
}

/** Retorna o último dia do mês (1–12). Considera ano bissexto para fevereiro. */
export function getDaysInMonth(month: number, year?: number): number {
  const y = year ?? new Date().getFullYear();
  return new Date(y, month, 0).getDate();
}

export function calculateBirthdayInfo(employee: Employee): BirthdayInfo {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const m = employee.birthMonth - 1; // 0–11
  const d = employee.birthDay;

  let next = new Date(today.getFullYear(), m, d);
  if (next < today) next.setFullYear(today.getFullYear() + 1);

  const diff = next.getTime() - today.getTime();
  const daysUntil = Math.round(diff / (1000 * 60 * 60 * 24));
  const isToday = daysUntil === 0;

  return {
    ...employee,
    daysUntil,
    isToday,
  };
}

export function formatBirthDateDisplay(birthDay: number, birthMonth: number): string {
  const d = String(birthDay).padStart(2, '0');
  const m = String(birthMonth).padStart(2, '0');
  return `${d}/${m}`;
}

export { MONTHS };
