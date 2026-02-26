'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Pregunta from '@/components/Pregunta';
import Formulario from '@/components/Formulario';
import Listado from '@/components/Listado';
import ControlPresupuesto from '@/components/ControlPresupuesto';
import LoginButton from '@/components/LoginButton';
import {
  fetchPresupuesto,
  savePresupuesto,
  fetchGastos,
  addGasto,
  deleteGasto,
  fetchCategorias,
  addCategoria,
  deleteCategoria,
} from '@/lib/api';
import type { Gasto, Categoria } from '@/types';

export default function Home() {
  const { data: session, status } = useSession();

  const [presupuesto, setPresupuesto]         = useState(0);
  const [gastos, setGastos]                   = useState<Gasto[]>([]);
  const [categorias, setCategorias]           = useState<Categoria[]>([]);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState<string | null>(null);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pres, gastosList, catsList] = await Promise.all([
        fetchPresupuesto(),
        fetchGastos(),
        fetchCategorias(),
      ]);
      setPresupuesto(pres.cantidad);
      setGastos(gastosList);
      setCategorias(catsList);
      actualizarPregunta(!(pres.cantidad > 0));
    } catch {
      setError('Error al cargar los datos. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      cargarDatos();
    }
  }, [status, cargarDatos]);

  const handleSetPresupuesto = async (valor: number) => {
    try {
      const pres = await savePresupuesto(valor);
      setPresupuesto(pres.cantidad);
    } catch {
      setError('Error al guardar el presupuesto.');
    }
  };

  const handleAgregarGasto = async (gasto: Gasto) => {
    try {
      const nuevo = await addGasto(gasto.nombre, gasto.cantidad, gasto.categoria_id, gasto.fecha);
      setGastos((prev) => [...prev, nuevo]);
    } catch {
      setError('Error al agregar el gasto.');
    }
  };

  const handleEliminarGasto = async (id: string) => {
    try {
      await deleteGasto(id);
      setGastos((prev) => prev.filter((g) => g.id !== id));
    } catch {
      setError('Error al eliminar el gasto.');
    }
  };

  const handleAgregarCategoria = useCallback(async (nombre: string, color: string): Promise<Categoria> => {
    try {
      const nueva = await addCategoria(nombre, color);
      setCategorias((prev) => [...prev, nueva].sort((a, b) => a.nombre.localeCompare(b.nombre)));
      return nueva;
    } catch {
      setError('Error al crear la categoría.');
      throw new Error('Error al crear la categoría.');
    }
  }, []);

  const handleEliminarCategoria = async (id: string) => {
    try {
      await deleteCategoria(id);
      setCategorias((prev) => prev.filter((c) => c.id !== id));
      setGastos((prev) =>
        prev.map((g) =>
          g.categoria_id === id ? { ...g, categoria_id: null, categoria: null } : g
        )
      );
    } catch {
      setError('Error al eliminar la categoría.');
    }
  };

  // handleEliminarCategoria is available for future use
  void handleEliminarCategoria;

  const totalGastado = useMemo(
    () => gastos.reduce((acc, g) => acc + Number(g.cantidad ?? 0), 0),
    [gastos]
  );

  const restante = useMemo(
    () => Number(presupuesto ?? 0) - totalGastado,
    [presupuesto, totalGastado]
  );

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Cargando...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto px-4">
        <header className="my-8">
          <h1 className="text-center text-7xl font-thin text-white mb-8">
            Gasto Semanal
          </h1>
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-[#004e92] text-2xl font-light mb-8">
              Iniciá sesión para gestionar tu presupuesto
            </p>
            <LoginButton isSignedIn={false} />
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <header className="my-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-7xl font-thin text-white">Gasto Semanal</h1>
          <LoginButton isSignedIn={true} userName={session?.user?.name} />
        </div>

        {error && (
          <p className="text-red-800 bg-red-100 border border-red-300 rounded px-5 py-3 mb-4 text-center">
            {error}
          </p>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-[#004e92] text-xl">Cargando datos...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8">
            {mostrarpregunta ? (
              <Pregunta
                guardarPresupuesto={handleSetPresupuesto}
                guardarRestante={() => {}}
                actualizarPregunta={actualizarPregunta}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Formulario
                    guardarGasto={handleAgregarGasto}
                    guardarCrearGasto={() => {}}
                    categorias={categorias}
                    onNuevaCategoria={handleAgregarCategoria}
                  />
                </div>
                <div>
                  <Listado
                    gastos={gastos}
                    categorias={categorias}
                    onEliminar={handleEliminarGasto}
                  />
                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}
