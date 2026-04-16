"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { newPasswordSchema, type NewPasswordFormValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { LoadingButton } from "@/components/ui/LoadingButton";

export default function NovaSenhaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  async function onSubmit(data: NewPasswordFormValues) {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        toast.error("Ocorreu um erro ao atualizar a senha. O link pode ter expirado.");
        return;
      }

      toast.success("Senha atualizada com sucesso!");
      router.push("/login");
    } catch {
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Definir nova senha
          </h1>
          <p className="font-body text-slate-500 text-sm leading-relaxed">
            Escolha uma senha segura para sua conta. Ela deve ter pelo menos 8
            caracteres com letras e números.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="block font-body text-sm font-medium text-foreground mb-1.5"
            >
              Nova senha
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
              Confirmar nova senha
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repita a nova senha"
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

          {/* Password requirements hint */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-body text-xs text-slate-500 font-medium mb-2">
              A senha deve conter:
            </p>
            <ul className="space-y-1">
              {[
                "Pelo menos 8 caracteres",
                "Pelo menos uma letra",
                "Pelo menos um número",
              ].map((req) => (
                <li key={req} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="font-body text-xs text-slate-500">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <LoadingButton loading={loading} fullWidth size="lg">
            Salvar nova senha
          </LoadingButton>
        </form>

        <p className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 font-body text-sm text-slate-500 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}
