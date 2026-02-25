export type BudgetStatus = 'success' | 'warning' | 'danger';

// Returns the Monday of the current ISO week as YYYY-MM-DD
export function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().slice(0, 10);
}

export function revisarPresupuesto(presupuesto: number, restante: number): BudgetStatus {
  if ((presupuesto / 4) > restante) return 'danger';
  if ((presupuesto / 2) > restante) return 'warning';
  return 'success';
}
