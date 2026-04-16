import { UserPlus, Upload, Share2, CheckSquare } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Crie sua conta",
    description: "Em minutos, sem cartão de crédito. Comece o seu teste grátis de 14 dias imediatamente.",
    color: "from-violet-500 to-primary",
    bgColor: "bg-primary-50",
    iconColor: "text-primary",
  },
  {
    icon: Upload,
    number: "02",
    title: "Faça o upload",
    description: "Envie as fotos do trabalho diretamente pela plataforma. Organize em álbuns por cliente ou evento.",
    color: "from-primary to-sky-500",
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: Share2,
    number: "03",
    title: "Compartilhe o link",
    description: "Seu cliente acessa com um PIN seguro, no celular. Sem precisar criar conta ou baixar aplicativo.",
    color: "from-sky-500 to-teal-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: CheckSquare,
    number: "04",
    title: "Receba a seleção",
    description: "As fotos favoritas chegam no seu painel organizadas. Sem e-mails confusos ou listas no WhatsApp.",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-body text-sm font-semibold text-primary bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Como funciona
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Do upload à seleção final,{" "}
            <span className="text-primary">tudo em 4 passos</span>
          </h2>
          <p className="font-body text-lg text-slate-500 max-w-2xl mx-auto">
            Simples para você, intuitivo para seu cliente. Sem complicação, sem
            fricção.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-0.5 bg-gradient-to-r from-violet-200 via-sky-200 via-teal-200 to-emerald-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col items-center text-center group">
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-card`}
                    >
                      <Icon className={`w-7 h-7 ${step.iconColor}`} strokeWidth={1.75} />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm z-20">
                      <span className="font-body text-xs font-bold text-slate-400">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-slate-500 leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>

                  {/* Mobile arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden mt-6 text-slate-300">
                      <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/cadastro"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-body font-semibold px-8 py-4 rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-primary hover:shadow-lg hover:-translate-y-0.5 text-base"
          >
            Começar agora — é grátis
          </a>
        </div>
      </div>
    </section>
  );
}
