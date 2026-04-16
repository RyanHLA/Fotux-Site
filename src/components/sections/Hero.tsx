"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

function PhotoGalleryMock() {
  const photos = [
    { gradient: "from-rose-300 via-pink-200 to-orange-200", aspect: "aspect-[4/5]", selected: true },
    { gradient: "from-slate-400 via-slate-300 to-slate-200", aspect: "aspect-square", selected: false },
    { gradient: "from-amber-300 via-yellow-200 to-lime-200", aspect: "aspect-[4/5]", selected: true },
    { gradient: "from-sky-300 via-blue-200 to-indigo-200", aspect: "aspect-square", selected: false },
    { gradient: "from-violet-300 via-purple-200 to-pink-200", aspect: "aspect-[4/5]", selected: false },
    { gradient: "from-emerald-300 via-teal-200 to-cyan-200", aspect: "aspect-square", selected: true },
    { gradient: "from-orange-300 via-amber-200 to-yellow-200", aspect: "aspect-[4/5]", selected: false },
    { gradient: "from-fuchsia-300 via-pink-200 to-rose-200", aspect: "aspect-square", selected: false },
    { gradient: "from-cyan-300 via-sky-200 to-blue-200", aspect: "aspect-[4/5]", selected: true },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-2xl" />

      {/* Main card */}
      <div className="relative bg-white rounded-2xl shadow-[0_32px_64px_-16px_rgba(30,41,59,0.18)] border border-slate-100 overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="w-48 h-5 bg-slate-200 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-5 bg-slate-200 rounded-full" />
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-sm bg-primary/60" />
            </div>
          </div>
        </div>

        {/* Album title bar */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <div className="w-32 h-3.5 bg-slate-800 rounded-full" />
              <div className="w-20 h-2.5 bg-slate-300 rounded-full mt-1.5" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-primary-50 rounded-lg border border-primary-100">
              <span className="text-xs font-semibold text-primary font-body">4 selecionadas</span>
            </div>
            <div className="px-3 py-1.5 bg-slate-100 rounded-lg">
              <span className="text-xs font-medium text-slate-500 font-body">de 9</span>
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <div className="p-4 columns-3 gap-2 space-y-2">
          {photos.map((photo, i) => (
            <div key={i} className="break-inside-avoid relative group">
              <div
                className={`w-full ${photo.aspect} bg-gradient-to-br ${photo.gradient} rounded-xl overflow-hidden relative`}
              >
                {/* Photo texture overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {/* Camera grain simulation */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                  }}
                />
                {/* Selection heart */}
                {photo.selected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-orange-400" />
            <div className="w-24 h-3 bg-slate-300 rounded-full" />
          </div>
          <button className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg shadow-primary font-body">
            Confirmar seleção
          </button>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card border border-slate-100 px-4 py-3 flex items-center gap-2.5 animate-float">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground font-body leading-tight">Seleção recebida!</p>
          <p className="text-xs text-slate-400 font-body">Ana confirmou 4 fotos</p>
        </div>
      </div>

      {/* Floating PIN badge */}
      <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card border border-slate-100 px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground font-body leading-tight">Acesso por PIN</p>
          <p className="text-xs text-slate-400 font-body">Seguro e simples</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/8 via-transparent to-transparent" />
        <div className="absolute top-32 right-0 w-96 h-96 bg-gradient-radial from-secondary/8 via-transparent to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary px-4 py-2 rounded-full text-sm font-semibold font-body mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Para fotógrafos profissionais
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
              Entregue suas fotos.{" "}
              <span className="text-primary">Seu cliente seleciona.</span>{" "}
              Você recebe tudo pronto.
            </h1>

            <p className="font-body text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Chega de WhatsApp, planilhas e Google Drive. Organize suas provas
              fotográficas em minutos e impressione cada cliente.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/cadastro"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-body font-semibold px-8 py-4 rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-primary hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-base"
              >
                Começar grátis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 bg-white text-foreground font-body font-semibold px-8 py-4 rounded-xl border border-slate-200 hover:border-primary hover:text-primary transition-all duration-200 text-base"
              >
                <Play className="w-4 h-4 fill-current" />
                Ver como funciona
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["from-rose-400 to-pink-500", "from-violet-400 to-purple-500", "from-amber-400 to-orange-500", "from-teal-400 to-cyan-500"].map(
                  (gradient, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-white shadow-sm`}
                    />
                  )
                )}
              </div>
              <p className="font-body text-sm text-slate-500">
                <span className="font-semibold text-foreground">+1.200 fotógrafos</span>{" "}
                já usam o Fotux
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-5 justify-center lg:justify-start">
              {[
                { icon: "✓", text: "14 dias grátis" },
                { icon: "✓", text: "Sem cartão de crédito" },
                { icon: "✓", text: "Cancele quando quiser" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5">
                  <span className="text-primary font-bold text-sm">{item.icon}</span>
                  <span className="font-body text-sm text-slate-500">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product mock */}
          <div className="relative flex justify-center lg:justify-end">
            <PhotoGalleryMock />
          </div>
        </div>
      </div>
    </section>
  );
}
