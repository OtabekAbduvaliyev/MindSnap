"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { sendBroadcastAction } from "@/app/admin/actions";
import { Send, CheckCircle2, Sparkles, Image as ImageIcon, Globe } from "lucide-react";

export default function BroadcastComposer() {
  const [message, setMessage] = useState(
    "🔔 <b>MindSnap yangilanishi</b>\n\nAssalomu alaykum! MindSnap boti orqali eslatmalar rejalashtirish tizimi yangilandi.\n\nBarcha buyruqlarni ko'rish uchun /help buyrug'ini yuboring!"
  );
  const [photoUrl, setPhotoUrl] = useState("");
  const [timezone, setTimezone] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    total: number;
    sent: number;
    failed: number;
    errors: Array<{ telegramId: number; error: string }>;
  } | null>(null);

  const insertTag = (open: string, close: string) => {
    setMessage((prev) => `${prev}${open}matn${close}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (
      !confirm(
        `Ushbu xabarni ${
          timezone === "all" ? "BARCHA foydalanuvchilarga" : `${timezone} mintaqasidagi foydalanuvchilarga`
        } yuborishni tasdiqlaysizmi?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await sendBroadcastAction({
          messageText: message,
          photoUrl: photoUrl.trim() || undefined,
          parseMode: "HTML",
          targetTimezone: timezone,
        });
        setResult(res);
      } catch (err: any) {
        alert(err.message || "Xabarnoma yuborishda xatolik yuz berdi");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {/* Forma qismi */}
      <div className="bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-[#7026ED] dark:text-[#A78BFA]" />
            <span>Xabar Konstruktori</span>
          </h2>
          <span className="text-[10px] font-semibold text-[#7026ED] dark:text-[#A78BFA] uppercase tracking-wider bg-[#7026ED]/10 dark:bg-[#7026ED]/20 border border-[#7026ED]/20 dark:border-[#7026ED]/30 px-2 py-0.5 rounded-md">
            HTML Rejim
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mintaqa filtri */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Auditoriya filtri
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-50/80 dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-[#7026ED] focus:bg-white dark:focus:bg-[#161e2e] transition-all cursor-pointer"
              >
                <option value="all">Barcha foydalanuvchilar (Global)</option>
                <option value="Asia/Tashkent">Asia/Tashkent (O&apos;zbekiston)</option>
                <option value="Europe/Moscow">Europe/Moscow</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          {/* Rasm URL */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Rasm URL manzili (Ixtiyoriy)
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/banner.png"
                className="w-full pl-10 pr-4 py-2 bg-neutral-50/80 dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#7026ED] focus:bg-white dark:focus:bg-[#161e2e] transition-all"
              />
            </div>
          </div>

          {/* Xabar matni va HTML teglari */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Xabar Matni
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => insertTag("<b>", "</b>")}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-[#161e2e] hover:bg-neutral-200 dark:hover:bg-[#1f293d] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded text-[10px] font-bold cursor-pointer"
                  title="Qalin matn"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertTag("<i>", "</i>")}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-[#161e2e] hover:bg-neutral-200 dark:hover:bg-[#1f293d] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded text-[10px] italic font-serif cursor-pointer"
                  title="Kursiv matn"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertTag("<code>", "</code>")}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-[#161e2e] hover:bg-neutral-200 dark:hover:bg-[#1f293d] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded text-[10px] font-mono cursor-pointer"
                  title="Kod formati"
                >
                  &lt;/&gt;
                </button>
                <button
                  type="button"
                  onClick={() => setMessage((prev) => prev + " 🔔 ")}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-[#161e2e] hover:bg-neutral-200 dark:hover:bg-[#1f293d] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded text-[10px] cursor-pointer"
                  title="Qo'ng'iroqcha emoji"
                >
                  🔔
                </button>
              </div>
            </div>
            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Xabar matnini bu yerga yozing..."
              className="w-full p-3.5 bg-neutral-50/80 dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-mono text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#7026ED] focus:bg-white dark:focus:bg-[#161e2e] focus:ring-2 focus:ring-[#7026ED]/15 transition-all resize-y leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#7026ED] hover:bg-[#5E1EE5] text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer active:scale-[0.99]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Xabarlar yuborilmoqda (Xavfsiz tezlikda)...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Hoziroq yuborish</span>
              </>
            )}
          </button>
        </form>

        {/* Natija kartochkasi */}
        {result && (
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 animate-in fade-in">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Xabarnoma yakunlandi</span>
            </h4>
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2 rounded-lg bg-white dark:bg-[#0c1017] border border-neutral-200 dark:border-neutral-700">
                <p className="text-base font-bold text-neutral-900 dark:text-white">{result.total}</p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase">Mo&apos;ljallangan</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">{result.sent}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase">Yetkazildi</p>
              </div>
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60">
                <p className="text-base font-bold text-rose-700 dark:text-rose-300">{result.failed}</p>
                <p className="text-[10px] text-rose-600 dark:text-rose-400 uppercase">Yetmadi</p>
              </div>
            </div>
            {result.errors.length > 0 && (
              <div className="mt-2.5 text-[11px] text-rose-600 dark:text-rose-400 space-y-1 max-h-24 overflow-y-auto">
                {result.errors.slice(0, 5).map((e, idx) => (
                  <p key={idx}>User {e.telegramId}: {e.error}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Jonli Telegram Chat Preview (Live Mockup) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#7026ED] dark:text-[#A78BFA]" />
            <span>Telegramda ko&apos;rinishi (Jonli Preview)</span>
          </h3>
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">Live Render</span>
        </div>

        {/* Telegram Chat oynasi */}
        <div className="w-full rounded-2xl bg-[#f3f5f8] dark:bg-[#06080d] border border-neutral-200/90 dark:border-neutral-800/80 p-5 shadow-sm relative overflow-hidden min-h-[420px] flex flex-col justify-end">
          {/* Chat sarlavhasi */}
          <div className="absolute top-0 left-0 right-0 p-3 bg-white dark:bg-[#0f141d] border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white dark:bg-[#161e2e] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-0.5 overflow-hidden">
              <Image src="/logo.png" alt="MindSnap" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-900 dark:text-white">MindSnap</p>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500">bot • rasmiy xabarnoma</p>
            </div>
          </div>

          {/* Xabar pufagi (Bubble) */}
          <div className="max-w-[90%] bg-white dark:bg-[#121824] border border-neutral-200/90 dark:border-neutral-800/80 rounded-2xl rounded-bl-xs p-3.5 shadow-sm space-y-3 mt-12">
            {photoUrl.trim() && (
              <div className="rounded-xl overflow-hidden aspect-video bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt="Xabarnoma rasmi"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}

            <div
              className="text-xs text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed space-y-2 [&_b]:font-bold [&_b]:text-neutral-950 dark:[&_b]:text-white [&_i]:italic [&_code]:font-mono [&_code]:bg-neutral-100 dark:[&_code]:bg-neutral-800 dark:[&_code]:text-[#A78BFA] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded"
              dangerouslySetInnerHTML={{
                __html: message.trim() || "<span class='text-neutral-400 dark:text-neutral-500'>Xabar matni bu yerda aks etadi...</span>",
              }}
            />

            <div className="text-right text-[10px] text-neutral-400 dark:text-neutral-500 flex items-center justify-end gap-1">
              <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              <span className="text-[#7026ED] dark:text-[#A78BFA] font-bold">✓✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
