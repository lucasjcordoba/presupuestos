import type { Gasto as GastoType } from '@/types';

interface GastoProps {
  gasto: GastoType;
}

export default function Gasto({ gasto }: GastoProps) {
  return (
    <li className="list-none border-b border-gray-200 py-4">
      <p className="flex justify-between items-center m-0">
        {gasto.nombre}
        <span className="bg-[#004085] text-white px-4 py-4">
          $ {gasto.cantidad}
        </span>
      </p>
    </li>
  );
}
