import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-foreground" />

      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold font-body mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Mais de 1.200 fotógrafos já usam
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Pronto para impressionar{" "}
          <span className="text-primary-300">seus clientes?</span>
        </h2>

        <p className="font-body text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
          Comece grátis hoje. Sem cartão de crédito. Sem complicação. Seu
          primeiro álbum em menos de 5 minutos.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/cadastro"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-body font-semibold px-8 py-4 rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.6)] hover:shadow-[0_8px_30px_-4px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 text-base w-full sm:w-auto"
          >
            Começar grátis
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20Fotux"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-body font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-base w-full sm:w-auto"
          >
            <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-400">
          {[
            "✓ 14 dias grátis",
            "✓ Sem cartão de crédito",
            "✓ Cancele quando quiser",
            "✓ Suporte em português",
          ].map((item) => (
            <span key={item} className="font-body text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
