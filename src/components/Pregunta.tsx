'use client';

import { useState } from 'react';
import Error from './Error';

interface PreguntaProps {
  guardarPresupuesto: (value: number) => void;
  guardarRestante:    (value: number) => void;
  actualizarPregunta: (value: boolean) => void;
}

export default function Pregunta({
  guardarPresupuesto,
  guardarRestante,
  actualizarPregunta,
}: PreguntaProps) {
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError]       = useState(false);

  const definirPresupuesto = (e: React.ChangeEvent<HTMLInputElement>) => {
    guardarCantidad(parseInt(e.target.value, 10));
  };

  const agregarPresupuesto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    actualizarPregunta(false);
  };

  return (
    <>
      <h2 className="text-center text-5xl font-light text-[#004e92] mb-8">
        Coloca tu presupuesto
      </h2>
      {error && <Error mensaje="El presupuesto es incorrecto" />}
      <form onSubmit={agregarPresupuesto}>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 text-base"
          placeholder="Coloca tu presupuesto"
          onChange={definirPresupuesto}
        />
        <input
          type="submit"
          className="w-full bg-[#004085] text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-900 transition-colors"
          value="Definir Presupuesto"
        />
      </form>
    </>
  );
}
