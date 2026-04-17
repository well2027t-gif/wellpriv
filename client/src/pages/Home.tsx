import { motion } from "framer-motion";
import { Send, Shield, Zap, Heart, Lock } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Well Privé - Layout Limpo e Profissional
 * Foco em Welington R., Telegram VIP e Informações de Pagamento
 */

interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: ReactNode;
  gradient: string;
  hoverGlow: string;
}

const LINKS: LinkItem[] = [];

/* ── Contador de Visitas Global ── */
const COUNTER_API_NAMESPACE = "wellpriv";
const COUNTER_API_KEY = "visits";
const COUNTER_BASE = `https://api.counterapi.dev/v1/${COUNTER_API_NAMESPACE}/${COUNTER_API_KEY}`;

function useVisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${COUNTER_BASE}/up`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.count !== undefined) {
          setCount(data.count);
        }
      })
      .catch(() => {
        fetch(COUNTER_BASE)
          .then((r) => r.json())
          .then((data) => {
            if (data?.count !== undefined) setCount(data.count);
          })
          .catch(() => setCount(null));
      });
  }, []);

  return count;
}

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.2, 0], y: [0, -80, -150], x: [0, Math.random() * 30 - 15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Animated Background Grid ── */
function AnimatedBackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,107,53,0.03)_25%,rgba(255,107,53,0.03)_50%,transparent_50%,transparent_75%,rgba(255,107,53,0.03)_75%,rgba(255,107,53,0.03))] bg-[length:60px_60px] animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(255,107,53,0.05)]" />
    </div>
  );
}

/* ── Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.3, filter: "blur(30px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(15px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const telegramVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(14px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Componente Principal ── */
export default function Home() {
  const count = useVisitCounter();

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Background Elements */}
      <AnimatedBackgroundGrid />
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#FF6B35]/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#FF8C5A]/10 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Conteúdo Principal */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Profile Section - FOTO DESTACADA */}
          <div className="flex flex-col items-center gap-6">
            {/* Avatar - GRANDE E DESTACADO */}
            <motion.div
              variants={profileVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] rounded-3xl blur-3xl opacity-60" />
              <img
                src="/profile.jpeg"
                alt="Welington R."
                className="relative h-40 w-40 rounded-3xl object-cover border-4 border-[#FF6B35] shadow-2xl"
              />
            </motion.div>

            {/* Nome e Descrição */}
            <motion.div variants={textVariants} className="text-center space-y-2">
              <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Welington R.
              </h1>
              <p className="text-lg text-white/70 font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Fitness • Lifestyle • Conteúdo
              </p>
            </motion.div>

            {/* Contador de Visitas */}
            <motion.div
              variants={textVariants}
              className="flex items-center gap-2 rounded-full border border-[#FF6B35]/20 bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/5 px-4 py-2 backdrop-blur-xl shadow-lg"
              style={{ boxShadow: "0 8px 32px rgba(255, 107, 53, 0.15)" }}
            >
              <span className="text-xs font-semibold text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                {count === null ? (
                  <span className="animate-pulse">carregando...</span>
                ) : (
                  <span>
                    👁️ <span className="font-bold text-[#FF6B35]">{count.toLocaleString("pt-BR")}</span> visualizações
                  </span>
                )}
              </span>
            </motion.div>
          </div>

          {/* Links Section */}
          <motion.div variants={cardVariants} className="space-y-3">
            {/* TELEGRAM VIP - Card PRINCIPAL */}
            <motion.a
              href="https://t.me/welvip_bot"
              target="_blank"
              rel="noopener noreferrer"
              variants={telegramVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 60px rgba(0, 136, 204, 0.45)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[#0088CC]/40 bg-gradient-to-br from-[#0088CC]/[0.15] via-[#1DA1F2]/[0.08] to-[#0088CC]/[0.03] px-6 py-7 backdrop-blur-sm transition-all duration-300 hover:border-[#0088CC]/60"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0088CC]/[0.1] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {/* Glow pulsante de fundo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#0088CC]/[0.1] to-transparent"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Linha superior decorativa */}
              <motion.div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0088CC] to-transparent"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Badge VIP */}
              <motion.div
                className="relative -mt-2 flex items-center gap-1.5 rounded-full bg-[#0088CC]/25 px-3 py-1"
              >
                <span className="text-lg">😈</span>
                <span className="text-[11px] font-bold tracking-wider text-[#0088CC]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  WELL VIP MEMBERS
                </span>
                <span className="text-lg">🔥</span>
              </motion.div>
              {/* Ícone grande + Título */}
              <div className="relative flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0088CC] to-[#1DA1F2] text-white shadow-lg shadow-[#0088CC]/30">
                  <Send className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#0088CC]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Acesse o Grupo VIP
                  </h3>
                  <p className="text-[11px] text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Conteúdo exclusivo e atualizado
                  </p>
                </div>
              </div>
              {/* Botão CTA */}
              <motion.div
                className="relative mt-3 rounded-full bg-gradient-to-r from-[#0088CC] to-[#1DA1F2] px-8 py-3 text-sm font-semibold text-white shadow-lg w-full text-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 20px rgba(0, 136, 204, 0.5)",
                    "0 0 40px rgba(0, 136, 204, 0.8)",
                    "0 0 20px rgba(0, 136, 204, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              >
                Entrar no Telegram
              </motion.div>
            </motion.a>

            {/* Outros links */}
            {LINKS.length > 0 && (
              <div className="space-y-3">
                {LINKS.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={index}
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 40px ${link.hoverGlow}`,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.08]"
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {/* Gradiente hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.08]`} />

                    {/* Ícone */}
                    <motion.div
                      className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${link.gradient} text-white shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
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
                      className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/60"
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
            )}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={textVariants} className="space-y-3">
            <motion.a
              href="https://t.me/welvip_bot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center gap-2 w-full overflow-hidden rounded-xl border border-[#FF6B35]/50 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] px-6 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6B35]/50"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Shield className="h-5 w-5" />
              <span style={{ fontFamily: "'Poppins', sans-serif" }}>Acessar Grupo VIP</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={textVariants} className="flex justify-center gap-4">
            <motion.a
              href="https://t.me/welvip_bot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/70 transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]"
            >
              <Heart className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://t.me/welvip_bot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/70 transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]"
            >
              <Lock className="h-5 w-5" />
            </motion.a>
          </motion.div>

          {/* Rodapé com Informações de Pagamento - MUITO DESTACADO */}
          <motion.div variants={textVariants} className="space-y-4 rounded-2xl border-2 border-[#FF6B35]/50 bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8C5A]/5 p-6 backdrop-blur-xl">
            <div className="text-center space-y-3">
              <p className="text-sm text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                Para ter acesso ao grupo:
              </p>
              <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-xl p-4">
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  R$ 10 via Pix
                </p>
              </div>
              <p className="text-xs text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                ✅ Após confirmação, acesso liberado automaticamente
              </p>
            </div>
            <div className="border-t border-white/10 pt-3">
              <p className="text-[9px] text-white/30 text-center tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                &copy; 2025 Welington R. Todos os direitos reservados.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
