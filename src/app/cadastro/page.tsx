"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
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

      <LoadingButton
        loading={loading}
        fullWidth
        size="lg"
        className="mt-2"
        style={{ backgroundColor: '#C65D3B', boxShadow: 'none' }}
      >
        Criar conta
      </LoadingButton>

      <p className="font-body text-xs text-slate-400 text-center leading-relaxed mt-4">
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
    <div className="min-h-screen bg-white flex">
      {/* Left panel — photo only, narrow */}
      <div className="hidden lg:block lg:w-[38%] xl:w-[42%] relative overflow-hidden flex-shrink-0">
        <img
          src="/images/img-login-page.webp"
          alt="Fotógrafa"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:flex-1 flex items-center justify-center px-8 py-12 lg:px-16">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo(a) à Fotux
            </h1>
            <p className="font-body text-gray-500 text-sm">
              Crie sua conta gratuita sem cartão de crédito.
            </p>
          </div>

          <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 rounded-xl" />}>
            <SignUpForm />
          </Suspense>

          {/* Login link */}
          <p className="mt-5 text-center font-body text-sm text-slate-500">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#C65D3B] hover:opacity-80 transition-opacity"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
