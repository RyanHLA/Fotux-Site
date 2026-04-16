import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fotux — Provas fotográficas profissionais",
  description:
    "Entregue suas fotos, seu cliente seleciona, você recebe tudo pronto. Plataforma de provas fotográficas para fotógrafos profissionais brasileiros.",
  keywords: [
    "prova fotográfica",
    "seleção de fotos",
    "fotógrafo",
    "álbum fotográfico",
    "gestão fotografia",
    "software fotógrafo",
  ],
  authors: [{ name: "Fotux" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Fotux — Provas fotográficas profissionais",
    description:
      "Chega de WhatsApp e Google Drive. Organize suas provas fotográficas em minutos.",
    siteName: "Fotux",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotux — Provas fotográficas profissionais",
    description:
      "Chega de WhatsApp e Google Drive. Organize suas provas fotográficas em minutos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
