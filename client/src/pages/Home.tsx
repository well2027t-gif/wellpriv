import { motion } from "framer-motion";
import { Star, Lock, Eye, Flame, Gift, Send } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Welington R. - Link na Bio
 * Layout: 100dvh - tudo em uma tela
 * Foto grande, Privacy em destaque máximo, rodapé com direitos reservados
 * Contador de visitas persistente via CounterAPI (global, todos os navegadores)
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
    // Sempre incrementa o contador a cada visita/atualização
    fetch(`${COUNTER_BASE}/up`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.count !== undefined) {
          setCount(data.count);
        }
      })
      .catch(() => {
        // Fallback: busca o valor atual sem incrementar
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

const telegramVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(14px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const promoCardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Visit Counter Badge ── */
function VisitCounterBadge({ count }: { count: number | null }) {
  return (
    <motion.div
      variants={textVariants}
      className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 backdrop-blur-sm"
    >
      <Eye className="h-3 w-3 text-white/40" />
      <span className="text-[10px] font-medium text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
        {count === null ? (
          <span className="animate-pulse">carregando...</span>
        ) : (
          <span>
            <span className="font-bold text-white/60">{count.toLocaleString("pt-BR")}</span> visualizações
          </span>
        )}
      </span>
    </motion.div>
  );
}

/* ── Promo Card Melhorado ── */

const PROMO_START_KEY = "wellpriv_promo_start";
const PROMO_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas em ms

function usePromoProgress() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Obtém ou cria o timestamp de início
    let startTime = Number(localStorage.getItem(PROMO_START_KEY));
    if (!startTime || isNaN(startTime)) {
      startTime = Date.now();
      localStorage.setItem(PROMO_START_KEY, String(startTime));
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      // Inicia em 12% e vai até 100% ao longo de 24h
      const rawPct = Math.min((elapsed / PROMO_DURATION_MS) * 100, 100);
      const pct = 12 + (rawPct / 100) * 88; // mapeia 0-100% para 12-100%
      setProgress(Math.min(Math.round(pct * 10) / 10, 100));
    };

    updateProgress();
    // Atualiza a cada 30 segundos para refletir o progresso real
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
        scale: 1.02,
        transition: { duration: 0.25 },
      }}
      whileTap={{ scale: 0.97 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-[#FF6B35]/30 bg-gradient-to-br from-[#1a0a00] via-[#150800] to-[#0a0a0a] p-[1px]"
      style={{ boxShadow: "0 0 40px rgba(255, 107, 53, 0.12), inset 0 0 40px rgba(255, 107, 53, 0.03)" }}
    >
      {/* Borda gradiente animada */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,107,53,0.5) 0%, transparent 40%, transparent 60%, rgba(255,140,90,0.4) 100%)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Conteúdo interno */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#1c0d02] via-[#130800] to-[#0d0d0d] px-4 py-4">
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-[#FF6B35]/[0.07] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        {/* Glow de fundo */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.12) 0%, transparent 70%)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Linha decorativa topo */}
        <motion.div
          className="absolute left-8 right-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/60 to-transparent"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative flex items-center gap-3">
          {/* Ícone com badge de fogo */}
          <div className="relative flex-shrink-0">
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] via-[#FF7A45] to-[#FF8C5A] shadow-lg"
              style={{ boxShadow: "0 4px 20px rgba(255, 107, 53, 0.4)" }}
              animate={{ boxShadow: ["0 4px 20px rgba(255,107,53,0.4)", "0 4px 30px rgba(255,107,53,0.65)", "0 4px 20px rgba(255,107,53,0.4)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift className="h-5 w-5 text-white" />
            </motion.div>
            {/* Badge de fogo */}
            <motion.div
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6B35]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Flame className="h-2.5 w-2.5 text-white" />
            </motion.div>
          </div>

          {/* Texto */}
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-[#FF8C5A]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Promoção Especial
              </span>
              <motion.span
                className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Limitado
              </motion.span>
            </div>
            <p className="text-[13px] leading-tight font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-green-300 text-[15px] drop-shadow-lg">40% DE DESCONTO</span>
              <br />
              <span className="text-white/60 text-[11px] font-normal">na assinatura</span>
            </p>
          </div>

          {/* Seta animada */}
          <motion.div
            className="flex-shrink-0 text-[#FF6B35]/60 transition-colors duration-300 group-hover:text-[#FF6B35]"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>

        {/* Cronômetro 24h */}
        <div className="relative mt-3 flex items-center justify-between rounded-lg bg-white/[0.05] px-3 py-2">
          <span className="text-[10px] font-semibold text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
            Oferta expira em:
          </span>
          <motion.span
            className="font-mono text-sm font-bold text-[#FF6B35]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {timeLeft}
          </motion.span>
        </div>

        {/* Barra de Assinaturas - enchendo em 24h */}
        <div className="relative mt-1.5 rounded-lg bg-white/[0.05] px-3 py-2">
          <span className="text-[10px] font-semibold text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
            Assinaturas
          </span>
          <div className="relative mt-1.5 overflow-hidden rounded-full bg-white/[0.08] h-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-400"
              initial={{ width: "12%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Home() {
  const visitCount = useVisitCounter();

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
        className="relative z-10 mx-auto flex h-full max-w-md flex-col items-center px-5 py-6 sm:py-8"
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

          {/* Contador de visitas */}
          <div className="mt-2">
            <VisitCounterBadge count={visitCount} />
          </div>
        </div>

        {/* ── MEIO: Privacy GRANDE + Links ── */}
        <div className="flex w-full flex-1 flex-col justify-start gap-2.5 pt-5">

          {/* TELEGRAM VIP - Card GRANDE e chamativo */}
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
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0088CC]/[0.1] to-transparent transition-transform duration-700 group-hover:translate-x-full" /}

            {/* Glow pulsante de fundo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#0088CC]/[0.1] to-transparent"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            /}

            {/* Linha superior decorativa */}
            <motion.div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0088CC] to-transparent"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            /}

            {/* Badge VIP - Posicionado no topo */}
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
                <Send className="h-6 w-6" /}
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#0088CC]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Acesse o Grupo
                </h3>
                <p className="text-[11px] text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                  R$ 10 - Acesso VIP no Telegram
                </p>
              </div>
            </div>

            {/* Botão CTA */}
            <motion.div
              className="relative mt-2 rounded-full bg-gradient-to-r from-[#0088CC] to-[#1DA1F2] px-8 py-2.5 text-sm font-semibold text-white shadow-lg"
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

          {/* Separador */}
          <motion.div
            variants={textVariants}
            className="mx-auto h-[1px] w-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* Card de Promoção Melhorado */}
          <PromoCard />

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
