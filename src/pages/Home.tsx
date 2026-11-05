import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import tipoP from "@/assets/logos/tipoP.png";
import tipoW from "@/assets/logos/tipoW.png";
import logoP from "@/assets/logos/logoP.png";
import logoW from "@/assets/logos/logoW.png";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import { PROJECT } from "@/config/project";
import { useAuth } from "@/context/AuthContext";

const icon = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "w-6 h-6",
};

const PROBLEMS = [
  {
    title: "Notícias falsas",
    text: "Fotos inventadas por IA espalham boatos e enganam muita gente em poucos minutos.",
    icon: (
      <svg {...icon}>
        <path d="M4 5h13v14H6a2 2 0 0 1-2-2z" />
        <path d="M17 9h3v8a2 2 0 0 1-2 2" />
        <path d="M8 9h5M8 13h5M8 16h3" />
      </svg>
    ),
  },
  {
    title: "Rostos falsos e golpes",
    text: "Fotos de pessoas reais são alteradas para enganar, difamar ou pedir dinheiro.",
    icon: (
      <svg {...icon}>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21c0-4 3-6 7-6s7 2 7 6" />
        <path d="M17 7l4 4M21 7l-4 4" />
      </svg>
    ),
  },
  {
    title: "Montagens e edições",
    text: "Uma imagem alterada pode mudar completamente o sentido de um fato.",
    icon: (
      <svg {...icon}>
        <rect x="3" y="4" width="13" height="13" rx="2" />
        <path d="M3 14l4-4 4 4" />
        <path d="M14 21l7-7-2-2-7 7v2z" />
      </svg>
    ),
  },
  {
    title: "Difícil de perceber a olho nu",
    text: "Os erros ficam nos detalhes, como mãos, sombras e texturas, e passam despercebidos.",
    icon: (
      <svg {...icon}>
        <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    title: "Entre na sua conta",
    text: "Crie sua conta grátis ou entre com e-mail e senha. A análise só funciona para quem está logado.",
  },
  {
    title: "Envie a imagem",
    text: "Escolha a foto ou o print que você quer conferir, direto do celular ou do computador.",
  },
  {
    title: "Veja o resultado",
    text: "Em poucos segundos aparece a chance de a imagem ser real ou feita por IA, com os motivos explicados.",
  },
];

const SIGNS = [
  {
    id: "maos",
    label: "Mãos e dedos",
    title: "Conte os dedos",
    text: "A IA costuma errar mãos: dedos a mais ou a menos, dedos colados, unhas que se misturam com a pele.",
    tip: "Dê zoom nas mãos antes de acreditar na foto.",
  },
  {
    id: "luz",
    label: "Luz e sombras",
    title: "A luz combina?",
    text: "Veja se as sombras vão todas para o mesmo lado e se o brilho no rosto combina com o lugar da foto.",
    tip: "Sombras em direções diferentes são um sinal de alerta.",
  },
  {
    id: "pele",
    label: "Pele e texturas",
    title: "Perfeito demais?",
    text: "Pele lisa como plástico, sem poros nem marcas, e cabelo que se mistura com o fundo são comuns em imagens feitas por IA.",
    tip: "Desconfie de quem parece um boneco de cera.",
  },
  {
    id: "textos",
    label: "Letras e placas",
    title: "Tente ler",
    text: "Placas, rótulos e camisetas com letras tortas ou palavras sem sentido costumam aparecer em imagens falsas.",
    tip: "Se não dá para ler o que está escrito, fique atento.",
  },
  {
    id: "fundo",
    label: "Fundo e bordas",
    title: "Olhe ao redor",
    text: "Objetos derretendo, pessoas repetidas na multidão ou bordas borradas ao redor de alguém indicam montagem ou IA.",
    tip: "O fundo costuma ter mais erros do que o centro da foto.",
  },
];

const FAQ = [
  {
    q: "Preciso pagar para usar?",
    a: "Não. O DALE é um projeto acadêmico e gratuito. Você só precisa criar uma conta.",
  },
  {
    q: "Por que preciso fazer login para analisar?",
    a: "Para proteger o serviço contra uso abusivo e para guardar o histórico das suas análises só para você.",
  },
  {
    q: "A minha foto fica salva?",
    a: "Não. A imagem é usada apenas durante a análise e depois é descartada. Guardamos só o resultado, que você pode apagar quando quiser.",
  },
  {
    q: "O resultado é 100% certo?",
    a: "Não existe ferramenta perfeita. O resultado é uma ajuda para você decidir com mais calma. Sempre confira a fonte da imagem.",
  },
];

function ExampleResult() {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setFilled(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFilled(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-violet-200 dark:border-violet-900 bg-violet-50 dark:bg-violet-950/40 p-6 shadow-xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">
        Exemplo de resultado
      </p>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Provável IA</p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        A imagem tem vários sinais de ter sido criada por inteligência artificial.
      </p>

      <div className="mt-5 flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-300">
          Feita por IA <strong className="text-gray-900 dark:text-white">92%</strong>
        </span>
        <span className="text-gray-600 dark:text-gray-300">
          Foto real <strong className="text-gray-900 dark:text-white">8%</strong>
        </span>
      </div>
      <div
        className="mt-2 flex h-3 gap-0.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
        role="img"
        aria-label="92% de chance de ser feita por IA e 8% de ser uma foto real"
      >
        <div
          className="h-full bg-[#6250d6] dark:bg-[#9085e9] motion-safe:transition-all motion-safe:duration-1000"
          style={{ width: filled ? "92%" : "0%" }}
        />
        <div
          className="h-full bg-[#1baf7a] dark:bg-[#199e70] motion-safe:transition-all motion-safe:duration-1000"
          style={{ width: filled ? "8%" : "0%" }}
        />
      </div>

      <p className="mt-5 text-sm font-semibold text-gray-800 dark:text-gray-100">Por quê?</p>
      <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-200">
        {["Mão com dedos a mais", "Luz e sombras que não combinam com o fundo", "Pele lisa demais, sem textura natural"].map(
          (reason) => (
            <li key={reason} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#6250d6] dark:bg-[#9085e9]" />
              {reason}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function SignsTrainer() {
  const [active, setActive] = useState(SIGNS[0].id);
  const current = SIGNS.find((s) => s.id === active) ?? SIGNS[0];

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-6 md:p-8 shadow-xl">
      <div role="tablist" aria-label="Sinais para observar" className="flex flex-wrap gap-2">
        {SIGNS.map((sign) => (
          <button
            key={sign.id}
            type="button"
            role="tab"
            id={`tab-${sign.id}`}
            aria-selected={active === sign.id}
            aria-controls={`panel-${sign.id}`}
            onClick={() => setActive(sign.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px] ${
              active === sign.id
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {sign.label}
          </button>
        ))}
      </div>

      <div
        key={current.id}
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="mt-6 motion-safe:animate-[fadeIn_.4s_ease-out]"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{current.title}</h3>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-200 leading-relaxed">{current.text}</p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 px-4 py-2 text-sm font-medium text-amber-900 dark:text-amber-200">
          <svg {...icon} className="w-4 h-4">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
          </svg>
          {current.tip}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  const logged = !loading && !!user;

  const primaryCta = logged
    ? { to: "/analyze-image", label: "Analisar uma imagem" }
    : { to: "/login", label: "Entrar para analisar" };
  const secondaryCta = logged
    ? { to: "/dashboard", label: "Ver meu histórico" }
    : { to: "/register", label: "Criar conta grátis" };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-100 to-purple-100 dark:from-gray-950 dark:via-gray-950 dark:to-purple-950" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      <header className="sticky top-0 z-50 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2" aria-label="DALE — página inicial">
            <img src={logoP} alt="" className="h-9 block dark:hidden" />
            <img src={logoW} alt="" className="h-9 hidden dark:block" />
            <span className="font-extrabold tracking-wide text-purple-700 dark:text-purple-300">{PROJECT.name}</span>
          </Link>

          <nav aria-label="Seções da página" className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
            <a href="#problemas" className="hover:text-purple-600 dark:hover:text-purple-400">Problemas</a>
            <a href="#como-funciona" className="hover:text-purple-600 dark:hover:text-purple-400">Como funciona</a>
            <a href="#treine" className="hover:text-purple-600 dark:hover:text-purple-400">Treine seu olhar</a>
            <a href="#duvidas" className="hover:text-purple-600 dark:hover:text-purple-400">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-2">
            {logged ? (
              <Link
                to="/analyze-image"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg"
              >
                Ir para a análise
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                >
                  Criar conta
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                >
                  Entrar
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-14 pb-16 md:pt-20 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-900 bg-white/70 dark:bg-gray-900/60 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300">
              Projeto acadêmico de {PROJECT.course}
            </p>
            <h1 className="mt-5 text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Essa imagem é <span className="text-purple-600 dark:text-purple-400">real?</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Hoje a inteligência artificial cria fotos tão realistas que ficou difícil saber o que é verdade.
              O {PROJECT.name} analisa a imagem e explica, de um jeito simples, se ela parece real, feita por IA ou editada.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to={primaryCta.to}
                className="text-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-xl hover:shadow-purple-900/30 hover:scale-[1.01] transition-all"
              >
                {primaryCta.label}
              </Link>
              <Link
                to={secondaryCta.to}
                className="text-center rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-900 transition-all"
              >
                {secondaryCta.label}
              </Link>
            </div>

            {!logged && (
              <p className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg {...icon} className="w-4 h-4 text-purple-600 dark:text-purple-400">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                Para validar uma imagem, é preciso entrar na sua conta.
              </p>
            )}
          </Reveal>

          <Reveal delay={150} className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img src={tipoP} alt={`Logo do ${PROJECT.name}`} className="w-56 mx-auto mb-8 block dark:hidden" />
              <img src={tipoW} alt={`Logo do ${PROJECT.name}`} className="w-56 mx-auto mb-8 hidden dark:block" />
              <ExampleResult />
            </div>
          </Reveal>
        </section>

        <section id="problemas" className="scroll-mt-20 py-16 bg-white/60 dark:bg-gray-900/40">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center">Os principais problemas da IA hoje</h2>
              <p className="mt-3 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A mesma tecnologia que ajuda muita gente também é usada para enganar. Veja os riscos mais comuns.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROBLEMS.map((problem, index) => (
                <Reveal key={problem.title} delay={index * 100}>
                  <article className="h-full rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 flex items-center justify-center">
                      {problem.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{problem.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{problem.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-10 text-center text-lg font-semibold text-purple-700 dark:text-purple-300">
                Dica: desconfie de imagens que causam muita emoção e não têm fonte confiável.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-20 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center">Como o {PROJECT.name} ajuda</h2>
              <p className="mt-3 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Ele usa inteligência artificial para olhar a imagem com atenção e mostrar se ela parece real,
                feita por IA ou editada, explicando o porquê.
              </p>
            </Reveal>

            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <Reveal key={step.title} delay={index * 120}>
                  <li className="relative h-full rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-6 shadow-lg list-none">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-lg font-bold text-white shadow-lg">
                      {index + 1}
                    </span>
                    <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{step.text}</p>
                    {index === 0 && !logged && (
                      <Link
                        to="/login"
                        className="mt-4 inline-flex text-sm font-semibold text-purple-700 dark:text-purple-300 hover:underline"
                      >
                        Entrar agora
                      </Link>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <p className="mt-10 text-center text-gray-600 dark:text-gray-300">
                Ele observa mãos e rostos, luz e sombras, texturas, letras na imagem e sinais de montagem.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="treine" className="scroll-mt-20 py-16 bg-white/60 dark:bg-gray-900/40">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center">Treine seu olhar</h2>
              <p className="mt-3 mb-10 text-center text-gray-600 dark:text-gray-300">
                Mesmo sem o {PROJECT.name}, você pode procurar estes sinais. Toque em cada um para aprender.
              </p>
              <SignsTrainer />
            </Reveal>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <svg {...icon}>
                    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="mt-4 text-2xl font-bold">Seus dados protegidos</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Seguimos a lei brasileira de proteção de dados (LGPD). A imagem não fica guardada depois da análise,
                  e você pode baixar ou apagar seus dados quando quiser.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="h-full rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <svg {...icon}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5M12 16.5v.5" />
                  </svg>
                </div>
                <h2 className="mt-4 text-2xl font-bold">Use com bom senso</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  O resultado é uma ajuda, não uma prova. Antes de compartilhar, confira de onde a imagem veio e se
                  outros sites confiáveis mostram a mesma coisa.
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="duvidas" className="scroll-mt-20 py-16 bg-white/60 dark:bg-gray-900/40">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Dúvidas comuns</h2>
            </Reveal>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.q}
                    <span aria-hidden="true" className="text-purple-600 dark:text-purple-400 text-xl transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <Reveal className="max-w-5xl mx-auto px-6">
            <div className="rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-700 px-8 py-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold">Pronto para conferir uma imagem?</h2>
              <p className="mt-3 text-purple-100 text-lg">
                {logged
                  ? "Você já está conectado. É só enviar a imagem."
                  : "Entre na sua conta para fazer a análise. Se ainda não tem, criar é rápido e grátis."}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to={primaryCta.to}
                  className="rounded-2xl bg-white px-6 py-4 font-semibold text-purple-700 shadow-lg hover:scale-[1.02] transition-all"
                >
                  {primaryCta.label}
                </Link>
                <Link
                  to={secondaryCta.to}
                  className="rounded-2xl border border-white/40 px-6 py-4 font-semibold text-white hover:bg-white/10 transition-all"
                >
                  {secondaryCta.label}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
