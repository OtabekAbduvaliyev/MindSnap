"use client";

import { useTransition } from "react";
import { deleteMemory } from "@/app/admin/actions";
import { Trash2, Loader2 } from "lucide-react";

export default function MemoryDeleteButton({ memoryId }: { memoryId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Ushbu xotira va unga bog'langan eslatmalarni butunlay o'chirishni tasdiqlaysizmi?")) return;
    startTransition(async () => {
      try {
        await deleteMemory(memoryId);
      } catch (err: any) {
        alert(err.message || "Xotirani o'chirib bo'lmadi");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      title="Xotirani o'chirish"
      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 transition-colors disabled:opacity-50 cursor-pointer"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
