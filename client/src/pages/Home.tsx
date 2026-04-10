import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

/**
 * FitGym - Link na Bio
 * Design: Minimalismo Moderno com Foco em Movimento
 * Paleta: Branco limpo + Laranja vibrante (#FF6B35)
 * Tipografia: Poppins (display) + Inter (body)
 * Animações: Hover effects suaves, scale e rotate
 */

interface LinkItem {
  id: string;
  label: string;
  description: string;
  url: string;
  icon: string;
  color: string;
}

const LINKS: LinkItem[] = [
  {
    id: "privacy",
    label: "Privacy",
    description: "Política de Privacidade",
    url: "#privacy",
    icon: "🔒",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Siga-nos no Instagram",
    url: "#instagram",
    icon: "📷",
    color: "from-pink-500 to-orange-500",
  },
  {
    id: "tiktok",
    label: "TikTok",
    description: "Acompanhe nossos vídeos",
    url: "#tiktok",
    icon: "🎵",
    color: "from-gray-900 to-gray-700",
  },
];

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section com Background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white px-4 py-16 sm:py-24">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029696597/FZjcN9PzdxNp8RUxhV2T9v/fitgym-hero-bg-EAkfRWRNBHdmtUfZnYLWnB.webp"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* Logo/Título */}
          <div className="mb-8 inline-block">
            <div className="rounded-full bg-orange-100 p-4">
              <div className="text-4xl">💪</div>
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="font-display mb-4 text-4xl sm:text-5xl md:text-6xl text-gray-900">
            FitGym
          </h1>

          {/* Subtítulo */}
          <p className="font-body mb-12 text-lg text-gray-600 sm:text-xl">
            Acesse todos os nossos links em um único lugar
          </p>

          {/* Linha decorativa */}
          <div className="mx-auto mb-12 h-1 w-16 bg-gradient-to-r from-orange-400 to-orange-600" />
        </div>
      </section>

      {/* Links Section */}
      <section className="relative z-20 -mt-8 px-4 pb-20 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-6 sm:gap-8">
            {LINKS.map((link, index) => (
              <div
                key={link.id}
                className="link-card group cursor-pointer"
                onMouseEnter={() => setHoveredId(link.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  if (link.url !== "#privacy" && link.url !== "#instagram" && link.url !== "#tiktok") {
                    window.open(link.url, "_blank");
                  }
                }}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {/* Ícone */}
                <div className="link-card-icon text-3xl">
                  {link.icon}
                </div>

                {/* Conteúdo */}
                <div className="flex-1">
                  <h3 className="font-accent mb-2 text-xl text-gray-900">
                    {link.label}
                  </h3>
                  <p className="font-body text-sm text-gray-600">
                    {link.description}
                  </p>
                </div>

                {/* Ícone de link externo */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:translate-x-1">
                  <ExternalLink className="h-5 w-5 text-orange-500 opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>

          {/* Call-to-Action */}
          <div className="mt-16 text-center">
            <p className="font-body text-sm text-gray-500">
              Clique em qualquer link para acessar
            </p>
          </div>
        </div>
      </section>

      {/* Estilos de Animação */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .link-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .link-card:hover {
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.15);
        }
      `}</style>
    </div>
  );
}
