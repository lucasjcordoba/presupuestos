import type { Gasto, Presupuesto } from '@/types';

export async function fetchPresupuesto(): Promise<Presupuesto> {
  const res = await fetch('/api/presupuesto');
  if (!res.ok) throw new Error('Error al cargar presupuesto');
  return res.json();
}

export async function savePresupuesto(cantidad: number): Promise<Presupuesto> {
  const res = await fetch('/api/presupuesto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad }),
  });
  if (!res.ok) throw new Error('Error al guardar presupuesto');
  return res.json();
}

export async function fetchGastos(): Promise<Gasto[]> {
  const res = await fetch('/api/gastos');
  if (!res.ok) throw new Error('Error al cargar gastos');
  return res.json();
}

export async function addGasto(nombre: string, cantidad: number): Promise<Gasto> {
  const res = await fetch('/api/gastos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, cantidad }),
  });
  if (!res.ok) throw new Error('Error al agregar gasto');
  return res.json();
}

export async function deleteGasto(id: string): Promise<void> {
  const res = await fetch(`/api/gastos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar gasto');
}
