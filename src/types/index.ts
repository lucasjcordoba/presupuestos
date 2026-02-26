export interface Categoria {
  id:     string;
  nombre: string;
  color:  string;
}

export interface Gasto {
  id:           string;
  nombre:       string;
  cantidad:     number;
  categoria_id?: string | null;
  fecha?:        string | null;
  categoria?:    { nombre: string; color: string } | null;
}

export interface Presupuesto {
  id:       string | null;
  cantidad: number;
}
