import { getMemoriesList } from "@/app/admin/actions";
import MemoryDeleteButton from "@/components/admin/MemoryDeleteButton";
import MediaCardPreview from "@/components/admin/MediaCardPreview";
import {
  Image as ImageIcon,
  Calendar,
  User,
  BellRing,
} from "lucide-react";
import Link from "next/link";

interface MemoriesPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function AdminMemoriesPage({ searchParams }: MemoriesPageProps) {
  const params = await searchParams;
  const mediaType = params.type || "all";
  const memories = await getMemoriesList(mediaType);

  const filterTabs = [
    { key: "all", label: "Barcha formatlar" },
    { key: "image", label: "Rasmlar" },
    { key: "voice", label: "Ovozli xabarlar" },
    { key: "video", label: "Videolar" },
    { key: "text", label: "Matnlar" },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Filtrlar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-[#7026ED] dark:text-[#A78BFA]" />
            <span>Xotiralar va Fayllar</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Foydalanuvchilar tomonidan saqlangan barcha kontentlar ({memories.length} ta fayl)
          </p>
        </div>

        {/* Format Filtrlari */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-[#0c1017] p-1.5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs">
          {filterTabs.map((tab) => (
            <Link
              key={tab.key}
              href={`/admin/memories?type=${tab.key}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                mediaType === tab.key
                  ? "bg-[#7026ED] text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#161e2e]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Xotiralar Gridi */}
      {memories.length === 0 ? (
        <div className="p-16 rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 text-center text-neutral-400 dark:text-neutral-500 text-sm shadow-2xs">
          Tanlangan format bo&apos;yicha saqlangan xotiralar topilmadi.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {memories.map((mem: any) => {
            const tgId = mem.users?.telegram_id || "Noma'lum";
            const remindersCount = (mem.reminders || []).length;
            const createdStr = mem.created_at
              ? new Date(mem.created_at).toLocaleDateString("uz-UZ", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Sana yo'q";

            return (
              <div
                key={mem.id}
                className="rounded-2xl bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Media Preview qismi */}
                <div>
                  <MediaCardPreview
                    mediaType={mem.media_type || "text"}
                    mediaUrl={mem.media_url || null}
                    contentText={mem.content_text || null}
                  />

                  {/* Izoh va Matn */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 line-clamp-3 leading-relaxed">
                      {mem.content_text || "(Izohsiz fayl)"}
                    </p>
                  </div>
                </div>

                {/* Pastki Qism (Footer Info) */}
                <div className="px-4 sm:px-5 py-3 bg-neutral-50/80 dark:bg-[#121824]/80 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex items-center gap-1 font-mono text-neutral-700 dark:text-neutral-300 font-semibold truncate">
                      <User className="w-3 h-3 text-neutral-400 dark:text-neutral-500 shrink-0" />
                      <span className="truncate">{tgId}</span>
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-600 shrink-0">•</span>
                    <span className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {createdStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                      <BellRing className="w-3 h-3 text-[#7026ED] dark:text-[#A78BFA]" />
                      <span>{remindersCount}</span>
                    </span>
                    <MemoryDeleteButton memoryId={mem.id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
