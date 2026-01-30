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
  /** Dia do aniversário (1–31). */
  birthDay: number;
  /** Mês do aniversário (1–12). */
  birthMonth: number;
  unit: Unit;
  position: string;
  phone: string;
  photoUrl?: string;
}

export interface BirthdayInfo extends Employee {
  daysUntil: number;
  isToday: boolean;
}
