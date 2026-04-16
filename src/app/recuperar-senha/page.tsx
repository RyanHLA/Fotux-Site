"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { LoadingButton } from "@/components/ui/LoadingButton";

export default function RecuperarSenhaPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setLoading(true);
    try {
      const supabase = createClient();
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${siteUrl}/nova-senha`,
      });

      if (error) {
        toast.error("Ocorreu um erro. Por favor, tente novamente.");
        return;
      }

      setSuccess(true);
    } catch {
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-body text-sm text-slate-500 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o login
        </Link>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" />
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
          <span className="font-heading text-lg font-bold text-foreground">Fotux</span>
        </Link>

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
              Verifique seu e-mail
            </h1>
            <p className="font-body text-slate-500 leading-relaxed mb-6">
              Enviamos as instruções para redefinir sua senha. Verifique sua
              caixa de entrada e siga o link enviado.
            </p>
            <p className="font-body text-sm text-slate-400 mb-8">
              Não recebeu? Verifique sua caixa de spam ou tente novamente.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                Recuperar senha
              </h1>
              <p className="font-body text-slate-500 text-sm leading-relaxed">
                Digite o e-mail da sua conta e enviaremos as instruções para
                criar uma nova senha.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-sm font-medium text-foreground mb-1.5"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-foreground placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 font-body text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <LoadingButton loading={loading} fullWidth size="lg">
                Enviar instruções
              </LoadingButton>
            </form>

            <p className="mt-6 text-center font-body text-sm text-slate-500">
              Lembrou sua senha?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary-600 transition-colors"
              >
                Fazer login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
