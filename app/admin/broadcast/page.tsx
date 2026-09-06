import BroadcastComposer from "@/components/admin/BroadcastComposer";
import { Send } from "lucide-react";

export default function AdminBroadcastPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Send className="w-7 h-7 text-[#7026ED] dark:text-[#A78BFA]" />
          <span>Xabarnoma Yuborish (Broadcast)</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Telegram Bot API orqali ro&apos;yxatdagi foydalanuvchilarga e&apos;lon va xabarlar tarqatish
        </p>
      </div>

      <BroadcastComposer />
    </div>
  );
}
