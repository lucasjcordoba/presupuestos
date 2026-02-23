import { revisarPresupuesto } from '@/lib/helpers';

interface ControlPresupuestoProps {
  presupuesto: number;
  restante: number;
}

const alertClasses: Record<string, string> = {
  success: 'text-green-800 bg-green-100 border border-green-300',
  warning: 'text-yellow-800 bg-yellow-100 border border-yellow-300',
  danger:  'text-red-800 bg-red-100 border border-red-300',
};

const baseAlert = 'px-5 py-3 mb-4 rounded';

export default function ControlPresupuesto({ presupuesto, restante }: ControlPresupuestoProps) {
  const status = revisarPresupuesto(presupuesto, restante);

  return (
    <>
      <div className={`${baseAlert} text-[#004085] bg-[#cce5ff] border border-[#b8daff]`}>
        <p className="font-bold m-0">
          Presupuesto: <span className="font-normal">$ {presupuesto}</span>
        </p>
      </div>
      <div className={`${baseAlert} ${alertClasses[status]}`}>
        <p className="font-bold m-0">
          Restante: <span className="font-normal">$ {restante}</span>
        </p>
      </div>
    </>
  );
}
