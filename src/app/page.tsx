'use client';

import { useEffect, useMemo, useState } from 'react';
import Pregunta from '@/components/Pregunta';
import Formulario from '@/components/Formulario';
import Listado from '@/components/Listado';
import ControlPresupuesto from '@/components/ControlPresupuesto';
import { loadJSON, saveJSON, STORAGE_KEYS } from '@/lib/storage';
import type { Gasto } from '@/types';

export default function Home() {
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gasto, guardarGasto]                 = useState<Gasto>({} as Gasto);
  const [creargasto, guardarCrearGasto]       = useState(false);
  const [presupuesto, setPresupuesto]         = useState(0);
  const [gastos, setGastos]                   = useState<Gasto[]>([]);

  useEffect(() => {
    const storedPresupuesto = loadJSON<number>(STORAGE_KEYS.presupuesto, 0);
    const storedGastos      = loadJSON<Gasto[]>(STORAGE_KEYS.gastos, []);

    const presupuestoNumber = Number(storedPresupuesto) || 0;
    const gastosArray       = Array.isArray(storedGastos) ? storedGastos : [];

    setPresupuesto(presupuestoNumber);
    setGastos(gastosArray);
    actualizarPregunta(!(presupuestoNumber > 0));
  }, []);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.presupuesto, presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.gastos, gastos);
  }, [gastos]);

  useEffect(() => {
    if (!creargasto) return;
    setGastos((prev) => [...prev, gasto]);
    guardarCrearGasto(false);
  }, [creargasto, gasto]);

  const totalGastado = useMemo(
    () => gastos.reduce((acc, g) => acc + Number(g?.cantidad ?? 0), 0),
    [gastos]
  );

  const restante = useMemo(
    () => Number(presupuesto || 0) - totalGastado,
    [presupuesto, totalGastado]
  );

  const handleSetPresupuesto = (value: number) => {
    setPresupuesto(Number(value) || 0);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="my-8">
        <h1 className="text-center text-7xl font-thin text-white mb-8">
          Gasto Semanal
        </h1>
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
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                />
              </div>
              <div>
                <Listado gastos={gastos} />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
