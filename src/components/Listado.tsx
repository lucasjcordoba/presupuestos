'use client';

import { useState } from 'react';
import type { Gasto, Categoria } from '@/types';
import GastoItem from './Gasto';

interface ListadoProps {
  gastos:     Gasto[];
  categorias: Categoria[];
  onEliminar?: (id: string) => void;
}

export default function Listado({ gastos, categorias, onEliminar }: ListadoProps) {
  const [filtro, setFiltro] = useState<string | null>(null);

  const categoriasConGastos = categorias.filter((c) =>
    gastos.some((g) => g.categoria_id === c.id)
  );

  const gastosFiltrados = filtro
    ? gastos.filter((g) => g.categoria_id === filtro)
    : gastos;

  return (
    <div className="mb-8">
      <h2 className="text-center text-4xl font-light text-[#004e92] mb-4">
        Listado
      </h2>

      {categoriasConGastos.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFiltro(null)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer ${
              filtro === null
                ? 'bg-[#004085] text-white border-[#004085]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            Todos
          </button>
          {categoriasConGastos.map((c) => (
            <button
              key={c.id}
              onClick={() => setFiltro(filtro === c.id ? null : c.id)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                filtro === c.id
                  ? 'text-white border-transparent'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
              style={filtro === c.id ? { backgroundColor: c.color, borderColor: c.color } : {}}
            >
              {c.nombre}
            </button>
          ))}
        </div>
      )}

      <ul className="p-0 m-0">
        {gastosFiltrados.map((gasto) => (
          <GastoItem key={gasto.id} gasto={gasto} onEliminar={onEliminar} />
        ))}
      </ul>
    </div>
  );
}
