import { getRemindersList } from "@/app/admin/actions";
import ReminderRowActions from "@/components/admin/ReminderRowActions";
import {
  BellRing,
  Search,
  Filter,
  Repeat,
  Clock,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Mic,
  Video,
} from "lucide-react";
import Link from "next/link";

interface RemindersPageProps {
  searchParams: Promise<{
    status?: string;
    type?: string;
    search?: string;
  }>;
}

export default async function AdminRemindersPage({ searchParams }: RemindersPageProps) {
  const params = await searchParams;
  const status = params.status || "all";
  const type = params.type || "all";
  const search = params.search || "";

  const reminders = await getRemindersList({
    status,
    isRecurring: type,
    search,
  });

  const statusMap: Record<string, { label: string; color: string }> = {
    all: { label: "Barchasi", color: "" },
    pending: { label: "Kutilmoqda", color: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60" },
    sent: { label: "Yetkazildi", color: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60" },
    stopped: { label: "To'xtatilgan", color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700" },
  };

  return (
    <div className="space-y-6">
      {/* Header & Qidiruv */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BellRing className="w-7 h-7 text-[#7026ED] dark:text-[#A78BFA]" />
            <span>Eslatmalar va Tsikllar</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Barcha rejalashtirilgan eslatmalarni boshqarish ({reminders.length} ta topildi)
          </p>
        </div>

        {/* Qidiruv */}
        <form className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Matn yoki Telegram ID bo'yicha..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0c1017] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#7026ED] focus:ring-2 focus:ring-[#7026ED]/15 transition-all shadow-2xs"
          />
          {status !== "all" && <input type="hidden" name="status" value={status} />}
          {type !== "all" && <input type="hidden" name="type" value={type} />}
        </form>
      </div>

      {/* Filtr Tablari */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-[#0c1017] p-3 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs">
        {/* Status filtri */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-2">
            <Filter className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
            <span>Holat:</span>
          </div>
          {["all", "pending", "sent", "stopped"].map((st) => (
            <Link
              key={st}
              href={`/admin/reminders?status=${st}&type=${type}&search=${encodeURIComponent(search)}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                status === st
                  ? "bg-[#7026ED] text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#161e2e]"
              }`}
            >
              {statusMap[st]?.label || st}
            </Link>
          ))}
        </div>

        {/* Turi filtri */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-2">
            Turi:
          </span>
          {[
            { key: "all", label: "Barchasi" },
            { key: "recurring", label: "Tsikllar" },
            { key: "once", label: "Bir martalik" },
          ].map((t) => (
            <Link
              key={t.key}
              href={`/admin/reminders?status=${status}&type=${t.key}&search=${encodeURIComponent(search)}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                type === t.key
                  ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#161e2e]"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Eslatmalar Jadvali */}
      <div className="bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-[720px]">
            <thead className="bg-neutral-50/90 dark:bg-[#121824] border-b border-neutral-200/80 dark:border-neutral-800 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 sm:px-6 py-3.5">Xotira / Izoh</th>
                <th className="px-4 sm:px-6 py-3.5">Foydalanuvchi</th>
                <th className="px-4 sm:px-6 py-3.5">Rejalashtirilgan vaqt</th>
                <th className="px-4 sm:px-6 py-3.5">Turi</th>
                <th className="px-4 sm:px-6 py-3.5">Holati</th>
                <th className="px-4 sm:px-6 py-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-neutral-700 dark:text-neutral-300">
              {reminders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 sm:px-6 py-12 text-center text-neutral-400 dark:text-neutral-500 text-xs">
                    Tanlangan filtrlar bo&apos;yicha eslatmalar topilmadi.
                  </td>
                </tr>
              ) : (
                reminders.map((rem: any) => {
                  const mem = rem.memories;
                  const tgId = mem?.users?.telegram_id || "Noma'lum";
                  const mediaType = mem?.media_type || "text";
                  const dateStr = rem.scheduled_at
                    ? new Date(rem.scheduled_at).toLocaleString("uz-UZ", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Tashkent",
                      }) + " (UZT)"
                    : "Rejalashtirilmagan";

                  const intervalDesc = rem.recurring_interval_minutes
                    ? `${rem.recurring_interval_minutes} daqiqa`
                    : "Takrorlanishsiz";

                  return (
                    <tr key={rem.id} className="hover:bg-neutral-50/70 dark:hover:bg-[#161e2e]/50 transition-colors">
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 max-w-xs">
                        <div className="flex items-start gap-2.5">
                          <span className="p-1.5 rounded-lg bg-[#7026ED]/10 dark:bg-[#7026ED]/20 text-[#7026ED] dark:text-[#A78BFA] shrink-0 mt-0.5">
                            {mediaType === "image" ? (
                              <ImageIcon className="w-3.5 h-3.5" />
                            ) : mediaType === "voice" ? (
                              <Mic className="w-3.5 h-3.5" />
                            ) : mediaType === "video" ? (
                              <Video className="w-3.5 h-3.5" />
                            ) : (
                              <FileText className="w-3.5 h-3.5" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-2">
                              {mem?.content_text || "(Matnsiz fayl)"}
                            </p>
                            {mem?.media_url && (
                              <a
                                href={mem.media_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-[#7026ED] dark:text-[#A78BFA] hover:underline inline-flex items-center gap-1 mt-0.5"
                              >
                                <span>Faylni ko&apos;rish</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                        <span className="font-mono text-xs text-neutral-900 dark:text-white font-semibold block">
                          {tgId}
                        </span>
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                          {mem?.users?.timezone || "Asia/Tashkent"}
                        </span>
                      </td>

                      <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                          <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                          <span>{dateStr}</span>
                        </span>
                      </td>

                      <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                        {rem.is_recurring ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60 text-[10px] uppercase font-bold tracking-wider">
                              <Repeat className="w-3 h-3" />
                              <span>Tsikl</span>
                            </span>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{intervalDesc}</p>
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">Bir martalik</span>
                        )}
                      </td>

                      <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                            statusMap[rem.status]?.color ||
                            "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
                          }`}
                        >
                          {statusMap[rem.status]?.label || rem.status}
                        </span>
                      </td>

                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-right">
                        <ReminderRowActions
                          reminderId={rem.id}
                          status={rem.status}
                          isRecurring={rem.is_recurring}
                          scheduledAt={rem.scheduled_at}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
