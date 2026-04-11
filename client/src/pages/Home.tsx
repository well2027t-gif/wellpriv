import { motion } from "framer-motion";
import { Instagram, Shield, Music, Twitter, Star, Lock, Send } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Welington R. - Link na Bio
 * Layout: 100dvh - tudo em uma tela
 * Foto grande, Privacy em destaque máximo, rodapé com direitos reservados
 */

interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: ReactNode;
  gradient: string;
  hoverGlow: string;
}

const LINKS: LinkItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/wel.priv_?igsh=MWhyMjBsaWo4azhkYg==",
    icon: <Instagram className="h-[18px] w-[18px]" />,
    gradient: "from-[#E1306C] via-[#F77737] to-[#FCAF45]",
    hoverGlow: "rgba(225, 48, 108, 0.35)",
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@wel_ribeiro.gym?_r=1&_t=ZS-95RRaizm2qa",
    icon: <Music className="h-[18px] w-[18px]" />,
    gradient: "from-[#00f2ea] to-[#ff0050]",
    hoverGlow: "rgba(0, 242, 234, 0.35)",
  },
  {
    id: "x",
    label: "X",
    url: "https://x.com/wellprivado?s=21",
    icon: <Twitter className="h-[18px] w-[18px]" />,
    gradient: "from-[#1DA1F2] to-[#0d8ecf]",
    hoverGlow: "rgba(29, 161, 242, 0.35)",
  },
  {
    id: "telegram",
    label: "Telegram",
    url: "https://t.me/+HyviwhvL1v81OTAx",
    icon: <Send className="h-[18px] w-[18px]" />,
    gradient: "from-[#0088cc] to-[#00a8e8]",
    hoverGlow: "rgba(0, 136, 204, 0.35)",
  },
];

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FF6B35]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [0, -50, -100], x: [0, Math.random() * 20 - 10] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.5, filter: "blur(20px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const privacyVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(14px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#FF6B35]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.06, 0.04], scale: [0.5, 1.1, 1] }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ filter: "blur(120px)" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[300px] w-[300px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#FF8C5A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          style={{ filter: "blur(90px)" }}
        />
      </div>

      <FloatingParticles />

      {/* Layout principal - 100dvh */}
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-md flex-col items-center justify-between px-5 py-6 sm:py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── TOPO: Foto grande + Nome ── */}
        <div className="flex flex-col items-center">
          {/* Foto de perfil GRANDE */}
          <motion.div variants={profileVariants} className="mb-3">
            <div className="relative">
              {/* Glow pulsante */}
              <motion.div
                className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FF6B35]"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "blur(14px)" }}
              />
              {/* Ring gradiente girando */}
              <motion.div
                className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FCAF45]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Foto */}
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#0a0a0a] sm:h-32 sm:w-32">
                <img src="./profile.jpeg" alt="Welington R." className="h-full w-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Nome */}
          <motion.h1
            variants={textVariants}
            className="mb-0.5 text-center text-xl font-bold tracking-tight text-white sm:text-2xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Welington R.
          </motion.h1>

          {/* Bio */}
          <motion.p
            variants={textVariants}
            className="text-center text-xs text-white/40"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Fitness &bull; Lifestyle &bull; Conteúdo
          </motion.p>
        </div>

        {/* ── MEIO: Privacy GRANDE + Links ── */}
        <div className="flex w-full flex-1 flex-col justify-center gap-2.5 py-3">

          {/* PRIVACY - Card GRANDE e chamativo */}
          <motion.a
            href="https://privacy.com.br/@Wellribeiro"
            target="_blank"
            rel="noopener noreferrer"
            variants={privacyVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 60px rgba(255, 107, 53, 0.45)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[#FF6B35]/40 bg-gradient-to-br from-[#FF6B35]/[0.15] via-[#FF8C5A]/[0.08] to-[#FF6B35]/[0.03] px-6 py-7 backdrop-blur-sm transition-all duration-300 hover:border-[#FF6B35]/60"
          >
            {/* Shimmer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FF6B35]/[0.1] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Glow pulsante de fundo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/[0.1] to-transparent"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Linha superior decorativa */}
            <motion.div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Badge EXCLUSIVO */}
            <motion.div
              className="relative flex items-center gap-1.5 rounded-full bg-[#FF6B35]/25 px-3 py-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="h-3.5 w-3.5 fill-[#FF6B35] text-[#FF6B35]" />
              <span className="text-[11px] font-bold tracking-wider text-[#FF6B35]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                CONTEÚDO EXCLUSIVO
              </span>
              <Star className="h-3.5 w-3.5 fill-[#FF6B35] text-[#FF6B35]" />
            </motion.div>

            {/* Ícone grande + Título */}
            <div className="relative flex w-full flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] text-white shadow-lg shadow-[#FF6B35]/30">
                <Lock className="h-6 w-6" />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <h3
                  className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#FF6B35]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Acesse Agora
                </h3>
                <p className="text-[11px] text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Conteúdos exclusivos no Privacy
                </p>
              </div>
            </div>

            {/* Botão CTA */}
            <motion.div
              className="relative mt-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] px-8 py-2 text-sm font-semibold text-white shadow-lg shadow-[#FF6B35]/25"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Acessar Privacy
            </motion.div>
          </motion.a>

          {/* Separador */}
          <motion.div
            variants={textVariants}
            className="mx-auto h-[1px] w-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* Outros links - compactos */}
          {LINKS.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              custom={index}
              whileHover={{
                scale: 1.04,
                boxShadow: `0 0 35px ${link.hoverGlow}`,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Gradiente hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]`} />

              {/* Ícone */}
              <motion.div
                className={`relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.gradient} text-white shadow-lg`}
                whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
              >
                {link.icon}
              </motion.div>

              {/* Label */}
              <h3
                className="relative flex-1 text-sm font-semibold text-white/90 transition-colors duration-300 group-hover:text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {link.label}
              </h3>

              {/* Seta */}
              <svg
                className="h-3.5 w-3.5 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* ── RODAPÉ: Direitos Reservados ── */}
        <motion.p
          variants={textVariants}
          className="text-[9px] text-white/15 tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          &copy; 2025 Welington Ribeiro. Todos os direitos reservados.
        </motion.p>
      </motion.div>
    </div>
  );
}
