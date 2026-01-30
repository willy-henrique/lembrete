import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { Employee } from '../types';

const COLLECTION = 'employees';

function toEmployee(id: string, data: Record<string, unknown>): Employee {
  return {
    id,
    name: (data.name as string) ?? '',
    birthDay: Number(data.birthDay) || 1,
    birthMonth: Number(data.birthMonth) || 1,
    unit: (data.unit as Employee['unit']) ?? 'Campo',
    position: (data.position as string) ?? '',
    phone: (data.phone as string) ?? '',
    photoUrl: data.photoUrl != null ? String(data.photoUrl) : undefined,
  };
}

function toFirestore(e: Employee): Record<string, unknown> {
  const o: Record<string, unknown> = {
    name: e.name,
    birthDay: e.birthDay,
    birthMonth: e.birthMonth,
    unit: e.unit,
    position: e.position,
    phone: e.phone,
  };
  if (e.photoUrl) o.photoUrl = e.photoUrl;
  return o;
}

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    const col = collection(db, COLLECTION);
    const q = query(col, orderBy('name'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => toEmployee(d.id, d.data() as Record<string, unknown>));
  },

  async saveEmployee(employee: Employee): Promise<void> {
    const id =
      employee.id ||
      (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 11));
    const ref = doc(db, COLLECTION, id);
    await setDoc(ref, toFirestore({ ...employee, id }));
  },

  async deleteEmployee(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION, id));
  },

  async deleteAllEmployees(): Promise<void> {
    const snap = await getDocs(collection(db, COLLECTION));
    const docs = snap.docs;
    const BATCH_SIZE = 500;
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batch = writeBatch(db);
      docs.slice(i, i + BATCH_SIZE).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
  },
};
