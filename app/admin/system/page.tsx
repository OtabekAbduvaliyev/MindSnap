import { getSystemHealth } from "@/app/admin/actions";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Database,
  Bot,
  Clock,
  ShieldCheck,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Har doim eng so'nggi holatni olish

export default async function AdminSystemPage() {
  const health = await getSystemHealth();

  const envChecks = [
    {
      name: "Supabase ma'lumotlar bazasi va saqlash",
      status: Boolean(
        process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
      ),
      detail:
        health.database.status === "healthy"
          ? `Faol (${health.database.latencyMs}ms)`
          : "Ulanib bo'lmadi",
    },
    {
      name: "Telegram Bot API kaliti (Token)",
      status: Boolean(
        process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN
      ),
      detail:
        health.telegramBot.status === "connected"
          ? `@${health.telegramBot.username}`
          : "Yaroqsiz / Ulanmagan",
    },
    {
      name: "Google Gemini Flash AI API",
      status: Boolean(process.env.GEMINI_API_KEY),
      detail: process.env.GEMINI_API_KEY ? "Sozlangan va faol" : "Kalit kiritilmagan",
    },
    {
      name: "Admin xavfsizlik va autentifikatsiya",
      status: Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD),
      detail: process.env.ADMIN_EMAIL || "otabekabduvaliyev1910@gmail.com",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Sahifa sarlavhasi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7026ED]/10 dark:bg-[#7026ED]/20 border border-[#7026ED]/20 dark:border-[#7026ED]/30 flex items-center justify-center text-[#7026ED] dark:text-[#A78BFA]">
              <Activity className="w-5 h-5" />
            </div>
            Tizim holati va diagnostika
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Infratuzilma faolligi, ma&apos;lumotlar bazasi tezligi va bot xizmatlari holati monitoringi
          </p>
        </div>

        <Link
          href="/admin/system"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0c1017] hover:bg-neutral-50 dark:hover:bg-[#161e2e] text-neutral-700 dark:text-neutral-200 text-xs font-bold border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs transition-all self-start active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#7026ED] dark:text-[#A78BFA]" />
          <span>Diagnostikani yangilash</span>
        </Link>
      </div>

      {/* Asosiy xizmatlar holati */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Supabase Database */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs space-y-4 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              <Database className="w-5 h-5" />
            </div>
            {health.database.status === "healthy" ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Barqaror ishlayapti
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 px-2.5 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                Aloqa uzilgan
              </span>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Supabase PostgreSQL</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Javob kechikishi:{" "}
              <span className="text-neutral-900 dark:text-white font-mono font-bold">
                {health.database.latencyMs} ms
              </span>
            </p>
          </div>
        </div>

        {/* Telegram Bot Gateway */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs space-y-4 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-[#7026ED]/10 dark:bg-[#7026ED]/20 text-[#7026ED] dark:text-[#A78BFA] border border-[#7026ED]/20 dark:border-[#7026ED]/30">
              <Bot className="w-5 h-5" />
            </div>
            {health.telegramBot.status === "connected" ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Uzluksiz ulangan
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 px-2.5 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                Xatolik mavjud
              </span>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Telegram Gateway</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Bot manzili:{" "}
              <span className="text-[#7026ED] dark:text-[#A78BFA] font-mono font-bold">
                @{health.telegramBot.username || "mindsnaporgbot"}
              </span>
            </p>
          </div>
        </div>

        {/* Rejalashtiruvchi navbati */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs space-y-4 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/40">
              <Clock className="w-5 h-5" />
            </div>
            {health.scheduler.status === "nominal" ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Reja bo&apos;yicha
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 px-2.5 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Kechikish bor
              </span>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Eslatmalar navbati</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Muddati o&apos;tgan kutilayotganlar:{" "}
              <span
                className={`font-mono font-bold ${
                  health.scheduler.overduePendingCount > 0
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {health.scheduler.overduePendingCount} ta
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Muhit va xavfsizlik konfiguratsiyasi */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#7026ED]/10 dark:bg-[#7026ED]/20 border border-[#7026ED]/20 dark:border-[#7026ED]/30 flex items-center justify-center text-[#7026ED] dark:text-[#A78BFA]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Muhit va xavfsizlik konfiguratsiyasi
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Bot va admin paneli ishlashi uchun zarur bo&apos;lgan asosiy muhit o&apos;zgaruvchilari tekshiruvi
            </p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {envChecks.map((item) => (
            <div
              key={item.name}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 dark:text-neutral-400 font-mono bg-neutral-50 dark:bg-[#121824] border border-neutral-200/60 dark:border-neutral-700 px-2.5 py-1 rounded-lg text-[11px]">
                  {item.detail}
                </span>
                {item.status ? (
                  <span className="p-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/60" title="Faol">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/60" title="Xatolik">
                    <XCircle className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qo'shimcha ma'lumot qutisi */}
      <div className="p-5 rounded-2xl bg-radial from-[#7026ED]/5 to-transparent dark:from-[#7026ED]/15 border border-[#7026ED]/15 dark:border-[#7026ED]/30 flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-[#7026ED]/10 dark:bg-[#7026ED]/20 border border-[#7026ED]/20 dark:border-[#7026ED]/30 flex items-center justify-center text-[#7026ED] dark:text-[#A78BFA] shrink-0 mt-0.5">
          <Zap className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-neutral-900 dark:text-white">Avtomatik diagnostika tizimi</h4>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Diagnostika har safar ushbu sahifaga kirilganda jonli so&apos;rov orqali yangilanadi. Supabase va Telegram API kechikishlari real vaqt rejimida o&apos;lchanadi. Agar qandaydir muammo yuzaga kelsa, server sozlamalari va <code>.env</code> faylini qayta ko&apos;rib chiqing.
          </p>
        </div>
      </div>
    </div>
  );
}
