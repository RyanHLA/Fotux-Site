import { FolderOpen, Lock, Heart, Download, Cloud, Sliders } from "lucide-react";

const features = [
  {
    icon: FolderOpen,
    title: "Álbuns organizados",
    description:
      "Separe cada trabalho em seu próprio álbum. Casamento, ensaio, evento — tudo no lugar certo, sempre.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: Lock,
    title: "Acesso por PIN",
    description:
      "Sem login para o cliente — só o PIN que você define. Simples, seguro, sem fricção.",
    color: "text-primary",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    icon: Heart,
    title: "Seleção intuitiva",
    description:
      "O cliente clica nas fotos favoritas direto pelo celular. Uma experiência elegante que impressiona.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: Download,
    title: "Receba a seleção pronta",
    description:
      "Veja quais fotos foram selecionadas no seu painel, organizadas e prontas para editar.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Cloud,
    title: "Seus trabalhos na nuvem",
    description:
      "Tudo salvo e acessível de qualquer lugar. No estúdio, em casa ou na rua.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: Sliders,
    title: "Limite de seleção",
    description:
      "Você define quantas fotos o cliente pode escolher. Sem surpresas, sem desentendimentos.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

export function Features() {
  return (
    <section id="funcionalidades" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm font-semibold text-secondary bg-amber-50 border border-amber-100 px-4 py-1.5 rounded-full mb-4">
            Funcionalidades
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Tudo que você precisa,{" "}
            <span className="text-primary">nada que atrapalha</span>
          </h2>
          <p className="font-body text-lg text-slate-500 max-w-2xl mx-auto">
            Desenvolvido especificamente para o fluxo de trabalho de fotógrafos
            profissionais brasileiros.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 lg:p-8 border ${feature.border} shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Background accent */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-70 transition-opacity`}
                />

                <div className="relative">
                  <div
                    className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${feature.color}`} strokeWidth={1.75} />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
