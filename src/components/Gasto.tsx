import type { Gasto as GastoType } from '@/types';

interface GastoProps {
  gasto: GastoType;
  onEliminar?: (id: string) => void;
}

export default function Gasto({ gasto, onEliminar }: GastoProps) {
  return (
    <li className="list-none border-b border-gray-200 py-4">
      <p className="flex justify-between items-center m-0">
        {gasto.nombre}
        <span className="flex items-center gap-2">
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
