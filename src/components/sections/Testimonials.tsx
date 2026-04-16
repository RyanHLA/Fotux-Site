import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina Ferreira",
    role: "Fotografa de casamentos",
    location: "São Paulo",
    avatar: "from-rose-400 to-pink-500",
    initials: "AF",
    quote:
      "Antes eu perdia horas no WhatsApp confirmando quais fotos o cliente queria. Agora mando o link e em 24h tenho a seleção completa. Minha vida mudou.",
    stars: 5,
  },
  {
    name: "Rafael Monteiro",
    role: "Fotógrafo de eventos",
    location: "Rio de Janeiro",
    avatar: "from-violet-400 to-purple-500",
    initials: "RM",
    quote:
      "Meus clientes adoram a facilidade. Mais de um me perguntou se era um app exclusivo meu. Parece muito profissional — e isso faz diferença no meu negócio.",
    stars: 5,
  },
  {
    name: "Juliana Santos",
    role: "Fotógrafa de ensaios",
    location: "Belo Horizonte",
    avatar: "from-amber-400 to-orange-500",
    initials: "JS",
    quote:
      "O trial me convenceu na primeira semana. Nunca mais vou voltar para o Google Drive. É simples, bonito e funciona exatamente como eu precisava.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm font-semibold text-primary bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Depoimentos
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            O que dizem os{" "}
            <span className="text-primary">fotógrafos Fotux</span>
          </h2>
          <p className="font-body text-lg text-slate-500 max-w-2xl mx-auto">
            Histórias reais de fotógrafos que transformaram seu fluxo de
            trabalho.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-slate-100"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-primary fill-current" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-secondary fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-slate-600 leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatar} flex items-center justify-center text-white font-body font-bold text-sm shadow-sm flex-shrink-0`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground leading-tight">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-slate-400 mt-0.5">
                    {testimonial.role} · {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            { value: "1.200+", label: "Fotógrafos ativos" },
            { value: "48mil+", label: "Álbuns criados" },
            { value: "98%", label: "Taxa de satisfação" },
            { value: "24h", label: "Tempo médio de seleção" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="font-body text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
