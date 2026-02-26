import type { Gasto as GastoType } from '@/types';

interface GastoProps {
  gasto:      GastoType;
  onEliminar?: (id: string) => void;
}

export default function Gasto({ gasto, onEliminar }: GastoProps) {
  return (
    <li className="list-none border-b border-gray-200 py-4">
      <p className="flex justify-between items-start m-0">
        <span className="flex flex-col gap-1">
          <span>{gasto.nombre}</span>
          <span className="flex items-center gap-2">
            {gasto.categoria && (
              <span
                className="text-xs text-white px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: gasto.categoria.color }}
              >
                {gasto.categoria.nombre}
              </span>
            )}
            {gasto.fecha && (
              <span className="text-xs text-gray-400">{gasto.fecha}</span>
            )}
          </span>
        </span>
        <span className="flex items-center gap-2 shrink-0 ml-4">
          <span className="bg-[#004085] text-white px-4 py-4">
            $ {gasto.cantidad}
          </span>
          {onEliminar && (
            <button
              onClick={() => onEliminar(gasto.id)}
              className="text-red-500 hover:text-red-700 text-sm px-2 cursor-pointer"
              aria-label="Eliminar gasto"
            >
              ✕
            </button>
          )}
        </span>
      </p>
    </li>
  );
}
