'use client';

import { signIn, signOut } from 'next-auth/react';

interface LoginButtonProps {
  isSignedIn: boolean;
  userName?: string | null;
}

export default function LoginButton({ isSignedIn, userName }: LoginButtonProps) {
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white/80 text-sm">{userName}</span>
        <button
          onClick={() => signOut()}
          className="text-sm text-white border border-white/40 px-3 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="bg-white text-[#004085] font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
    >
      Iniciar sesión con Google
    </button>
  );
}
