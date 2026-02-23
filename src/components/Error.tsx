interface ErrorProps {
  mensaje: string;
}

export default function Error({ mensaje }: ErrorProps) {
  return (
    <p className="text-center text-red-800 bg-red-100 border border-red-300 rounded px-5 py-3 mb-4">
      {mensaje}
    </p>
  );
}
