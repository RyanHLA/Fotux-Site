"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Preços", href: "#precos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-card border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-primary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.9" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="currentColor" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.6" />
              </svg>
            </div>
            <span className="font-heading text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
              Fotux
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-slate-500 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="https://app.fotux.com.br/auth"
              className="font-body text-sm font-semibold text-slate-600 hover:text-primary transition-colors px-4 py-2 rounded-xl hover:bg-primary-50"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="font-body text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-primary hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Começar grátis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 font-body text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary-50 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2 px-4">
              <Link
                href="https://app.fotux.com.br/auth"
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 font-body text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:border-primary hover:text-primary transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 font-body text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors shadow-primary"
              >
                Começar grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
