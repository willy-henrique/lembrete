
export enum Unit {
  CAMPO = 'Campo',
  ADMINISTRATIVO = 'Administrativo',
  LOGISTICA = 'Logística',
  AGRONOMOS = 'Agrônomos',
  VETERINARIA = 'Veterinária',
  VENDAS = 'Vendas',
  DIRETORIA = 'Diretoria'
}

export interface Employee {
  id: string;
  name: string;
  birthDate: string; // ISO format YYYY-MM-DD
  unit: Unit;
  position: string;
  phone: string;
  photoUrl?: string; // Base64 string
}

export interface BirthdayInfo extends Employee {
  daysUntil: number;
  isToday: boolean;
  age: number;
}
