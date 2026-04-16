"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { signUpSchema, type SignUpFormValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { LoadingButton } from "@/components/ui/LoadingButton";

const planNames: Record<string, string> = {
  basico: "Básico",
  pro: "Pro",
  avancado: "Avançado",
};

function SignUpForm() {
  const searchParams = useSearchParams();
  const plano = searchParams.get("plano");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormValues) {
    setLoading(true);
    try {
      const supabase = createClient();
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? "";
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

      // emailRedirectTo usado apenas quando confirmação de e-mail está HABILITADA
      const emailRedirectTo = plano
        ? `${adminUrl}?checkout_plan=${plano}`
        : adminUrl;

      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name },
          emailRedirectTo,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Este e-mail já está cadastrado. Tente fazer login.");
        } else {
          toast.error("Ocorreu um erro. Por favor, tente novamente.");
        }
        return;
      }

      // Confirmação de e-mail HABILITADA — mostra tela de "verifique seu e-mail"
      if (!signUpData.session) {
        setSuccess(true);
        return;
      }

      // Confirmação DESABILITADA — sessão ativa imediatamente
      const accessToken = signUpData.session.access_token;

      if (plano) {
        // O trigger handle_new_user cria o registro em `photographers` de forma assíncrona.
        // Aguarda 1.5s para garantir que o registro já existe antes de chamar o checkout.
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Chama a Edge Function com o token do usuário recém-criado
        const res = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            plan_id: plano,
            cellphone: data.cellphone,
            tax_id: data.taxId,
            success_url: `${adminUrl}?checkout=success`,
            cancel_url: `${adminUrl}?checkout=cancel`,
          }),
        });

        const json = await res.json();

        if (json?.url) {
          window.location.href = json.url;
          return;
        }

        // Falhou ao criar checkout — vai pro painel na aba de settings
        toast.error(`Não foi possível abrir o checkout: ${json?.error ?? "erro desconhecido"}`);
        window.location.href = adminUrl;
        return;
      }

      // Sem plano (período de teste) — vai direto pro painel
      window.location.href = adminUrl;
    } catch {
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
          Verifique seu e-mail!
        </h2>
        <p className="font-body text-slate-500 leading-relaxed mb-6">
          Enviamos um link de ativação para o seu e-mail. Clique no link para
          ativar sua conta e começar a usar o Fotux.
        </p>
        <p className="font-body text-sm text-slate-400">
          Não recebeu? Verifique sua caixa de spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Plan selected banner */}
      {plano && planNames[plano] && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-primary">
              Plano {planNames[plano]} selecionado
            </p>
            <p className="font-body text-xs text-primary/70">
              Você poderá assinar após criar sua conta.
            </p>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block font-body text-sm font-medium text-foreground mb-1.5"
        >
          Nome completo
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          {...register("name")}
          className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-foreground placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.name
              ? "border-red-300 bg-red-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        />
        {errors.name && (
          <p className="mt-1.5 font-body text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
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

      {/* Cellphone + CPF/CNPJ — apenas para planos pagos */}
      {plano && planNames[plano] && (
        <div className="space-y-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="font-body text-xs text-slate-500 font-medium uppercase tracking-wide">
            Dados para faturamento
          </p>

          <div>
            <label
              htmlFor="cellphone"
              className="block font-body text-sm font-medium text-foreground mb-1.5"
            >
              Celular <span className="text-red-500">*</span>
            </label>
            <input
              id="cellphone"
              type="tel"
              autoComplete="tel"
              placeholder="(11) 99999-9999"
              {...register("cellphone")}
              className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-foreground placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                errors.cellphone
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            />
            {errors.cellphone && (
              <p className="mt-1.5 font-body text-xs text-red-500">
                {errors.cellphone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="taxId"
              className="block font-body text-sm font-medium text-foreground mb-1.5"
            >
              CPF ou CNPJ <span className="text-red-500">*</span>
            </label>
            <input
              id="taxId"
              type="text"
              autoComplete="off"
              placeholder="000.000.000-00"
              {...register("taxId")}
              className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-foreground placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                errors.taxId
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            />
            {errors.taxId && (
              <p className="mt-1.5 font-body text-xs text-red-500">
                {errors.taxId.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block font-body text-sm font-medium text-foreground mb-1.5"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            {...register("password")}
            className={`w-full px-4 py-3 pr-12 rounded-xl border font-body text-sm text-foreground placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
              errors.password
                ? "border-red-300 bg-red-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 font-body text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block font-body text-sm font-medium text-foreground mb-1.5"
        >
          Confirmar senha
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repita a senha"
            {...register("confirmPassword")}
            className={`w-full px-4 py-3 pr-12 rounded-xl border font-body text-sm text-foreground placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
              errors.confirmPassword
                ? "border-red-300 bg-red-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1.5 font-body text-xs text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <LoadingButton loading={loading} fullWidth size="lg" className="mt-2">
        Criar minha conta gratuita
      </LoadingButton>

      <p className="font-body text-xs text-slate-400 text-center leading-relaxed">
        Ao criar uma conta, você concorda com nossos{" "}
        <a href="#" className="underline hover:text-slate-600">
          Termos de uso
        </a>{" "}
        e{" "}
        <a href="#" className="underline hover:text-slate-600">
          Política de privacidade
        </a>
        .
      </p>
    </form>
  );
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-foreground overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/10" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
              </svg>
            </div>
            <span className="font-heading text-xl font-bold text-white">Fotux</span>
          </Link>

          <div>
            <blockquote className="font-heading text-2xl text-white leading-relaxed mb-6">
              &ldquo;Antes eu perdia horas no WhatsApp. Agora mando o link e em
              24h tenho a seleção completa.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm font-body">
                AF
              </div>
              <div>
                <p className="font-body font-semibold text-white text-sm">Ana Carolina Ferreira</p>
                <p className="font-body text-slate-400 text-xs">Fotografa de casamentos, São Paulo</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {["14 dias grátis", "Sem cartão", "Cancele quando quiser"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-body text-xs text-slate-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-slate-500 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Crie sua conta gratuita
            </h1>
            <p className="font-body text-slate-500 text-sm">
              14 dias grátis, sem cartão de crédito.
            </p>
          </div>

          <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 rounded-xl" />}>
            <SignUpForm />
          </Suspense>

          {/* Login link */}
          <p className="mt-6 text-center font-body text-sm text-slate-500">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
