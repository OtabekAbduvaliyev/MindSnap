"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  ImageOff,
  Video,
  VideoOff,
  Mic,
  FileText,
  ExternalLink,
  Play,
} from "lucide-react";

interface MediaCardPreviewProps {
  mediaType: string;
  mediaUrl: string | null;
  contentText: string | null;
}

export default function MediaCardPreview({
  mediaType,
  mediaUrl,
  contentText,
}: MediaCardPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const isDirectHttp = Boolean(
    mediaUrl && (mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://") || mediaUrl.startsWith("/"))
  );

  // 1. Rasm formati
  if (mediaType === "image") {
    if (!mediaUrl || imageError || !isDirectHttp) {
      return (
        <div className="relative aspect-video w-full bg-gradient-to-br from-[#FAF9FD] via-neutral-50 to-[#7026ED]/5 border-b border-neutral-200/80 flex flex-col items-center justify-center p-4 overflow-hidden group-hover:from-[#FAF9FD] group-hover:to-[#7026ED]/10 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#7026ED_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#7026ED]/20 shadow-2xs flex items-center justify-center text-[#7026ED] mb-2 group-hover:scale-105 group-hover:border-[#7026ED]/40 transition-all">
              <ImageOff className="w-5 h-5 text-[#7026ED]" />
            </div>
            <span className="text-xs font-bold text-neutral-800 tracking-tight">
              Rasm fayli mavjud emas
            </span>
            <span className="text-[10px] text-neutral-400 mt-0.5">
              Fayl yuklanmadi yoki muddati o&apos;tgan
            </span>
          </div>

          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-xs border border-neutral-200/90 text-[10px] font-semibold text-neutral-700 flex items-center gap-1 shadow-2xs">
            <ImageIcon className="w-3 h-3 text-[#7026ED]" />
            <span>Rasm xotirasi</span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden border-b border-neutral-200/80 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaUrl}
          alt="Xotira rasmi"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/60 text-white backdrop-blur-xs text-[10px] font-semibold flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          <span>Rasm</span>
        </div>
        <a
          href={mediaUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
          title="To'liq o'lchamda ko'rish"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // 2. Video formati
  if (mediaType === "video") {
    if (!mediaUrl || videoError || !isDirectHttp) {
      return (
        <div className="relative aspect-video w-full bg-gradient-to-br from-violet-50/50 via-neutral-50 to-[#7026ED]/10 border-b border-neutral-200/80 flex flex-col items-center justify-center p-4 overflow-hidden group-hover:from-violet-50 group-hover:to-[#7026ED]/15 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#7026ED_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#7026ED]/20 shadow-2xs flex items-center justify-center text-[#7026ED] mb-2 group-hover:scale-105 group-hover:border-[#7026ED]/40 transition-all">
              <Video className="w-5 h-5 text-[#7026ED]" />
            </div>
            <span className="text-xs font-bold text-neutral-800 tracking-tight">
              Video / Doiraviy video
            </span>
            <span className="text-[10px] text-neutral-400 mt-0.5">
              Telegram video xabari
            </span>
          </div>

          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-xs border border-neutral-200/90 text-[10px] font-semibold text-neutral-700 flex items-center gap-1 shadow-2xs">
            <Video className="w-3 h-3 text-[#7026ED]" />
            <span>Videoxotira</span>
          </div>

          {mediaUrl && (
            <a
              href={mediaUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg bg-white/95 border border-neutral-200 text-[#7026ED] text-[10px] font-semibold flex items-center gap-1 shadow-2xs hover:bg-neutral-50 transition-colors"
            >
              <span>Faylni ochish</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      );
    }

    return (
      <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden border-b border-neutral-200/80 group">
        <video
          controls
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover"
        >
          <source src={mediaUrl} />
        </video>
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/60 text-white backdrop-blur-xs text-[10px] font-semibold flex items-center gap-1 pointer-events-none">
          <Video className="w-3 h-3" />
          <span>Video</span>
        </div>
      </div>
    );
  }

  // 3. Ovozli xabar formati
  if (mediaType === "voice") {
    return (
      <div className="p-4 bg-gradient-to-br from-amber-50/70 via-neutral-50 to-amber-50/40 border-b border-amber-100 flex flex-col justify-between gap-2.5 min-h-[120px] aspect-video">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <Mic className="w-4 h-4" />
            </div>
            <span>Ovozli xabar</span>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200/80">
            Audio
          </span>
        </div>

        {mediaUrl && isDirectHttp && !audioError ? (
          <audio
            controls
            onError={() => setAudioError(true)}
            className="w-full mt-1 h-9 rounded-lg"
          >
            <source src={mediaUrl} />
            Brauzeringiz audio ijro etishni qo&apos;llab-quvvatlamaydi.
          </audio>
        ) : (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-200/80 text-xs">
            <span className="text-amber-700 text-[11px] font-medium">Telegram ovozli fayli</span>
            {mediaUrl && (
              <a
                href={mediaUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#7026ED] text-[11px] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Fayl</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  // 4. Standart: Faqat matnli yoki mediasiz xotira
  return (
    <div className="relative aspect-video w-full bg-gradient-to-br from-[#FAF9FD] via-neutral-50 to-[#7026ED]/5 border-b border-neutral-200/80 flex flex-col items-center justify-center p-4 overflow-hidden group-hover:from-[#FAF9FD] group-hover:to-[#7026ED]/10 transition-colors">
      {/* Fon naqshlari */}
      <div className="absolute inset-0 bg-[radial-gradient(#7026ED_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Markaziy illyustratsiya belgisi */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#7026ED]/20 shadow-2xs flex items-center justify-center text-[#7026ED] mb-2 group-hover:scale-105 group-hover:border-[#7026ED]/40 transition-all">
          <ImageOff className="w-5 h-5 text-[#7026ED]" />
        </div>
        <span className="text-xs font-bold text-neutral-800 tracking-tight">
          Media biriktirilmagan
        </span>
        <span className="text-[10px] text-neutral-400 mt-0.5">
          Faqat matnli eslatma xotirasi
        </span>
      </div>

      {/* Format belgisi (Nishon) */}
      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-xs border border-neutral-200/90 text-[10px] font-semibold text-neutral-700 flex items-center gap-1 shadow-2xs">
        <FileText className="w-3 h-3 text-[#7026ED]" />
        <span>Matnli xotira</span>
      </div>
    </div>
  );
}
