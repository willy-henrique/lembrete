
import { Employee, Unit } from './types';

export const COLORS = {
  primary: '#1B4332',    // Verde Floresta
  secondary: '#FFB703',  // Dourado Grão
  background: '#F9F7F2', // Areia/Off-white
  accent: '#AACC00',     // Verde Lima (Tech accent)
};

export const INITIAL_DATA: Employee[] = [
  {
    id: '1',
    name: 'João do Milho',
    birthDate: '1985-05-15',
    unit: Unit.CAMPO,
    position: 'Operador de Colheitadeira',
    phone: '5511999999999',
    photoUrl: 'https://picsum.photos/seed/joao/200'
  },
  {
    id: '2',
    name: 'Ana Paula Ferreira',
    birthDate: '1992-12-20',
    unit: Unit.VETERINARIA,
    position: 'Veterinária Sênior',
    phone: '5511988888888',
    photoUrl: 'https://picsum.photos/seed/ana/200'
  },
  {
    id: '5',
    name: 'Ricardo Sementes',
    birthDate: new Date().toISOString().split('T')[0], // Hoje
    unit: Unit.LOGISTICA,
    position: 'Coordenador de Cargas',
    phone: '5511955555555',
    photoUrl: 'https://picsum.photos/seed/ricardo/200'
  }
];
