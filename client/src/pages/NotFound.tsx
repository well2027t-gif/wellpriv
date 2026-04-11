import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4 text-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-[#FF6B35]">404</h1>
        <p className="mb-8 text-xl text-white/60">Página não encontrada</p>
        <button
          onClick={() => setLocation("/")}
          className="rounded-full bg-[#FF6B35] px-8 py-3 font-bold transition-opacity hover:opacity-90"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
}

