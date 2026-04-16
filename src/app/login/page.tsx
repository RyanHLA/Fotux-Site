"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { LoadingButton } from "@/components/ui/LoadingButton";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (
          error.message.includes("Invalid login credentials") ||
          error.message.includes("invalid_credentials")
        ) {
          toast.error("E-mail ou senha incorretos. Tente novamente.");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error(
            "Verifique seu e-mail antes de fazer login. Enviamos um link de ativação."
          );
        } else {
          toast.error("Ocorreu um erro. Por favor, tente novamente.");
        }
        return;
      }

      toast.success("Login realizado com sucesso!");
      router.push(process.env.NEXT_PUBLIC_ADMIN_URL || "/");
    } catch {
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

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
          {/* Decorative photo grid */}
          <div className="absolute bottom-20 right-0 left-12 grid grid-cols-3 gap-3 opacity-20">
            {[
              "from-rose-400 to-pink-500",
              "from-violet-400 to-purple-500",
              "from-sky-400 to-blue-500",
              "from-amber-400 to-orange-500",
              "from-teal-400 to-cyan-500",
              "from-fuchsia-400 to-pink-500",
            ].map((gradient, i) => (
              <div
                key={i}
                className={`h-28 rounded-xl bg-gradient-to-br ${gradient}`}
              />
            ))}
          </div>
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
            <h2 className="font-heading text-3xl text-white font-bold mb-3 leading-tight">
              Bem-vindo de volta
            </h2>
            <p className="font-body text-slate-400 text-base leading-relaxed">
              Acesse seu painel e continue organizando suas provas fotográficas com elegância.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { emoji: "📷", text: "Álbuns ilimitados no plano Pro" },
              { emoji: "🔐", text: "Acesso seguro por PIN para seus clientes" },
              { emoji: "📱", text: "Interface otimizada para celular" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-lg">{item.emoji}</span>
                <span className="font-body text-sm text-slate-400">{item.text}</span>
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
              Bem-vindo de volta
            </h1>
            <p className="font-body text-slate-500 text-sm">
              Entre na sua conta para acessar seus álbuns.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="font-body text-sm font-medium text-foreground"
                >
                  Senha
                </label>
                <Link
                  href="/recuperar-senha"
                  className="font-body text-xs text-primary hover:text-primary-600 transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Sua senha"
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

            <LoadingButton loading={loading} fullWidth size="lg" className="mt-2">
              Entrar na minha conta
            </LoadingButton>
          </form>

          {/* Signup link */}
          <p className="mt-6 text-center font-body text-sm text-slate-500">
            Não tem conta ainda?{" "}
            <Link
              href="/cadastro"
              className="font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
