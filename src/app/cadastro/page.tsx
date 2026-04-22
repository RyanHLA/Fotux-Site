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

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#C65D3B]/20 focus:border-[#C65D3B] ${
    hasError ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
  }`;

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

      if (!signUpData.session) {
        setSuccess(true);
        return;
      }

      const accessToken = signUpData.session.access_token;

      if (plano) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

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

        toast.error(`Não foi possível abrir o checkout: ${json?.error ?? "erro desconhecido"}`);
        window.location.href = adminUrl;
        return;
      }

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
        <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Verifique seu e-mail!
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Enviamos um link de ativação para o seu e-mail. Clique no link para
          ativar sua conta e começar a usar o Fotux.
        </p>
        <p className="text-xs text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Não recebeu? Verifique sua caixa de spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Plan selected banner */}
      {plano && planNames[plano] && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-[#C65D3B] flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#C65D3B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Plano {planNames[plano]} selecionado
            </p>
            <p className="text-xs text-[#C65D3B]/70" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Você poderá assinar após criar sua conta.
            </p>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Nome completo"
          {...register("name")}
          className={inputClass(!!errors.name)}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="E-mail"
          {...register("email")}
          className={inputClass(!!errors.email)}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Cellphone + CPF/CNPJ — apenas para planos pagos */}
      {plano && planNames[plano] && (
        <div className="space-y-3 rounded-lg bg-gray-50 border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Dados para faturamento
          </p>
          <div>
            <input
              id="cellphone"
              type="tel"
              autoComplete="tel"
              placeholder="Celular (11) 99999-9999"
              {...register("cellphone")}
              className={inputClass(!!errors.cellphone)}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.cellphone && (
              <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.cellphone.message}
              </p>
            )}
          </div>
          <div>
            <input
              id="taxId"
              type="text"
              autoComplete="off"
              placeholder="CPF ou CNPJ"
              {...register("taxId")}
              className={inputClass(!!errors.taxId)}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.taxId && (
              <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.taxId.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Password */}
      <div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Senha"
            {...register("password")}
            className={inputClass(!!errors.password)}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirmar senha"
            {...register("confirmPassword")}
            className={inputClass(!!errors.confirmPassword)}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <LoadingButton
        loading={loading}
        fullWidth
        size="md"
        className="mt-1 rounded-lg"
        style={{ backgroundColor: '#C65D3B', boxShadow: 'none', fontFamily: 'Montserrat, sans-serif' }}
      >
        Criar conta
      </LoadingButton>

      <p className="text-xs text-gray-400 text-center leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Ao criar uma conta, você concorda com nossos{" "}
        <a href="#" className="underline hover:text-gray-600">
          Termos de uso
        </a>{" "}
        e{" "}
        <a href="#" className="underline hover:text-gray-600">
          Política de privacidade
        </a>
        .
      </p>
    </form>
  );
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Left panel — photo narrow/tall */}
      <div className="hidden lg:block w-[28%] xl:w-[32%] flex-shrink-0 relative">
        <img
          src="/images/img-login-page.webp"
          alt="Fotógrafa"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:flex-1 flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-sm">

          {/* Header — centered */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Bem-vindo(a) à Fotux
            </h1>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Crie sua conta gratuita sem cartão de crédito.
            </p>
          </div>

          <Suspense fallback={<div className="h-80 animate-pulse bg-gray-100 rounded-lg" />}>
            <SignUpForm />
          </Suspense>

          {/* Login link */}
          <p className="mt-5 text-center text-sm text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
