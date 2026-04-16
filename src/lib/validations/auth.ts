import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .max(100, "O nome deve ter no máximo 100 caracteres"),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    cellphone: z.string().optional(),
    taxId: z.string().optional(),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "A senha deve conter pelo menos uma letra e um número"
      ),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "A senha deve conter pelo menos uma letra e um número"
      ),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;
