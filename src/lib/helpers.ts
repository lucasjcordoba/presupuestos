export type BudgetStatus = 'success' | 'warning' | 'danger';

export function revisarPresupuesto(presupuesto: number, restante: number): BudgetStatus {
  if ((presupuesto / 4) > restante) return 'danger';
  if ((presupuesto / 2) > restante) return 'warning';
  return 'success';
}
