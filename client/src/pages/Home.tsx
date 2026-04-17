import { motion } from "framer-motion";
import { Star, Lock, Eye, Flame, Gift, Send, Shield, Zap, Heart } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Well Privé - Novo Layout Moderno e Elegante
 * Design premium com animações suaves e experiência visual aprimorada
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

/* ── Cronômetro 24 horas ── */
function useCountdown24h() {
  const [timeLeft, setTimeLeft] = useState<string>("24:00:00");
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);
  return timeLeft;
}

/* ── Floating Particles Melhorados ── */
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

const promoCardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Visit Counter Badge Premium ── */
function VisitCounterBadge({ count }: { count: number | null }) {
  return (
    <motion.div
      variants={textVariants}
      className="flex items-center gap-2 rounded-full border border-[#FF6B35]/20 bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/5 px-4 py-2 backdrop-blur-xl shadow-lg"
      style={{ boxShadow: "0 8px 32px rgba(255, 107, 53, 0.15)" }}
    >
      <Eye className="h-4 w-4 text-[#FF6B35]" />
      <span className="text-xs font-semibold text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
        {count === null ? (
          <span className="animate-pulse">carregando...</span>
        ) : (
          <span>
            <span className="font-bold text-[#FF6B35]">{count.toLocaleString("pt-BR")}</span> visualizações
          </span>
        )}
      </span>
    </motion.div>
  );
}

/* ── Promo Card Premium ── */
const PROMO_START_KEY = "wellpriv_promo_start";
const PROMO_DURATION_MS = 24 * 60 * 60 * 1000;

function usePromoProgress() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let startTime = Number(localStorage.getItem(PROMO_START_KEY));
    if (!startTime || isNaN(startTime)) {
      startTime = Date.now();
      localStorage.setItem(PROMO_START_KEY, String(startTime));
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min((elapsed / PROMO_DURATION_MS) * 100, 100);
      const pct = 12 + (rawPct / 100) * 88;
      setProgress(Math.min(Math.round(pct * 10) / 10, 100));
    };

    updateProgress();
    const interval = setInterval(updateProgress, 30_000);
    return () => clearInterval(interval);
  }, []);

  return progress;
}

function PromoCard() {
  const progress = usePromoProgress();
  const timeLeft = useCountdown24h();
  return (
    <motion.a
      href="https://privacy.com.br/@Wellribeiro"
      target="_blank"
      rel="noopener noreferrer"
      variants={promoCardVariants}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.96 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-[#FF6B35]/40 bg-gradient-to-br from-[#1a0a00] via-[#150800] to-[#0a0a0a] p-[2px]"
      style={{ boxShadow: "0 0 60px rgba(255, 107, 53, 0.2), inset 0 0 60px rgba(255, 107, 53, 0.05)" }}
    >
      {/* Borda gradiente animada */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,107,53,0.6) 0%, transparent 40%, transparent 60%, rgba(255,140,90,0.5) 100%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Conteúdo interno */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#1c0d02] via-[#130800] to-[#0d0d0d] px-5 py-5">
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-[#FF6B35]/[0.1] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        {/* Glow de fundo */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.15) 0%, transparent 70%)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Linha decorativa topo */}
        <motion.div
          className="absolute left-8 right-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6B35]/70 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <div className="relative flex items-center gap-4">
          {/* Ícone com badge de fogo */}
          <div className="relative flex-shrink-0">
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] via-[#FF7A45] to-[#FF8C5A] shadow-2xl"
              style={{ boxShadow: "0 8px 30px rgba(255, 107, 53, 0.5)" }}
              animate={{ boxShadow: ["0 8px 30px rgba(255,107,53,0.5)", "0 8px 50px rgba(255,107,53,0.8)", "0 8px 30px rgba(255,107,53,0.5)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift className="h-6 w-6 text-white" />
            </motion.div>
            {/* Badge de fogo */}
            <motion.div
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] shadow-lg"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Flame className="h-3 w-3 text-white" />
            </motion.div>
          </div>

          {/* Texto */}
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className="text-base font-bold text-white transition-colors duration-300 group-hover:text-[#FF8C5A]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Promoção Especial
              </span>
              <motion.span
                className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Limitado
              </motion.span>
            </div>
            <p className="text-sm leading-tight font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-green-300">+50% OFF</span> em planos anuais
            </p>
          </div>

          {/* Seta */}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#FF6B35]"
          >
            <Send className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A]"
            initial={{ width: "12%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: "0 0 20px rgba(255, 107, 53, 0.6)" }}
          />
        </div>

        {/* Tempo restante */}
        <div className="relative mt-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
            Tempo restante
          </span>
          <span className="text-[11px] font-bold text-[#FF6B35]" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {timeLeft}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

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
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-6">
            {/* Avatar */}
            <motion.div
              variants={profileVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] rounded-3xl blur-2xl opacity-40" />
              <img
                src="/profile.jpeg"
                alt="Welington Ribeiro"
                className="relative h-32 w-32 rounded-3xl object-cover border-2 border-[#FF6B35]/50 shadow-2xl"
              />
            </motion.div>

            {/* Nome e Título */}
            <motion.div variants={textVariants} className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Welington Ribeiro
              </h1>
              <p className="text-lg text-[#FF6B35] font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Privacy Advocate
              </p>
            </motion.div>

            {/* Descrição */}
            <motion.p
              variants={textVariants}
              className="text-center text-white/70 text-sm leading-relaxed max-w-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Especialista em privacidade digital e proteção de dados. Ajudando pessoas a recuperar o controle sobre suas informações pessoais.
            </motion.p>

            {/* Visit Counter */}
            <VisitCounterBadge count={count} />
          </div>

          {/* Links Section */}
          <motion.div variants={cardVariants} className="space-y-3">
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

            {/* Promo Card */}
            <PromoCard />
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={textVariants} className="space-y-3">
            <motion.a
              href="https://privacy.com.br/@Wellribeiro"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center gap-2 w-full overflow-hidden rounded-xl border border-[#FF6B35]/50 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] px-6 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6B35]/50"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Shield className="h-5 w-5" />
              <span style={{ fontFamily: "'Poppins', sans-serif" }}>Proteja Sua Privacidade</span>
            </motion.a>

            <motion.a
              href="https://privacy.com.br/@Wellribeiro"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center gap-2 w-full overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.05] px-6 py-3 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Zap className="h-5 w-5" />
              <span style={{ fontFamily: "'Poppins', sans-serif" }}>Saiba Mais</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={textVariants} className="flex justify-center gap-4">
            <motion.a
              href="https://privacy.com.br/@Wellribeiro"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/70 transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]"
            >
              <Heart className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://privacy.com.br/@Wellribeiro"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/70 transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]"
            >
              <Lock className="h-5 w-5" />
            </motion.a>
          </motion.div>

          {/* Rodapé */}
          <motion.p
            variants={textVariants}
            className="text-center text-[10px] text-white/20 tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            &copy; 2025 Welington Ribeiro. Todos os direitos reservados.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
