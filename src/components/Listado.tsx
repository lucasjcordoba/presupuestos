import type { Gasto } from '@/types';
import GastoItem from './Gasto';

interface ListadoProps {
  gastos: Gasto[];
  onEliminar?: (id: string) => void;
}

export default function Listado({ gastos, onEliminar }: ListadoProps) {
  return (
    <div className="mb-8">
      <h2 className="text-center text-4xl font-light text-[#004e92] mb-8">
        Listado
      </h2>
      <ul className="p-0 m-0">
        {gastos.map((gasto) => (
          <GastoItem key={gasto.id} gasto={gasto} onEliminar={onEliminar} />
        ))}
      </ul>
    </div>
  );
}
