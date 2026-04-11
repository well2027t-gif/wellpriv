import { motion } from "framer-motion";
import { Instagram, Shield, Music, Twitter } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Welington R. - Link na Bio Pessoal
 * Design: Minimalismo Moderno com Elegância Escura
 * Paleta: Fundo escuro (#0a0a0a) + Acento laranja (#FF6B35)
 * Tipografia: Poppins (display) + Inter (body)
 * Animações: Framer Motion - fade-in cascata + hover effects
 */

interface LinkItem {
  id: string;
  label: string;
  description: string;
  url: string;
  icon: ReactNode;
  gradient: string;
  hoverGlow: string;
}

const LINKS: LinkItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    description: "@wel.priv_",
    url: "https://www.instagram.com/wel.priv_?igsh=MWhyMjBsaWo4azhkYg==",
    icon: <Instagram className="h-5 w-5" />,
    gradient: "from-[#E1306C] via-[#F77737] to-[#FCAF45]",
    hoverGlow: "rgba(225, 48, 108, 0.3)",
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Meu cartão digital",
    url: "https://privacy.com.br/@Wellribeiro",
    icon: <Shield className="h-5 w-5" />,
    gradient: "from-[#FF6B35] to-[#FF8C5A]",
    hoverGlow: "rgba(255, 107, 53, 0.3)",
  },
  {
    id: "tiktok",
    label: "TikTok",
    description: "@wel_ribeiro.gym",
    url: "https://www.tiktok.com/@wel_ribeiro.gym?_r=1&_t=ZS-95RRaizm2qa",
    icon: <Music className="h-5 w-5" />,
    gradient: "from-[#00f2ea] to-[#ff0050]",
    hoverGlow: "rgba(0, 242, 234, 0.3)",
  },
  {
    id: "x",
    label: "X",
    description: "@wellprivado",
    url: "https://x.com/wellprivado?s=21",
    icon: <Twitter className="h-5 w-5" />,
    gradient: "from-[#1DA1F2] to-[#0d8ecf]",
    hoverGlow: "rgba(29, 161, 242, 0.3)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background com gradiente sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B35] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#FF6B35] opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 h-[300px] w-[300px] translate-x-1/2 rounded-full bg-[#FF8C5A] opacity-[0.02] blur-[80px]" />
      </div>

      {/* Conteúdo principal */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center px-6 py-12 sm:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Foto de perfil */}
        <motion.div variants={profileVariants} className="mb-6">
          <div className="relative">
            {/* Ring animado */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FF6B35] opacity-80 blur-sm" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FF6B35] opacity-60" />
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#0a0a0a] sm:h-32 sm:w-32">
              <img
                src="/profile.jpeg"
                alt="Welington R."
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Nome */}
        <motion.h1
          variants={itemVariants}
          className="mb-1 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Welington R.
        </motion.h1>

        {/* Bio / Subtítulo */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-center text-sm text-white/50"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Fitness &bull; Lifestyle &bull; Conteúdo
        </motion.p>

        {/* Linha decorativa */}
        <motion.div
          variants={itemVariants}
          className="mb-10 h-[1px] w-16 bg-gradient-to-r from-transparent via-[#FF6B35]/60 to-transparent"
        />

        {/* Links */}
        <div className="flex w-full flex-col gap-4">
          {LINKS.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 8px 32px ${link.hoverGlow}`,
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] px-5 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.07]"
            >
              {/* Gradiente de fundo no hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]`}
              />

              {/* Ícone */}
              <div
                className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.gradient} text-white shadow-lg`}
              >
                {link.icon}
              </div>

              {/* Texto */}
              <div className="relative flex-1">
                <h3
                  className="text-[15px] font-semibold text-white/90 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.label}
                </h3>
                <p
                  className="text-xs text-white/40 transition-colors duration-300 group-hover:text-white/55"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.description}
                </p>
              </div>

              {/* Seta */}
              <div className="relative flex-shrink-0">
                <svg
                  className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-auto pt-12 text-center"
        >
          <div className="mb-3 h-[1px] w-12 mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p
            className="text-[11px] text-white/20 tracking-widest uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Well Privacy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
