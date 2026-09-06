"use client";

import { useActionState, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAdminAction } from "@/app/admin/actions";
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, ArrowLeft, Sun, Moon } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("mindsnap_theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("mindsnap_theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
    } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9FD] dark:bg-[#080b11] flex items-center justify-center p-4 sm:p-6 font-sans relative selection:bg-[#7026ED]/20 selection:text-[#7026ED] transition-colors duration-200">
      {/* Orqa fon uchun nafis va xotirjam minimalist gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(112,38,237,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(112,38,237,0.18),transparent_70%)]" />

      <div className="w-full max-w-md relative z-10 space-y-4">
        {/* Ortga qaytish havolasi va Mavzu almashtirgich */}
        <div className="flex items-center justify-between px-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Asosiy sahifaga qaytish</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">MindSnap Bot</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-white dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-[#7026ED] dark:hover:text-[#A78BFA] transition-colors cursor-pointer shadow-2xs"
              title={theme === "light" ? "Tungi rejimga o'tish" : "Kunduzgi rejimga o'tish"}
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Asosiy Kirish Kartochkasi */}
        <div className="bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 rounded-2xl p-7 sm:p-9 shadow-xl shadow-neutral-200/60 dark:shadow-black/60 backdrop-blur-md">
          {/* Logo va Sarlavha */}
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1.5 shadow-sm mx-auto mb-3.5">
              <Image
                src="/logo.png"
                alt="MindSnap Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                MindSnap
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#7026ED]/10 dark:bg-[#7026ED]/20 text-[#7026ED] dark:text-[#A78BFA] border border-[#7026ED]/20 dark:border-[#7026ED]/30">
                Admin
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              Boshqaruv paneliga kirish uchun ma&apos;lumotlarni kiriting
            </p>
          </div>

          {/* Xatolik xabari */}
          {state?.error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
              <span className="font-medium">{state.error}</span>
            </div>
          )}

          {/* Kirish formasi */}
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/80 dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#7026ED] focus:bg-white dark:focus:bg-[#161e2e] focus:ring-2 focus:ring-[#7026ED]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                Parol
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-2.5 bg-neutral-50/80 dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#7026ED] focus:bg-white dark:focus:bg-[#161e2e] focus:ring-2 focus:ring-[#7026ED]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-2.5 sm:py-3 px-4 rounded-xl bg-[#7026ED] hover:bg-[#5E1EE5] text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer active:scale-[0.99]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Tekshirilmoqda...
                </span>
              ) : (
                <>
                  <span>Tizimga kirish</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Xavfsizlik belgisi */}
          <div className="mt-7 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Shifrlangan admin sessiyasi • MindSnap 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
