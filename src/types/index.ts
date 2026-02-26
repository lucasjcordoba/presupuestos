export interface Gasto {
  id:       string;
  nombre:   string;
  cantidad: number;
}

export interface Presupuesto {
  id:       string | null;
  cantidad: number;
}
