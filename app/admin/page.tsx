import Link from "next/link";
import { getDashboardStats } from "@/app/admin/actions";
import {
  Users,
  RefreshCw,
  CalendarClock,
  Database,
  Send,
  BellRing,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Mic,
  Video,
} from "lucide-react";

export const revalidate = 10; // revalidate page every 10 seconds

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const mediaTotal =
    stats.mediaBreakdown.text +
    stats.mediaBreakdown.image +
    stats.mediaBreakdown.voice +
    stats.mediaBreakdown.video || 1;

  const mediaTypes = [
    {
      name: "Matnli xabarlar",
      count: stats.mediaBreakdown.text,
      icon: FileText,
      color: "bg-[#7026ED]",
      textColor: "text-[#7026ED]",
      pct: Math.round((stats.mediaBreakdown.text / mediaTotal) * 100),
    },
    {
      name: "Rasmlar",
      count: stats.mediaBreakdown.image,
      icon: ImageIcon,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      pct: Math.round((stats.mediaBreakdown.image / mediaTotal) * 100),
    },
    {
      name: "Ovozli xabarlar",
      count: stats.mediaBreakdown.voice,
      icon: Mic,
      color: "bg-amber-500",
      textColor: "text-amber-600",
      pct: Math.round((stats.mediaBreakdown.voice / mediaTotal) * 100),
    },
    {
      name: "Videolar",
      count: stats.mediaBreakdown.video,
      icon: Video,
      color: "bg-rose-500",
      textColor: "text-rose-600",
      pct: Math.round((stats.mediaBreakdown.video / mediaTotal) * 100),
    },
  ];

  return (
    <div className="space-y-7">
      {/* Yuqori qism & Tezkor harakatlar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Boshqaruv Paneli
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            MindSnap Telegram boti va eslatmalar bo&apos;yicha jonli statistika
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {stats.overdueCount > 0 ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{stats.overdueCount} ta kechikkan eslatma</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Tizim me&apos;yorda ishlayapti</span>
            </div>
          )}

          <Link
            href="/admin/broadcast"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#7026ED] hover:bg-[#5E1EE5] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Xabarnoma yuborish</span>
          </Link>
        </div>
      </div>

      {/* Asosiy Ko'rsatkichlar (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Jami Foydalanuvchilar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Foydalanuvchilar
            </span>
            <div className="p-2 rounded-xl bg-[#7026ED]/10 dark:bg-[#7026ED]/20 text-[#7026ED] dark:text-[#A78BFA] border border-[#7026ED]/20 dark:border-[#7026ED]/30 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {stats.totalUsers.toLocaleString()}
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Telegram orqali ro&apos;yxatdan o&apos;tgan
            </p>
          </div>
        </div>

        {/* 2. Faol Tsikllar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Faol Tsikllar
            </span>
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/60 group-hover:scale-105 transition-transform">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {stats.activeCycles.toLocaleString()}
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Takrorlanuvchi eslatmalar
            </p>
          </div>
        </div>

        {/* 3. Bugungi Eslatmalar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Bugungi Eslatmalar
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 group-hover:scale-105 transition-transform">
              <CalendarClock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {stats.todayReminders.toLocaleString()}
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Bugunga rejalashtirilgan
            </p>
          </div>
        </div>

        {/* 4. Jami Xotiralar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Jami Xotiralar
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 group-hover:scale-105 transition-transform">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {stats.totalMemories.toLocaleString()}
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Bulutda saqlangan fayllar
            </p>
          </div>
        </div>
      </div>

      {/* Media Formatlari & So'nggi Eslatmalar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Media Taqsimoti (Distribution) */}
        <div className="lg:col-span-1 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">Media Formatlari</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Xotiraga olingan kontent taqsimoti</p>

            <div className="space-y-4 mt-6">
              {mediaTypes.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium">
                        <Icon className={`w-3.5 h-3.5 ${m.textColor}`} />
                        {m.name}
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {m.count} <span className="text-neutral-400 dark:text-neutral-500 font-normal">({m.pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${m.color} rounded-full transition-all duration-500`}
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-5 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
            <span className="text-xs text-neutral-400 dark:text-neutral-500">Jami media fayllar</span>
            <Link
              href="/admin/memories"
              className="text-xs font-semibold text-[#7026ED] dark:text-[#A78BFA] hover:text-[#5E1EE5] dark:hover:text-[#C4B5FD] flex items-center gap-1 transition-colors"
            >
              Galereyani ko&apos;rish
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2. So'nggi Qo'shilgan Eslatmalar */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">So&apos;nggi Eslatmalar</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Bot orqali yaratilgan oxirgi yozuvlar</p>
            </div>
            <Link
              href="/admin/reminders"
              className="text-xs font-semibold text-[#7026ED] dark:text-[#A78BFA] hover:text-[#5E1EE5] dark:hover:text-[#C4B5FD] flex items-center gap-1 transition-colors"
            >
              Barchasi
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recentReminders.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 dark:text-neutral-500 text-xs">
              Hozircha faol eslatmalar mavjud emas.
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {stats.recentReminders.map((rem: any) => {
                const mem = rem.memories;
                const dateStr = rem.scheduled_at
                  ? new Date(rem.scheduled_at).toLocaleString("uz-UZ", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Sana yo'q";

                return (
                  <div key={rem.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="p-2 rounded-xl bg-[#7026ED]/10 dark:bg-[#7026ED]/20 border border-[#7026ED]/20 dark:border-[#7026ED]/30 text-[#7026ED] dark:text-[#A78BFA] shrink-0 mt-0.5">
                        <BellRing className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white truncate">
                          {mem?.content_text || "(Matnsiz media fayl)"}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                          <span>User ID: {mem?.users?.telegram_id || "Noma'lum"}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
                            {dateStr}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center pl-11 sm:pl-0">
                      {rem.is_recurring && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60">
                          Tsikl
                        </span>
                      )}
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                          rem.status === "pending"
                            ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
                            : rem.status === "sent"
                            ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
                        }`}
                      >
                        {rem.status === "pending" ? "Kutilmoqda" : rem.status === "sent" ? "Yetkazildi" : rem.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
