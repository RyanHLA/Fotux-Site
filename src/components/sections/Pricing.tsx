"use client";

import { useRouter } from "next/navigation";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    id: "trial",
    name: "Período Teste",
    price: "Grátis",
    period: "por 14 dias",
    description: "Explore tudo sem compromisso",
    features: [
      "10 GB de armazenamento",
      "Álbuns ilimitados",
      "Até 500 fotos por álbum",
      "Acesso por PIN",
      "Link compartilhável",
    ],
    cta: "Começar grátis",
    href: "/cadastro",
    highlighted: false,
    badge: null,
  },
  {
    id: "basico",
    name: "Básico",
    price: "R$ 19",
    cents: ",90",
    period: "/mês",
    description: "Para fotógrafos em início de carreira",
    features: [
      "10 GB de armazenamento",
      "Álbuns ilimitados",
      "Até 500 fotos por álbum",
      "Acesso por PIN",
      "Link compartilhável",
    ],
    cta: "Assinar Básico",
    highlighted: false,
    badge: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 59",
    cents: ",90",
    period: "/mês",
    description: "Para quem quer se destacar",
    features: [
      "50 GB de armazenamento",
      "Álbuns ilimitados",
      "Até 1.000 fotos por álbum",
      "Acesso por PIN",
      "Link compartilhável",
      "Limite de seleção por álbum",
    ],
    cta: "Assinar Pro",
    highlighted: true,
    badge: "Mais popular",
  },
  {
    id: "avancado",
    name: "Avançado",
    price: "R$ 89",
    cents: ",90",
    period: "/mês",
    description: "Para estúdios e profissionais exigentes",
    features: [
      "100 GB de armazenamento",
      "Álbuns ilimitados",
      "Fotos ilimitadas por álbum",
      "Acesso por PIN",
      "Link compartilhável",
      "Limite de seleção por álbum",
    ],
    cta: "Assinar Avançado",
    highlighted: false,
    badge: null,
  },
];

export function Pricing() {
  const router = useRouter();

  function handlePlanClick(plan: (typeof plans)[0]) {
    if (plan.id === "trial") {
      router.push("/cadastro");
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pending_plan", plan.id);
    }
    router.push(`/cadastro?plano=${plan.id}`);
  }

  return (
    <section id="precos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm font-semibold text-primary bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Planos e preços
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Invista no seu{" "}
            <span className="text-primary">crescimento profissional</span>
          </h2>
          <p className="font-body text-lg text-slate-500 max-w-2xl mx-auto">
            Comece de graça e faça upgrade quando precisar. Sem fidelidade, sem
            multa.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "bg-primary text-white shadow-[0_20px_60px_-12px_rgba(99,102,241,0.4)] scale-105 z-10"
                  : "bg-white border border-slate-200 shadow-card hover:shadow-card-hover hover:-translate-y-1"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 bg-secondary text-white text-xs font-bold font-body px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    <Zap className="w-3 h-3 fill-current" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-6 lg:p-7 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-5">
                  <h3
                    className={`font-heading text-xl font-bold mb-1 ${
                      plan.highlighted ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`font-body text-sm ${
                      plan.highlighted ? "text-primary-200" : "text-slate-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.cents ? (
                    <div className="flex items-end gap-0.5">
                      <span
                        className={`font-heading text-4xl font-bold leading-none ${
                          plan.highlighted ? "text-white" : "text-foreground"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`font-body text-xl font-semibold leading-none mb-0.5 ${
                          plan.highlighted ? "text-primary-200" : "text-slate-500"
                        }`}
                      >
                        {plan.cents}
                      </span>
                      <span
                        className={`font-body text-sm ml-1 mb-1 ${
                          plan.highlighted ? "text-primary-200" : "text-slate-400"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span
                        className={`font-heading text-4xl font-bold ${
                          plan.highlighted ? "text-white" : "text-foreground"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <p
                        className={`font-body text-sm mt-0.5 ${
                          plan.highlighted ? "text-primary-200" : "text-slate-400"
                        }`}
                      >
                        {plan.period}
                      </p>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div
                  className={`h-px mb-6 ${
                    plan.highlighted ? "bg-primary-400" : "bg-slate-100"
                  }`}
                />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.highlighted
                            ? "bg-white/20"
                            : "bg-primary-50"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.highlighted ? "text-white" : "text-primary"
                          }`}
                          strokeWidth={2.5}
                        />
                      </div>
                      <span
                        className={`font-body text-sm leading-relaxed ${
                          plan.highlighted ? "text-primary-100" : "text-slate-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handlePlanClick(plan)}
                  className={`w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-white text-primary hover:bg-primary-50 shadow-md hover:shadow-lg"
                      : "bg-primary text-white hover:bg-primary-600 shadow-primary hover:shadow-lg"
                  } hover:-translate-y-0.5 active:translate-y-0`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center font-body text-sm text-slate-400 mt-8">
          Comece com 14 dias grátis no período de teste. Cancele quando quiser, sem burocracia.
        </p>
      </div>
    </section>
  );
}
