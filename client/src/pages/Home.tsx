import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Well Privé - Design Premium Azul
 */

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

function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-[#0088CC] to-[#0066AA]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.2, 0], y: [0, -100, -200], x: [0, Math.random() * 40 - 20] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.2, filter: "blur(40px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(15px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const count = useVisitCounter();

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-[#001a33] to-black overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0088CC]/10 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066AA]/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.03)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none" />

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 flex items-center justify-center w-full min-h-screen px-4 py-6"
      >
        <div className="w-full max-w-md space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-5">
            {/* Avatar with Premium Frame */}
            <motion.div
              variants={profileVariants}
              className="relative group"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#0088CC] via-[#0066AA] to-[#004499] rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Inner Shadow Frame */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-[#0088CC]/50 to-[#0066AA]/30 backdrop-blur-xl">
                <img
                  src="/profile.jpeg"
                  alt="Welington R."
                  className="relative h-32 w-32 rounded-3xl object-cover border-2 border-[#0088CC]/30 shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Name & Bio */}
            <motion.div variants={textVariants} className="text-center space-y-2">
              <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Welington R.
              </h1>
              <p className="text-sm text-[#0088CC]/90 font-semibold tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                FITNESS • LIFESTYLE • CONTEÚDO
              </p>
            </motion.div>

            {/* Views Counter */}
            <motion.div
              variants={textVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0088CC]/40 bg-gradient-to-r from-[#0088CC]/15 to-[#0066AA]/10 backdrop-blur-xl shadow-lg hover:border-[#0088CC]/60 transition-all"
            >
              <span className="text-xs font-bold text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
                {count === null ? (
                  <span className="animate-pulse">carregando...</span>
                ) : (
                  <span>
                    👁️ <span className="text-[#0088CC]">{count.toLocaleString("pt-BR")}</span> visualizações
                  </span>
                )}
              </span>
            </motion.div>
          </div>

          {/* Telegram VIP Card - Premium */}
          <motion.a
            href="https://t.me/welvip_bot"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 80px rgba(0, 136, 204, 0.5)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-3xl border border-[#0088CC]/50 bg-gradient-to-br from-[#0088CC]/20 via-[#0066AA]/10 to-[#004499]/5 px-6 py-8 backdrop-blur-2xl transition-all duration-300 hover:border-[#0088CC]/80 shadow-2xl"
          >
            {/* Premium Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            
            {/* Animated Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: [
                  "inset 0 0 20px rgba(0, 136, 204, 0.2)",
                  "inset 0 0 40px rgba(0, 136, 204, 0.4)",
                  "inset 0 0 20px rgba(0, 136, 204, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Badge */}
            <motion.div className="relative mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#0088CC]/30 px-3 py-1 border border-[#0088CC]/40">
              <span className="text-lg">😈</span>
              <span className="text-[10px] font-bold tracking-widest text-[#0088CC] uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
                VIP Members
              </span>
              <span className="text-lg">🔥</span>
            </motion.div>
            
            {/* Content */}
            <div className="relative space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0088CC] to-[#0066AA] text-white shadow-xl shadow-[#0088CC]/40">
                  <Send className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Acesse o Grupo VIP
                  </h3>
                  <p className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Conteúdo exclusivo e atualizado
                  </p>
                </div>
              </div>
              
              {/* CTA Button */}
              <motion.div
                className="relative rounded-2xl bg-gradient-to-r from-[#0088CC] to-[#0066AA] px-6 py-3 text-center font-bold text-white shadow-xl w-full"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(0, 136, 204, 0.4)",
                    "0 0 50px rgba(0, 136, 204, 0.8)",
                    "0 0 20px rgba(0, 136, 204, 0.4)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
              >
                Entrar no Telegram
              </motion.div>
            </div>
          </motion.a>

          {/* Payment Info - Premium */}
          <motion.div
            variants={textVariants}
            className="relative space-y-4 rounded-2xl border border-[#0088CC]/30 bg-gradient-to-br from-[#0088CC]/10 to-[#0066AA]/5 px-6 py-6 backdrop-blur-xl"
          >
            {/* Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0088CC]/50 to-transparent" />
            
            <div className="text-center space-y-3">
              <p className="text-xs text-white/70 uppercase tracking-widest font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Para ter acesso ao grupo
              </p>
              
              <div className="space-y-1">
                <p className="text-3xl font-black text-[#0088CC]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  R$ 10
                </p>
                <p className="text-xs text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                  via Pix
                </p>
              </div>
              
              <div className="pt-2 space-y-1">
                <p className="text-xs text-[#0088CC]/90 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  ✅ Acesso liberado automaticamente
                </p>
                <p className="text-[9px] text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                  após confirmação do pagamento
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-white/10 pt-3">
              <p className="text-[8px] text-white/25 text-center tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                © 2025 Welington R. Todos os direitos reservados.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
