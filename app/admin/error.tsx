"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft, Home } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin portal error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-800/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Kutilmagan xatolik yuz berdi
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
            Admin sahifasini yuklashda muammo yuzaga keldi. Server yoki tarmoq aloqasini tekshirib qayta urinib ko&apos;ring.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mt-2 bg-neutral-50 dark:bg-[#121824] py-1 px-2 rounded-md inline-block border border-neutral-200/60 dark:border-neutral-800">
              Kod: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7026ED] hover:bg-[#5E1EE5] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Qayta urinish</span>
          </button>

          <Link
            href="/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-[#161e2e] hover:bg-neutral-200 dark:hover:bg-[#1f293d] text-neutral-700 dark:text-neutral-300 text-xs font-semibold transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Bosh sahifaga</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
