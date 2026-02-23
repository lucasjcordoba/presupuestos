'use client';

import { useState } from 'react';
import Error from './Error';
import type { Gasto } from '@/types';

interface FormularioProps {
  guardarGasto:      (gasto: Gasto) => void;
  guardarCrearGasto: (value: boolean) => void;
}

export default function Formulario({ guardarGasto, guardarCrearGasto }: FormularioProps) {
  const [nombre,   guardarNombre]   = useState('');
  const [cantidad, guardarCantidad] = useState(0);
  const [error,    guardarError]    = useState(false);

  const agregarGasto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
      guardarError(true);
      return;
    }
    const gasto: Gasto = {
      nombre,
      cantidad,
      id: crypto.randomUUID(),
    };
    guardarGasto(gasto);
    guardarCrearGasto(true);
    guardarNombre('');
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2 className="text-center text-5xl font-light text-[#004e92] mb-8">
        Agrega tus gastos aquí
      </h2>
      {error && (
        <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" />
      )}
      <div className="mb-8">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Nombre Gasto
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-base"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Cantidad Gasto
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2 text-base"
          placeholder="Ej. 300"
          value={cantidad || ''}
          onChange={(e) => guardarCantidad(parseInt(e.target.value, 10))}
        />
      </div>
      <input
        type="submit"
        className="w-full bg-[#004085] text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-900 transition-colors"
        value="Agregar Gasto"
      />
    </form>
  );
}
