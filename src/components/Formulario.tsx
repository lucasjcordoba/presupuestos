'use client';

import { useState } from 'react';
import Error from './Error';
import type { Gasto, Categoria } from '@/types';

interface FormularioProps {
  guardarGasto:      (gasto: Gasto) => void;
  guardarCrearGasto: (value: boolean) => void;
  categorias:        Categoria[];
  onNuevaCategoria:  (nombre: string, color: string) => Promise<Categoria>;
}

export default function Formulario({
  guardarGasto,
  guardarCrearGasto,
  categorias,
  onNuevaCategoria,
}: FormularioProps) {
  const today = () => new Date().toISOString().slice(0, 10);

  const [nombre,   guardarNombre]   = useState('');
  const [cantidad, guardarCantidad] = useState(0);
  const [error,    guardarError]    = useState(false);
  const [categoriaId, setCategoriaId] = useState('');
  const [fecha, setFecha]             = useState(today());

  // Mini-form para nueva categoría
  const [mostrarNuevaCat, setMostrarNuevaCat] = useState(false);
  const [nuevaCatNombre,  setNuevaCatNombre]  = useState('');
  const [nuevaCatColor,   setNuevaCatColor]   = useState('#6366f1');
  const [creandoCat,      setCreandoCat]      = useState(false);

  const handleSelectCategoria = (value: string) => {
    if (value === '__nueva__') {
      setMostrarNuevaCat(true);
    } else {
      setCategoriaId(value);
      setMostrarNuevaCat(false);
    }
  };

  const handleCrearCategoria = async () => {
    if (!nuevaCatNombre.trim()) return;
    setCreandoCat(true);
    try {
      const nueva = await onNuevaCategoria(nuevaCatNombre.trim(), nuevaCatColor);
      setCategoriaId(nueva.id);
      setMostrarNuevaCat(false);
      setNuevaCatNombre('');
      setNuevaCatColor('#6366f1');
    } catch {
      // error banner shown by parent
    } finally {
      setCreandoCat(false);
    }
  };

  const agregarGasto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
      guardarError(true);
      return;
    }
    const gasto: Gasto = {
      nombre,
      cantidad,
      id:          crypto.randomUUID(),
      categoria_id: categoriaId || null,
      fecha:        fecha || null,
    };
    guardarGasto(gasto);
    guardarCrearGasto(true);
    guardarNombre('');
    guardarCantidad(0);
    setCategoriaId('');
    setFecha(today());
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
      <div className="mb-8">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Categoría
        </label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white"
          value={mostrarNuevaCat ? '__nueva__' : categoriaId}
          onChange={(e) => handleSelectCategoria(e.target.value)}
        >
          <option value="">Sin categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
          <option value="__nueva__">+ Nueva categoría…</option>
        </select>

        {mostrarNuevaCat && (
          <div className="mt-2 p-3 border border-gray-200 rounded bg-gray-50 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Nombre de la categoría"
                value={nuevaCatNombre}
                onChange={(e) => setNuevaCatNombre(e.target.value)}
                autoFocus
              />
              <input
                type="color"
                className="w-10 h-8 rounded cursor-pointer border border-gray-300"
                value={nuevaCatColor}
                onChange={(e) => setNuevaCatColor(e.target.value)}
                title="Color de la categoría"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCrearCategoria}
                disabled={creandoCat || !nuevaCatNombre.trim()}
                className="flex-1 bg-[#004085] text-white text-sm py-1 px-3 rounded hover:bg-blue-900 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {creandoCat ? 'Creando…' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => { setMostrarNuevaCat(false); setCategoriaId(''); }}
                className="text-gray-500 hover:text-gray-700 text-sm px-3 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-8">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Fecha
        </label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2 text-base"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
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
