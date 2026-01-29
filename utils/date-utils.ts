
import { Employee, BirthdayInfo } from '../types';

export const calculateBirthdayInfo = (employee: Employee): BirthdayInfo => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [year, month, day] = employee.birthDate.split('-').map(Number);
  const birthDate = new Date(year, month - 1, day);
  
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  const diffTime = nextBirthday.getTime() - today.getTime();
  const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isToday = daysUntil === 0 || (nextBirthday.getMonth() === today.getMonth() && nextBirthday.getDate() === today.getDate());
  
  const age = nextBirthday.getFullYear() - birthDate.getFullYear();

  return {
    ...employee,
    daysUntil,
    isToday,
    age
  };
};

export const formatBirthDateDisplay = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}`;
};

export const getMonthName = (monthIndex: number): string => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return months[monthIndex];
};
