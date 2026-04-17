import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Well Privé - Layout Azul Telegram Compacto para Mobile
 */

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

/* ── Floating Particles (Azul) ── */
function FloatingParticles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.3,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-[#0088CC] to-[#1DA1F2]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.1, 0], y: [0, -60, -120], x: [0, Math.random() * 20 - 10] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Animated Background Grid (Azul) ── */
function AnimatedBackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,136,204,0.02)_25%,rgba(0,136,204,0.02)_50%,transparent_50%,transparent_75%,rgba(0,136,204,0.02)_75%,rgba(0,136,204,0.02))] bg-[length:60px_60px] animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,136,204,0.03)]" />
    </div>
  );
}

/* ── Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.3, filter: "blur(30px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(14px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Componente Principal ── */
export default function Home() {
  const count = useVisitCounter();

  return (
    <div className="relative w-full bg-black overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Background Elements */}
      <AnimatedBackgroundGrid />
      <FloatingParticles />

      {/* Gradient orbs (Azul) - Menores */}
      <div className="absolute -top-32 -left-32 w-56 h-56 bg-[#0088CC]/15 rounded-full blur-3xl opacity-25 animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-56 h-56 bg-[#1DA1F2]/8 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Conteúdo Principal - Compacto */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 flex w-full items-center justify-center px-3 py-4 sm:px-6"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-full max-w-sm space-y-4">
          {/* Profile Section - Compacto */}
          <div className="flex flex-col items-center gap-3">
            {/* Avatar - Reduzido */}
            <motion.div
              variants={profileVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0088CC] to-[#1DA1F2] rounded-2xl blur-2xl opacity-50" />
              <img
                src="/profile.jpeg"
                alt="Welington R."
                className="relative h-28 w-28 rounded-2xl object-cover border-3 border-[#0088CC] shadow-xl"
              />
            </motion.div>

            {/* Nome e Descrição - Compacto */}
            <motion.div variants={textVariants} className="text-center space-y-1">
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Welington R.
              </h1>
              <p className="text-xs text-white/70 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Fitness • Lifestyle • Conteúdo
              </p>
            </motion.div>

            {/* Contador de Visitas - Compacto */}
            <motion.div
              variants={textVariants}
              className="flex items-center gap-2 rounded-full border border-[#0088CC]/30 bg-gradient-to-r from-[#0088CC]/10 to-[#1DA1F2]/5 px-3 py-1 backdrop-blur-xl shadow-md"
              style={{ boxShadow: "0 4px 16px rgba(0, 136, 204, 0.1)" }}
            >
              <span className="text-[10px] font-semibold text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                {count === null ? (
                  <span className="animate-pulse">carregando...</span>
                ) : (
                  <span>
                    👁️ <span className="font-bold text-[#0088CC]">{count.toLocaleString("pt-BR")}</span> views
                  </span>
                )}
              </span>
            </motion.div>
          </div>

          {/* TELEGRAM VIP Card - Compacto */}
          <motion.a
            href="https://t.me/welvip_bot"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 40px rgba(0, 136, 204, 0.35)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-[#0088CC]/40 bg-gradient-to-br from-[#0088CC]/[0.15] via-[#1DA1F2]/[0.08] to-[#0088CC]/[0.03] px-4 py-5 backdrop-blur-sm transition-all duration-300 hover:border-[#0088CC]/60"
          >
            {/* Shimmer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0088CC]/[0.1] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            
            {/* Glow pulsante */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#0088CC]/[0.1] to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Linha superior decorativa */}
            <motion.div
              className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0088CC] to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Badge VIP - Compacto */}
            <motion.div className="relative -mt-1 flex items-center gap-1 rounded-full bg-[#0088CC]/25 px-2 py-0.5">
              <span className="text-sm">😈</span>
              <span className="text-[9px] font-bold tracking-wider text-[#0088CC]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                WELL VIP
              </span>
              <span className="text-sm">🔥</span>
            </motion.div>
            
            {/* Ícone + Título - Compacto */}
            <div className="relative flex items-center gap-2 w-full">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0088CC] to-[#1DA1F2] text-white shadow-lg shadow-[#0088CC]/30">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-[#0088CC]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Acesse o Grupo VIP
                </h3>
                <p className="text-[9px] text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Conteúdo exclusivo
                </p>
              </div>
            </div>
            
            {/* Botão CTA - Compacto */}
            <motion.div
              className="relative rounded-full bg-gradient-to-r from-[#0088CC] to-[#1DA1F2] px-6 py-2 text-xs font-semibold text-white shadow-lg w-full text-center"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 15px rgba(0, 136, 204, 0.4)",
                  "0 0 30px rgba(0, 136, 204, 0.7)",
                  "0 0 15px rgba(0, 136, 204, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              Entrar no Telegram
            </motion.div>
          </motion.a>

          {/* Informações de Pagamento - Compacto */}
          <motion.div variants={textVariants} className="space-y-2 text-center">
            <p className="text-xs text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
              Para ter acesso:
            </p>
            <p className="text-xl font-bold text-[#0088CC]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              R$ 10 via Pix
            </p>
            <p className="text-[8px] text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
              ✅ Acesso liberado automaticamente
            </p>
            <div className="border-t border-white/10 pt-2">
              <p className="text-[8px] text-white/25 tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                &copy; 2025 Welington R.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
