import { motion } from "framer-motion";
import { Send, CheckCircle2, ShieldCheck, Zap, CreditCard, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Well Privé - Novo Layout Premium Azul
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
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.1, 0], y: [0, -150, -300], x: [0, Math.random() * 60 - 30] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const count = useVisitCounter();

  return (
    <div className="relative w-full min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <FloatingParticles />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-600 via-blue-400 to-cyan-400 shadow-2xl shadow-blue-500/20">
              <img
                src="/profile.jpeg"
                alt="Welington R."
                className="w-32 h-32 rounded-full object-cover border-4 border-[#020617]"
              />
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-[#020617] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Welington R.</h1>
          <p className="text-blue-400 font-medium tracking-widest text-sm uppercase mb-4">Fitness • Lifestyle • Conteúdo</p>
          
          {count !== null && (
            <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span className="text-xs font-semibold text-blue-300">
                {count.toLocaleString("pt-BR")} visualizações
              </span>
            </div>
          )}
        </motion.div>

        {/* Main CTA - Telegram */}
        <motion.div variants={itemVariants} className="w-full mb-8">
          <a
            href="https://t.me/welvip_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full p-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-600/20"
          >
            <div className="relative bg-[#020617] rounded-[22px] p-6 flex items-center justify-between overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/40">
                  <Send className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Grupo VIP Telegram</h3>
                  <p className="text-slate-400 text-sm">Acesso imediato ao conteúdo exclusivo</p>
                </div>
              </div>
              
              <div className="hidden sm:flex w-10 h-10 rounded-full border border-slate-800 items-center justify-center group-hover:border-blue-500/50 transition-colors">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </a>
        </motion.div>

        {/* Pricing & Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
          <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-300">Valor Único</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">R$ 10</span>
              <span className="text-slate-500 text-sm">/ acesso</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">Pagamento via Pix com liberação automática.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-300">Garantia</span>
            </div>
            <div className="text-white font-bold text-lg">Privacidade Total</div>
            <p className="mt-2 text-xs text-slate-400">Ambiente seguro e discreto para membros.</p>
          </motion.div>
        </div>

        {/* Features List */}
        <motion.div variants={itemVariants} className="w-full space-y-3 mb-12">
          {[
            "Conteúdo exclusivo e atualizado diariamente",
            "Acesso vitalício ao grupo selecionado",
            "Suporte direto via bot no Telegram",
            "Comunidade ativa e privada"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/30 border border-slate-800/50">
              <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* Secondary Link */}
        <motion.div variants={itemVariants} className="w-full">
          <a
            href="https://t.me/welvip_bot"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Dúvidas? Fale com o suporte</span>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="mt-20 text-center">
          <p className="text-xs text-slate-600 uppercase tracking-[0.2em] mb-4">
            © 2026 Welington R. • Todos os direitos reservados
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <div className="w-1 h-1 rounded-full bg-slate-800" />
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}
