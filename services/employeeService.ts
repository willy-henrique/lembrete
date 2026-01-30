
import { Employee } from '../types';
import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'juliana_lembre_employees';

export const employeeService = {
  /**
   * Mocking an async fetch from a potential ERP API
   */
  async getEmployees(): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          // Initialize with mock data if empty
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
          resolve(INITIAL_DATA);
        }
      }, 500); // Simulate network latency
    });
  },

  async saveEmployee(employee: Employee): Promise<void> {
    const current = await this.getEmployees();
    const index = current.findIndex(e => e.id === employee.id);
    
    if (index >= 0) {
      current[index] = employee;
    } else {
      current.push({ ...employee, id: Math.random().toString(36).substr(2, 9) });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  },

  async deleteEmployee(id: string): Promise<void> {
    const current = await this.getEmployees();
    const filtered = current.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  async deleteAllEmployees(): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};
