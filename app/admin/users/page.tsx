import { getUsersList } from "@/app/admin/actions";
import { Users, Search, Globe, Database, BellRing, Calendar } from "lucide-react";
import Link from "next/link";

interface UsersPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminUsersPage({ searchParams }: UsersPageProps) {
  const { q } = await searchParams;
  const users = await getUsersList(q);

  return (
    <div className="space-y-6">
      {/* Header & Qidiruv */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-[#7026ED] dark:text-[#A78BFA]" />
            <span>Foydalanuvchilar</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Botdan ro&apos;yxatdan o&apos;tgan jami {users.length} ta Telegram foydalanuvchisi
          </p>
        </div>

        {/* Qidiruv formasi */}
        <form className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Telegram ID bo'yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0c1017] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#7026ED] focus:ring-2 focus:ring-[#7026ED]/15 transition-all shadow-2xs"
          />
        </form>
      </div>

      {/* Foydalanuvchilar Jadvali */}
      <div className="bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-[620px]">
            <thead className="bg-neutral-50/90 dark:bg-[#121824] border-b border-neutral-200/80 dark:border-neutral-800 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 sm:px-6 py-3.5">Telegram ID</th>
                <th className="px-4 sm:px-6 py-3.5">Vaqt mintaqasi</th>
                <th className="px-4 sm:px-6 py-3.5">Xotiralar</th>
                <th className="px-4 sm:px-6 py-3.5">Faol Eslatmalar</th>
                <th className="px-4 sm:px-6 py-3.5">Ro&apos;yxat sanasi</th>
                <th className="px-4 sm:px-6 py-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-neutral-700 dark:text-neutral-300">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 sm:px-6 py-12 text-center text-neutral-400 dark:text-neutral-500 text-xs">
                    Qidiruv bo&apos;yicha hech qanday foydalanuvchi topilmadi.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const regDate = u.created_at
                    ? new Date(u.created_at).toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Noma'lum";

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-neutral-50/70 dark:hover:bg-[#161e2e]/50 transition-colors group"
                    >
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 font-mono font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#7026ED]" />
                        <span>{u.telegram_id}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-[#161e2e] border border-neutral-200/80 dark:border-neutral-700/60 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                          <Globe className="w-3 h-3 text-[#7026ED] dark:text-[#A78BFA]" />
                          <span>{u.timezone}</span>
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                          <Database className="w-3.5 h-3.5 text-amber-500" />
                          <span>{u.memories_count} ta fayl</span>
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                          <BellRing
                            className={`w-3.5 h-3.5 ${
                              u.active_reminders_count > 0
                                ? "text-[#7026ED] dark:text-[#A78BFA]"
                                : "text-neutral-400 dark:text-neutral-500"
                            }`}
                          />
                          <span
                            className={
                              u.active_reminders_count > 0
                                ? "text-[#7026ED] dark:text-[#A78BFA]"
                                : "text-neutral-400 dark:text-neutral-500"
                            }
                          >
                            {u.active_reminders_count} ta kutilmoqda
                          </span>
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                          <span>{regDate}</span>
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-right">
                        <Link
                          href={`/admin/reminders?search=${u.telegram_id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#7026ED]/10 dark:bg-[#7026ED]/20 hover:bg-[#7026ED] dark:hover:bg-[#7026ED] border border-[#7026ED]/20 dark:border-[#7026ED]/30 text-[#7026ED] dark:text-[#A78BFA] hover:text-white dark:hover:text-white text-xs font-semibold transition-all shadow-2xs"
                        >
                          Eslatmalar
                        </Link>
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
