"use client";

import { useState, useTransition } from "react";
import {
  stopRecurringReminder,
  rescheduleReminder,
  triggerReminderNow,
  deleteReminder,
} from "@/app/admin/actions";
import { Play, Square, Calendar, Trash2, Loader2, Check, X } from "lucide-react";

interface ReminderRowActionsProps {
  reminderId: string;
  status: string;
  isRecurring: boolean;
  scheduledAt: string;
}

export default function ReminderRowActions({
  reminderId,
  status,
  isRecurring,
  scheduledAt,
}: ReminderRowActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState(() => {
    try {
      return new Date(scheduledAt).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleStop = () => {
    if (!confirm("Ushbu takrorlanuvchi tsiklni to'xtatishni xohlaysizmi?")) return;
    startTransition(async () => {
      try {
        await stopRecurringReminder(reminderId);
        setFeedback("To'xtatildi");
        setTimeout(() => setFeedback(null), 3000);
      } catch (err: any) {
        alert(err.message || "Tsiklni to'xtatib bo'lmadi");
      }
    });
  };

  const handleTrigger = () => {
    if (!confirm("Ushbu eslatmani zudlik bilan Telegram orqali yuborilsinmi?")) return;
    startTransition(async () => {
      try {
        await triggerReminderNow(reminderId);
        setFeedback("Yuborildi");
        setTimeout(() => setFeedback(null), 3000);
      } catch (err: any) {
        alert(err.message || "Eslatmani yuborib bo'lmadi");
      }
    });
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    startTransition(async () => {
      try {
        const iso = new Date(newDate).toISOString();
        await rescheduleReminder(reminderId, iso);
        setShowReschedule(false);
        setFeedback("O'zgartirildi");
        setTimeout(() => setFeedback(null), 3000);
      } catch (err: any) {
        alert(err.message || "Vaqtni o'zgartirib bo'lmadi");
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("Ushbu eslatmani butunlay o'chirishni tasdiqlaysizmi?")) return;
    startTransition(async () => {
      try {
        await deleteReminder(reminderId);
      } catch (err: any) {
        alert(err.message || "Eslatmani o'chirib bo'lmadi");
      }
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-end gap-1.5 text-xs text-[#7026ED]">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>Yangilanmoqda...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1.5 relative">
      {feedback && (
        <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold mr-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-lg">
          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          {feedback}
        </span>
      )}

      {/* Zudlik bilan yuborish (Trigger Now) */}
      <button
        type="button"
        onClick={handleTrigger}
        title="Zudlik bilan Telegramga yuborish"
        className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors cursor-pointer"
      >
        <Play className="w-3.5 h-3.5" />
      </button>

      {/* Tsiklni to'xtatish */}
      {isRecurring && status === "pending" && (
        <button
          type="button"
          onClick={handleStop}
          title="Tsiklni to'xtatish"
          className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 transition-colors cursor-pointer"
        >
          <Square className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Vaqtni o'zgartirish (Reschedule) */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowReschedule(!showReschedule)}
          title="Vaqtni o'zgartirish"
          className="p-1.5 rounded-lg bg-[#7026ED]/10 dark:bg-[#7026ED]/20 hover:bg-[#7026ED]/20 dark:hover:bg-[#7026ED]/30 text-[#7026ED] dark:text-[#A78BFA] border border-[#7026ED]/20 dark:border-[#7026ED]/30 transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
        </button>

        {showReschedule && (
          <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-white dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl z-50 animate-in fade-in zoom-in-95">
            <form onSubmit={handleRescheduleSubmit} className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider">
                  Yangi vaqt
                </label>
                <button
                  type="button"
                  onClick={() => setShowReschedule(false)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="datetime-local"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-[#0c1017] border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#7026ED] focus:bg-white dark:focus:bg-[#161e2e] transition-all"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowReschedule(false)}
                  className="px-2.5 py-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#7026ED] hover:bg-[#5E1EE5] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* O'chirish */}
      <button
        type="button"
        onClick={handleDelete}
        title="Eslatmani butunlay o'chirish"
        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 transition-colors cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
