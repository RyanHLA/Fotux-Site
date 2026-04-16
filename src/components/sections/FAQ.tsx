"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Meu cliente precisa criar uma conta?",
    answer:
      "Não. O cliente acessa a galeria pelo link único que você compartilha, com um PIN seguro que você mesmo define. Sem cadastro, sem senha, sem aplicativo para baixar. Só um link e um PIN.",
  },
  {
    question: "Quantas fotos posso enviar?",
    answer:
      "Depende do plano escolhido. No Trial gratuito, você pode enviar até 300 fotos por mês. No plano Básico, 1.000 fotos. No Pro, até 5.000 fotos. E no Avançado, até 15.000 fotos mensais.",
  },
  {
    question: "Como funciona o período de teste?",
    answer:
      "Você tem 14 dias completamente grátis para testar todas as funcionalidades, sem precisar cadastrar cartão de crédito. Se não gostar, simplesmente não assina. Sem cobranças, sem pegadinhas.",
  },
  {
    question: "As fotos ficam seguras na plataforma?",
    answer:
      "Sim. Seus arquivos são armazenados com criptografia e protegidos por sistemas de segurança robustos. Além disso, o acesso às galerias é sempre protegido pelo PIN que você configura.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim, sem nenhuma burocracia. Você pode cancelar sua assinatura a qualquer momento, sem fidelidade ou multa. O acesso permanece ativo até o fim do período já pago.",
  },
  {
    question: "Funciona no celular do cliente?",
    answer:
      "Sim. A galeria foi desenvolvida com foco em dispositivos móveis e funciona perfeitamente em qualquer smartphone, seja Android ou iPhone, sem precisar instalar nada.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "border-primary-200 bg-primary-50/30 shadow-elegant"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span
          className={`font-body font-semibold leading-snug ${
            isOpen ? "text-primary" : "text-foreground"
          }`}
        >
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-6 pb-6">
          <p className="font-body text-slate-500 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-body text-sm font-semibold text-primary bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Dúvidas frequentes
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Perguntas frequentes
          </h2>
          <p className="font-body text-lg text-slate-500">
            Tudo que você precisa saber antes de começar.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="font-body text-slate-600 mb-3">
            Ainda tem alguma dúvida?
          </p>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20Fotux"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-semibold text-sm text-white bg-[#25D366] px-5 py-2.5 rounded-xl hover:bg-[#20BD5C] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
