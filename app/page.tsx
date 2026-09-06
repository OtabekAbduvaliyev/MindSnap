"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  Video,
  FileText,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Repeat,
  Check,
  ChevronDown,
  Terminal,
  Send,
  Sliders,
  Copy,
  Globe2,
  Play,
  RotateCcw,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"voice" | "video" | "document">("video");
  const [chatStep, setChatStep] = useState<"preview" | "confirmed" | "editing" | "cancelled">("preview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("mindsnap_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("mindsnap_theme", nextTheme);
  };

  const isLight = theme === "light";

  const handleTabChange = (tab: "voice" | "video" | "document") => {
    setActiveTab(tab);
    setChatStep("preview");
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const faqs = [
    {
      q: "Ovozli xabarlar qanday qabul qilinadi?",
      a: "Siz Telegram orqali oddiy ovozli xabar yuborasiz (masalan: «Ertaga soat 10:00 da hisobot topshirishimni eslat»). Bot Google Gemini sun'iy intellekti yordamida nutqingizni matnga o'giradi, vazifani va belgilangan vaqtni avtomatik aniqlab eslatma yaratadi.",
    },
    {
      q: "Videolarni qanday saqlash va eslatma qilish mumkin?",
      a: "Oddiy videolar yoki Telegram'dagi dumaloq video xabarlarni botga yuborishingiz mumkin. Ixtiyoriy ravishda ovozli yoki matnli izoh qoldiring. Eslatma vaqti kelganda bot videoni asl sifat va formatida xabarnoma bilan yetkazadi.",
    },
    {
      q: "Qanday turdagi fayllarni saqlash mumkin?",
      a: "Ovozli xabarlar, barcha turdagi videolar, fotosuratlar, PDF va Word hujjatlar hamda matnli xabarlar. Barcha fayllar shaxsiy va xavfsiz bulutli xotirada saqlanadi.",
    },
    {
      q: "Rejalashtirilgan eslatmani o'zgartirish yoki bekor qilish mumkinmi?",
      a: "Albatta. Botga /reminders buyrug'ini yuborib faol eslatmalaringizni ko'rishingiz, /edit orqali sana, vaqt yoki matnni o'zgartirishingiz, /delete orqali esa istalganini bekor qilishingiz mumkin.",
    },
    {
      q: "Vaqt mintaqasi qanday ishlaydi?",
      a: "Birlamchi holatda O'zbekiston vaqti (Asia/Tashkent, UTC+5) o'rnatilgan. Agar boshqa davlatda bo'lsangiz, /timezone buyrug'i orqali o'z mahalliy vaqtingizni sozlashingiz mumkin.",
    },
    {
      q: "Botdan foydalanish bepulmi?",
      a: "Ha, bot barcha foydalanuvchilar uchun mutlaqo bepul.",
    },
  ];

  const commands = [
    { cmd: "/start", desc: "Botni ishga tushirish va profil yaratish" },
    { cmd: "/new", desc: "Yangi eslatma yoki fayl saqlash" },
    { cmd: "/reminders", desc: "Barcha faol va rejalashtirilgan eslatmalarni ko'rish" },
    { cmd: "/edit", desc: "Mavjud eslatma vaqtini, sanasini yoki matnini tahrirlash" },
    { cmd: "/delete", desc: "Keraksiz eslatmani ro'yxatdan o'chirish" },
    { cmd: "/stop", desc: "Takrorlanuvchi eslatmalar seriyasini to'xtatish" },
    { cmd: "/timezone", desc: "Mahalliy vaqt mintaqangizni ko'rish va o'zgartirish" },
    { cmd: "/help", desc: "Botdan foydalanish bo'yicha to'liq qo'llanma" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div
        className={`min-h-screen font-sans transition-colors duration-200 selection:bg-[#7026ED]/20 selection:text-[#7026ED] ${
          isLight ? "bg-white text-neutral-800" : "bg-[#090a0f] text-neutral-200"
        }`}
      >
      {/* Yuqori navigatsiya (Dynamic Shrinking Floating Island Header + Mobile Navigation) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-300">
        <header
          className={`pointer-events-auto transition-all duration-300 ease-out ${
            scrolled
              ? isLight
                ? "w-[94%] sm:w-[88%] max-w-3xl mt-2.5 sm:mt-4 px-3.5 sm:px-5 py-2.5 rounded-2xl border border-neutral-200/90 bg-white/90 backdrop-blur-xl shadow-lg shadow-neutral-200/50"
                : "w-[94%] sm:w-[88%] max-w-3xl mt-2.5 sm:mt-4 px-3.5 sm:px-5 py-2.5 rounded-2xl border border-neutral-700/80 bg-[#0e1017]/90 backdrop-blur-xl shadow-2xl shadow-black/60"
              : isLight
              ? "w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md rounded-none px-4 sm:px-8 py-3.5 sm:py-4 shadow-none"
              : "w-full border-b border-neutral-800/80 bg-[#090a0f]/90 backdrop-blur-md rounded-none px-4 sm:px-8 py-3.5 sm:py-4 shadow-none"
          }`}
        >
          <div
            className={`w-full mx-auto flex items-center justify-between transition-all duration-300 ${
              scrolled ? "max-w-full" : "max-w-6xl"
            }`}
          >
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div
                className={`overflow-hidden bg-white flex items-center justify-center p-0.5 border shadow-sm transition-all duration-300 ${
                  isLight ? "border-neutral-200" : "border-white/20"
                } ${scrolled ? "w-6 h-6 sm:w-7 sm:h-7 rounded-lg" : "w-7 h-7 sm:w-8 sm:h-8 rounded-lg"}`}
              >
                <Image
                  src="/logo.png"
                  alt="MindSnap Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <span
                className={`font-bold tracking-tight flex items-center gap-1 sm:gap-1.5 transition-all duration-300 ${
                  isLight ? "text-neutral-900" : "text-white"
                } ${scrolled ? "text-xs sm:text-sm" : "text-xs sm:text-sm"}`}
              >
                MindSnap
                <span
                  className={`font-semibold tracking-wider uppercase rounded transition-all duration-300 ${
                    isLight
                      ? "bg-[#7026ED]/10 text-[#7026ED] border border-[#7026ED]/20"
                      : "bg-[#7026ED]/15 text-[#A78BFA] border border-[#7026ED]/30"
                  } ${scrolled ? "text-[8px] sm:text-[9px] px-1 py-0.2" : "text-[9px] sm:text-[10px] px-1.5 py-0.5"}`}
                >
                  Bot
                </span>
              </span>
            </Link>

            {/* Desktop Navigatsiya */}
            <nav
              className={`hidden md:flex items-center font-medium transition-all duration-300 ${
                isLight ? "text-neutral-600" : "text-neutral-400"
              } ${scrolled ? "gap-5 text-[11px]" : "gap-7 text-xs"}`}
            >
              <a
                href="#imkoniyatlar"
                className={`transition-colors ${isLight ? "hover:text-neutral-950" : "hover:text-white"}`}
              >
                Imkoniyatlar
              </a>
              <a
                href="#ishlash-tartibi"
                className={`transition-colors ${isLight ? "hover:text-neutral-950" : "hover:text-white"}`}
              >
                Ishlash tartibi
              </a>
              <a
                href="#buyruqlar"
                className={`transition-colors ${isLight ? "hover:text-neutral-950" : "hover:text-white"}`}
              >
                Buyruqlar
              </a>
              <a
                href="#savollar"
                className={`transition-colors ${isLight ? "hover:text-neutral-950" : "hover:text-white"}`}
              >
                Savol-javoblar
              </a>
            </nav>

            {/* O'ng tomon: Mavzu almashtirgich, Bot tugmasi va Mobile Menu Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  isLight
                    ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700"
                    : "bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 text-neutral-300"
                }`}
                title={isLight ? "Qorong'i rejimga o'tish" : "Yorug' rejimga o'tish"}
                aria-label="Mavzuni almashtirish"
              >
                {isLight ? (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700" />
                ) : (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A78BFA]" />
                )}
              </button>

              <a
                href="https://t.me/mindsnaporgbot"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 font-semibold bg-[#7026ED] hover:bg-[#5E1EE5] text-white transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap ${
                  scrolled
                    ? "text-[10px] sm:text-[11px] px-2.5 sm:px-3.5 py-1.5 rounded-xl"
                    : "text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl"
                }`}
              >
                <span>Botni ochish</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>

              {/* Mobil Menyu Tugmasi */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isLight
                    ? "bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900"
                    : "bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white"
                }`}
                aria-label="Menyu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobil Navigatsiya Ochiluvchi Paneli (Dropdown Drawer) */}
        {mobileMenuOpen && (
          <div
            className={`pointer-events-auto w-[94%] max-w-sm mt-2 rounded-2xl border p-3 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200 ${
              isLight
                ? "border-neutral-200/90 bg-white/95 backdrop-blur-xl shadow-neutral-200/70"
                : "border-neutral-700/80 bg-[#0e1017]/95 backdrop-blur-xl shadow-black/80"
            }`}
          >
            <div
              className={`flex flex-col gap-1 text-xs font-medium ${
                isLight ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              <a
                href="#imkoniyatlar"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  isLight
                    ? "hover:bg-neutral-100 hover:text-neutral-950"
                    : "hover:bg-neutral-800/80 hover:text-white"
                }`}
              >
                <span>Imkoniyatlar</span>
                <span className={`text-[10px] font-mono ${isLight ? "text-neutral-400" : "text-neutral-500"}`}>
                  01
                </span>
              </a>
              <a
                href="#ishlash-tartibi"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  isLight
                    ? "hover:bg-neutral-100 hover:text-neutral-950"
                    : "hover:bg-neutral-800/80 hover:text-white"
                }`}
              >
                <span>Ishlash tartibi</span>
                <span className={`text-[10px] font-mono ${isLight ? "text-neutral-400" : "text-neutral-500"}`}>
                  02
                </span>
              </a>
              <a
                href="#buyruqlar"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  isLight
                    ? "hover:bg-neutral-100 hover:text-neutral-950"
                    : "hover:bg-neutral-800/80 hover:text-white"
                }`}
              >
                <span>Buyruqlar</span>
                <span className={`text-[10px] font-mono ${isLight ? "text-neutral-400" : "text-neutral-500"}`}>
                  03
                </span>
              </a>
              <a
                href="#savollar"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  isLight
                    ? "hover:bg-neutral-100 hover:text-neutral-950"
                    : "hover:bg-neutral-800/80 hover:text-white"
                }`}
              >
                <span>Savol-javoblar</span>
                <span className={`text-[10px] font-mono ${isLight ? "text-neutral-400" : "text-neutral-500"}`}>
                  04
                </span>
              </a>

              {/* Mavzuni almashtirish qatori */}
              <div
                className={`pt-2 mt-1 border-t flex items-center justify-between px-3.5 py-1.5 ${
                  isLight ? "border-neutral-200" : "border-neutral-800"
                }`}
              >
                <span className="text-xs">Mavzu:</span>
                <button
                  onClick={toggleTheme}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isLight
                      ? "bg-neutral-100 border-neutral-200 text-neutral-800"
                      : "bg-neutral-800 border-neutral-700 text-neutral-200"
                  }`}
                >
                  {isLight ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3 text-[#A78BFA]" />}
                  <span>{isLight ? "Qorong'i rejim" : "Yorug' rejim"}</span>
                </button>
              </div>

              <div className={`pt-1.5 border-t mt-1 ${isLight ? "border-neutral-200" : "border-neutral-800/80"}`}>
                <a
                  href="https://t.me/mindsnaporgbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#7026ED] text-white font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <span>@mindsnaporgbot ga kirish</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Asosiy qism (Hero) */}
      <section className="pt-24 pb-14 md:pt-36 md:pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
          <div
            className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-medium transition-colors ${
              isLight
                ? "border-[#7026ED]/25 bg-[#7026ED]/8 text-[#7026ED]"
                : "border-[#7026ED]/30 bg-[#7026ED]/10 text-[#C4B5FD]"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span>Telegram boti • Sun&apos;iy intellekt (Gemini)</span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.18] sm:leading-[1.15] transition-colors ${
              isLight ? "text-neutral-950" : "text-white"
            }`}
          >
            Hech narsani unutmang.
            <br />
            <span className={isLight ? "text-[#7026ED]" : "text-[#A78BFA]"}>
              Muhim fikr va vazifalar doim yodingizda.
            </span>
          </h1>

          <p
            className={`text-xs sm:text-base leading-relaxed max-w-xl mx-auto px-1 transition-colors ${
              isLight ? "text-neutral-600" : "text-neutral-400"
            }`}
          >
            MindSnap — Telegram ichidagi intellektual xotira yordamchingiz. Ovozli xabar, video, hujjat yoki rasm yuboring. Qolganini sun&apos;iy intellekt o&apos;zi to&apos;g&apos;ri vaqtda eslatadi.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-sm sm:max-w-none mx-auto">
            <a
              href="https://t.me/mindsnaporgbot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold bg-[#7026ED] hover:bg-[#5E1EE5] text-white px-6 sm:px-7 py-3 rounded-xl sm:rounded-lg transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram orqali boshlash</span>
            </a>
            <a
              href="#ishlash-tartibi"
              className={`w-full sm:w-auto inline-flex items-center justify-center text-xs font-medium px-5 py-3 rounded-xl sm:rounded-lg transition-colors border ${
                isLight
                  ? "text-neutral-700 hover:text-neutral-950 bg-white hover:bg-neutral-50 border-neutral-200/90 shadow-sm"
                  : "text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-800"
              }`}
            >
              Qanday ishlaydi?
            </a>
          </div>

          <div className="pt-2 text-xs text-neutral-500 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-center px-1">
            <span className="shrink-0">Ovozli misol:</span>
            <code
              className={`px-2 py-1 sm:py-0.5 rounded border font-mono text-[10px] sm:text-[11px] break-words inline-block max-w-full transition-colors ${
                isLight
                  ? "bg-white border-neutral-200/90 text-[#7026ED] shadow-xs"
                  : "bg-neutral-900 border-neutral-800 text-[#C4B5FD]"
              }`}
            >
              &laquo;Ertaga soat 14:00 da taqdimot videosini ko&apos;rib chiqishni eslat&raquo;
            </code>
          </div>
        </div>

        {/* Kengaytirilgan va interaktiv Telegram Chat Ko'rinishi (Wider & Interactive Simulation) */}
        <div className="max-w-4xl mx-auto mt-10 sm:mt-14">
          <div
            className={`rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 border ${
              isLight
                ? "border-neutral-200/90 bg-white shadow-xl shadow-neutral-200/60"
                : "border-neutral-800 bg-[#0e1017] shadow-2xl"
            }`}
          >
            {/* Oyna sarlavhasi (Header) */}
            <div
              className={`px-3 sm:px-5 py-2.5 sm:py-3.5 border-b flex items-center justify-between gap-2 transition-colors ${
                isLight ? "border-neutral-200 bg-[#f4f6f9]" : "border-neutral-800 bg-[#12141e]"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl overflow-hidden bg-white flex items-center justify-center p-0.5 border shadow-sm shrink-0 ${
                    isLight ? "border-neutral-200" : "border-white/20"
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="MindSnap"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span
                      className={`text-[11px] sm:text-xs font-bold ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      MindSnap
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] px-1 py-0.2 rounded font-medium border ${
                        isLight
                          ? "bg-[#7026ED]/10 text-[#7026ED] border-[#7026ED]/20"
                          : "bg-[#7026ED]/20 text-[#C4B5FD] border-[#7026ED]/40"
                      }`}
                    >
                      bot
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-emerald-500 font-medium">onlayn</p>
                </div>
              </div>

              {/* Formatlar almashtirgichi */}
              <div
                className={`flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border text-[10px] sm:text-[11px] shrink-0 transition-colors ${
                  isLight ? "bg-neutral-200/70 border-neutral-300/60" : "bg-neutral-900 border-neutral-800"
                }`}
              >
                <button
                  onClick={() => handleTabChange("video")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === "video"
                      ? "bg-[#7026ED] text-white shadow-sm"
                      : isLight
                      ? "text-neutral-600 hover:text-neutral-950"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => handleTabChange("voice")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === "voice"
                      ? "bg-[#7026ED] text-white shadow-sm"
                      : isLight
                      ? "text-neutral-600 hover:text-neutral-950"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Ovozli</span>
                </button>
                <button
                  onClick={() => handleTabChange("document")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === "document"
                      ? "bg-[#7026ED] text-white shadow-sm"
                      : isLight
                      ? "text-neutral-600 hover:text-neutral-950"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Hujjat</span>
                </button>
              </div>
            </div>

            {/* Chat Maydoni (Kengaytirilgan oyna) */}
            <div
              className={`p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6 text-xs transition-colors ${
                isLight ? "bg-[#f1f3f7]" : "bg-[#0b0c12]"
              }`}
            >
              {/* Sana ko'rsatkichi */}
              <div className="flex justify-center">
                <span
                  className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-[11px] font-medium transition-colors ${
                    isLight
                      ? "bg-white/90 border-neutral-200 text-neutral-500 shadow-xs"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400"
                  }`}
                >
                  Bugun, 7-Sentabr
                </span>
              </div>

              {/* 1. Foydalanuvchi yuborgan xabar (O'ng tomonda) */}
              <div className="flex justify-end">
                <div
                  className={`max-w-[92%] sm:max-w-md w-full sm:w-auto rounded-2xl rounded-tr-sm overflow-hidden p-3 sm:p-3.5 space-y-2.5 border transition-all ${
                    isLight
                      ? "bg-white border-neutral-200/90 text-neutral-900 shadow-md shadow-neutral-200/40"
                      : "bg-[#171924] border-neutral-700/70 text-white"
                  }`}
                >
                  {/* VIDEO TAB */}
                  {activeTab === "video" && (
                    <div className="space-y-2">
                      <div className="relative rounded-xl overflow-hidden bg-neutral-900 aspect-video border border-neutral-800 flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[#1a1829] flex flex-col justify-between p-2.5 sm:p-3">
                          <div className="flex items-center justify-between text-[10px] text-neutral-400">
                            <span className="flex items-center gap-1 bg-black/60 px-1.5 sm:px-2 py-0.5 rounded-md text-white font-mono text-[9px] sm:text-[10px]">
                              <Video className="w-3 h-3 text-[#A78BFA]" />
                              HD 1080p
                            </span>
                            <span className="bg-black/60 px-1.5 sm:px-2 py-0.5 rounded-md font-mono text-white text-[9px] sm:text-[10px]">
                              0:14
                            </span>
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#7026ED]/90 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                              <Play className="w-4 h-4 ml-0.5" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full bg-[#7026ED] w-1/3 rounded-full" />
                            </div>
                            <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                              <span>0:05</span>
                              <span>0:14</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p
                        className={`text-xs leading-relaxed font-normal ${
                          isLight ? "text-neutral-800" : "text-neutral-200"
                        }`}
                      >
                        Ertaga soat 14:00 da taqdimot videosini ko&apos;rib chiqishni eslat
                      </p>
                    </div>
                  )}

                  {/* OVOZLI TAB */}
                  {activeTab === "voice" && (
                    <div className="space-y-2">
                      <div
                        className={`flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl border transition-colors ${
                          isLight ? "bg-neutral-100/90 border-neutral-200" : "bg-neutral-900/90 border-neutral-800"
                        }`}
                      >
                        <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#7026ED] flex items-center justify-center text-white shrink-0">
                          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                        </button>
                        <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                          <div className="flex items-center gap-0.5 h-5 sm:h-6 overflow-hidden">
                            {[40, 70, 30, 90, 60, 45, 80, 100, 65, 35, 75, 90, 50, 85, 40, 60, 30, 80, 50, 70].map(
                              (h, i) => (
                                <span
                                  key={i}
                                  className={`w-0.5 sm:w-1 rounded-full shrink-0 ${
                                    i < 10
                                      ? isLight
                                        ? "bg-[#7026ED]"
                                        : "bg-[#A78BFA]"
                                      : isLight
                                      ? "bg-neutral-300"
                                      : "bg-neutral-600"
                                  }`}
                                  style={{ height: `${h}%` }}
                                />
                              )
                            )}
                          </div>
                          <div className="flex justify-between text-[9px] sm:text-[10px] text-neutral-400 font-mono">
                            <span>0:05</span>
                            <span>🎙️ Ovozli xabar</span>
                          </div>
                        </div>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isLight ? "text-neutral-800" : "text-neutral-200"
                        }`}
                      >
                        Ertaga soat 10:00 da hisobot topshirishni eslat
                      </p>
                    </div>
                  )}

                  {/* HUJJAT TAB */}
                  {activeTab === "document" && (
                    <div className="space-y-2">
                      <div
                        className={`flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl border transition-colors ${
                          isLight ? "bg-neutral-100/90 border-neutral-200" : "bg-neutral-900/90 border-neutral-800"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                            isLight
                              ? "bg-[#7026ED]/10 border-[#7026ED]/20 text-[#7026ED]"
                              : "bg-[#7026ED]/20 border-[#7026ED]/30 text-[#A78BFA]"
                          }`}
                        >
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="truncate flex-1 min-w-0">
                          <p
                            className={`font-semibold text-xs truncate ${
                              isLight ? "text-neutral-900" : "text-white"
                            }`}
                          >
                            hisobot_yakuniy_2026.pdf
                          </p>
                          <p className="text-[10px] text-neutral-400">2.4 MB • PDF hujjat</p>
                        </div>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isLight ? "text-neutral-800" : "text-neutral-200"
                        }`}
                      >
                        Ertaga kechki payt hisobotni tahlil qilish
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-400">
                    <span>10:45</span>
                    <span className={isLight ? "text-[#7026ED]" : "text-[#A78BFA]"}>✓✓</span>
                  </div>
                </div>
              </div>

              {/* 2. Botning javob kartochkasi (Chap tomonda) */}
              <div className="flex justify-start">
                <div
                  className={`max-w-[96%] sm:max-w-lg w-full p-3.5 sm:p-5 rounded-2xl rounded-tl-sm space-y-3.5 sm:space-y-4 border transition-all ${
                    isLight
                      ? "bg-white border-neutral-200/90 text-neutral-800 shadow-md shadow-neutral-200/40"
                      : "bg-[#12141e] border-neutral-800 text-neutral-200 shadow-lg"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between border-b pb-2.5 sm:pb-3 gap-2 ${
                      isLight ? "border-neutral-100" : "border-neutral-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-5 h-5 rounded-md overflow-hidden bg-white flex items-center justify-center p-0.5 shrink-0 border border-neutral-200">
                        <Image src="/logo.png" alt="Bot" width={20} height={20} className="w-full h-full object-contain" />
                      </div>
                      <span className={`font-bold text-[11px] sm:text-xs ${isLight ? "text-neutral-900" : "text-white"}`}>
                        🧠 Eslatma ko&apos;rinishi
                      </span>
                    </div>
                    <span
                      className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 border ${
                        isLight
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {chatStep === "confirmed" ? "Saqlandi" : chatStep === "editing" ? "Tahrirlashda" : chatStep === "cancelled" ? "Bekor qilindi" : "Rejalashtirishga tayyor"}
                    </span>
                  </div>

                  {/* Keng ma'lumotlar paneli */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                    <div
                      className={`space-y-1.5 sm:space-y-2 p-2.5 sm:p-3 rounded-xl border ${
                        isLight ? "bg-neutral-50/90 border-neutral-200/80" : "bg-neutral-900/60 border-neutral-800/60"
                      }`}
                    >
                      <div>
                        <span className="text-neutral-500 text-[10px] sm:text-[11px] block">📎 Tarkib:</span>
                        <span className={`font-semibold text-[11px] sm:text-xs ${isLight ? "text-neutral-900" : "text-white"}`}>
                          {activeTab === "video" && "🎥 Video (0:14)"}
                          {activeTab === "voice" && "🎙️ Ovozli xabar"}
                          {activeTab === "document" && "📄 Hujjat (hisobot.pdf)"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] sm:text-[11px] block">🎯 Harakat:</span>
                        <span
                          className={`font-medium text-[11px] sm:text-xs ${
                            isLight ? "text-[#7026ED]" : "text-[#C4B5FD]"
                          }`}
                        >
                          {activeTab === "video" && "Taqdimot videosini tahlil qilish"}
                          {activeTab === "voice" && "Hisobotni topshirish"}
                          {activeTab === "document" && "Hujjatni to'liq tekshirish"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`space-y-1.5 sm:space-y-2 p-2.5 sm:p-3 rounded-xl border ${
                        isLight ? "bg-neutral-50/90 border-neutral-200/80" : "bg-neutral-900/60 border-neutral-800/60"
                      }`}
                    >
                      <div className={`flex items-center gap-1.5 text-[11px] sm:text-xs ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                        <Calendar className="w-3.5 h-3.5 text-[#7026ED] shrink-0" />
                        <span className="font-medium">Ertaga, 07-Sentabr</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-[11px] sm:text-xs ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                        <Clock className="w-3.5 h-3.5 text-[#7026ED] shrink-0" />
                        <span className="font-medium">{activeTab === "video" ? "14:00" : "10:00"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-500">
                        <Globe2 className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>Asia/Tashkent (UTC+5)</span>
                      </div>
                    </div>
                  </div>

                  {/* Interaktiv Telegram Inline Tugmalari */}
                  {chatStep === "preview" && (
                    <div className="space-y-2 pt-1">
                      <p className="text-[10px] sm:text-[11px] text-neutral-400 italic">Tugmalardan birini bosing va natijani ko&apos;ring:</p>
                      <button
                        onClick={() => setChatStep("confirmed")}
                        className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-[#7026ED] hover:bg-[#5E1EE5] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                      >
                        <Check className="w-4 h-4" />
                        <span>✅ Ha, rejalashtirilsin</span>
                      </button>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          onClick={() => setChatStep("editing")}
                          className={`py-2 rounded-xl border font-medium transition-colors cursor-pointer active:scale-[0.99] text-center ${
                            isLight
                              ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-800"
                              : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300"
                          }`}
                        >
                          ✏️ O&apos;zgartirish
                        </button>
                        <button
                          onClick={() => setChatStep("cancelled")}
                          className={`py-2 rounded-xl border font-medium transition-colors cursor-pointer active:scale-[0.99] text-center ${
                            isLight
                              ? "bg-neutral-100 hover:bg-rose-50 border-neutral-200 hover:border-rose-200 text-neutral-600 hover:text-rose-600"
                              : "bg-neutral-900 hover:bg-rose-500/10 border-neutral-800 hover:border-rose-500/30 text-neutral-400 hover:text-rose-300"
                          }`}
                        >
                          ❌ Bekor qilish
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="text-right text-[10px] text-neutral-400">10:45</div>
                </div>
              </div>

              {/* 3. Foydalanuvchi bosgan tugma (Faqat bosinganda paydo bo'ladi) */}
              {chatStep !== "preview" && (
                <div className="flex justify-end animate-in fade-in duration-200">
                  <div
                    className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium flex items-center gap-2 max-w-[92%] border ${
                      isLight
                        ? "bg-white border-neutral-200 text-neutral-900 shadow-sm"
                        : "bg-[#171924] border-neutral-700/80 text-white"
                    }`}
                  >
                    {chatStep === "confirmed" && <span>✅ Ha, rejalashtirilsin</span>}
                    {chatStep === "editing" && <span>✏️ O&apos;zgartirish</span>}
                    {chatStep === "cancelled" && <span>❌ Bekor qilish</span>}
                    <span className="text-[10px] text-neutral-400">10:46 ✓✓</span>
                  </div>
                </div>
              )}

              {/* 4. Botning keyingi interaktiv javobi (Next message from bot) */}
              {chatStep === "confirmed" && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    className={`max-w-[96%] sm:max-w-lg w-full p-3.5 sm:p-5 rounded-2xl rounded-tl-sm space-y-3 sm:space-y-3.5 shadow-xl border ${
                      isLight
                        ? "bg-white border-emerald-300 text-neutral-800"
                        : "bg-[#12141e] border-emerald-500/40 text-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Eslatma muvaffaqiyatli saqlandi!</span>
                    </div>

                    <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                      Sizga ertaga soat{" "}
                      <strong className={isLight ? "text-neutral-950" : "text-white"}>
                        {activeTab === "video" ? "14:00" : "10:00"}
                      </strong>{" "}
                      da Telegram orqali eslatma va ilova qilingan faylingiz yetkaziladi.
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setChatStep("preview")}
                        className={`px-3 py-1.5 rounded-lg border font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLight
                            ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-[#7026ED]"
                            : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-[#A78BFA] hover:text-white"
                        }`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Qayta sinash</span>
                      </button>
                      <a
                        href="https://t.me/mindsnaporgbot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#7026ED] hover:bg-[#5E1EE5] text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Botda ishlatish</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="text-right text-[10px] text-neutral-400">10:46</div>
                  </div>
                </div>
              )}

              {chatStep === "editing" && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    className={`max-w-[96%] sm:max-w-lg w-full p-3.5 sm:p-5 rounded-2xl rounded-tl-sm space-y-3 sm:space-y-3.5 shadow-xl border ${
                      isLight
                        ? "bg-white border-purple-300 text-neutral-800"
                        : "bg-[#12141e] border-[#7026ED]/50 text-neutral-200"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 font-bold text-xs ${
                        isLight ? "text-[#7026ED]" : "text-[#C4B5FD]"
                      }`}
                    >
                      <Sliders className="w-4 h-4 shrink-0" />
                      <span>Qaysi parametrni o&apos;zgartirmoqchisiz?</span>
                    </div>

                    <p className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                      O&apos;zgartirmoqchi bo&apos;lgan qiymatingizni tanlang:
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setChatStep("confirmed")}
                        className={`p-2 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                          isLight
                            ? "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                            : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200"
                        }`}
                      >
                        📅 Sanani
                      </button>
                      <button
                        onClick={() => setChatStep("confirmed")}
                        className={`p-2 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                          isLight
                            ? "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                            : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200"
                        }`}
                      >
                        🕐 Vaqtni
                      </button>
                      <button
                        onClick={() => setChatStep("confirmed")}
                        className={`p-2 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                          isLight
                            ? "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                            : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200"
                        }`}
                      >
                        🎯 Harakat matnini
                      </button>
                      <button
                        onClick={() => setChatStep("confirmed")}
                        className={`p-2 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                          isLight
                            ? "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                            : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200"
                        }`}
                      >
                        🔁 Takrorlanishni
                      </button>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <button
                        onClick={() => setChatStep("preview")}
                        className={`text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                          isLight ? "text-neutral-500 hover:text-neutral-900" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Orqaga qaytish</span>
                      </button>
                      <span className="text-[10px] text-neutral-400">10:46</span>
                    </div>
                  </div>
                </div>
              )}

              {chatStep === "cancelled" && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    className={`max-w-[96%] sm:max-w-lg w-full p-3.5 sm:p-5 rounded-2xl rounded-tl-sm space-y-3 sm:space-y-3.5 shadow-xl border ${
                      isLight
                        ? "bg-white border-rose-300 text-neutral-800"
                        : "bg-[#12141e] border-rose-500/40 text-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-xs">
                      <span>❌ Eslatma bekor qilindi</span>
                    </div>

                    <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                      Joriy eslatma bekor qilindi. Yangi eslatma yaratish uchun istalgan vaqtda fayl, video yoki ovozli xabar yuborishingiz mumkin.
                    </p>

                    <div className="pt-1">
                      <button
                        onClick={() => setChatStep("preview")}
                        className={`px-3 py-1.5 rounded-lg border font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLight
                            ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700"
                            : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white"
                        }`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Boshidan sinash</span>
                      </button>
                    </div>
                    <div className="text-right text-[10px] text-neutral-400">10:46</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Imkoniyatlar (Bento Grid) */}
      <section
        id="imkoniyatlar"
        className={`py-14 sm:py-20 px-4 sm:px-6 border-t transition-colors ${
          isLight ? "bg-white border-neutral-200/80" : "bg-[#090a0f] border-neutral-800/80"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-8 sm:mb-12">
            <h2 className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-[#7026ED]">
              Imkoniyatlar
            </h2>
            <p className={`text-xl sm:text-3xl font-bold tracking-tight ${isLight ? "text-neutral-950" : "text-white"}`}>
              Keraksiz qiyinchiliklarsiz xotira boshqaruvi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {/* 1 */}
            <div
              className={`p-4 sm:p-6 rounded-xl border space-y-2.5 sm:space-y-3 transition-all ${
                isLight
                  ? "bg-white border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300"
                  : "bg-[#0e1017] border-neutral-800/80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? "bg-[#7026ED]/10 text-[#7026ED] border-[#7026ED]/20"
                    : "bg-[#7026ED]/15 text-[#A78BFA] border-[#7026ED]/30"
                }`}
              >
                <Mic className="w-4 h-4" />
              </div>
              <h3 className={`text-sm sm:text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Ovozli tahlil (Gemini Flash)
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                Klaviaturada matn yozish shart emas. Ovozli xabaringizni eshitib, nima vazifaligi va qachon eslatish kerakligini sun&apos;iy intellekt o&apos;zi ajratib oladi.
              </p>
            </div>

            {/* 2 */}
            <div
              className={`p-4 sm:p-6 rounded-xl border space-y-2.5 sm:space-y-3 transition-all ${
                isLight
                  ? "bg-white border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300"
                  : "bg-[#0e1017] border-neutral-800/80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? "bg-[#7026ED]/10 text-[#7026ED] border-[#7026ED]/20"
                    : "bg-[#7026ED]/15 text-[#A78BFA] border-[#7026ED]/30"
                }`}
              >
                <Video className="w-4 h-4" />
              </div>
              <h3 className={`text-sm sm:text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Barcha turdagi videolar
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                Telegram&apos;dagi oddiy video kliplarni hamda davra ko&apos;rinishidagi video xabarlarni to&apos;g&apos;ridan-to&apos;g&apos;ri saqlaydi va vaqti kelganda yetkazadi.
              </p>
            </div>

            {/* 3 */}
            <div
              className={`p-4 sm:p-6 rounded-xl border space-y-2.5 sm:space-y-3 transition-all ${
                isLight
                  ? "bg-white border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300"
                  : "bg-[#0e1017] border-neutral-800/80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? "bg-[#7026ED]/10 text-[#7026ED] border-[#7026ED]/20"
                    : "bg-[#7026ED]/15 text-[#A78BFA] border-[#7026ED]/30"
                }`}
              >
                <Repeat className="w-4 h-4" />
              </div>
              <h3 className={`text-sm sm:text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Davriy va takroriy eslatmalar
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                Bir martalik eslatmalar bilan birga, har kuni, har hafta yoki har oy muntazam takrorlanadigan tsikllarni osongina sozlang.
              </p>
            </div>

            {/* 4 */}
            <div
              className={`p-4 sm:p-6 rounded-xl border space-y-2.5 sm:space-y-3 transition-all ${
                isLight
                  ? "bg-white border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300"
                  : "bg-[#0e1017] border-neutral-800/80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? "bg-[#7026ED]/10 text-[#7026ED] border-[#7026ED]/20"
                    : "bg-[#7026ED]/15 text-[#A78BFA] border-[#7026ED]/30"
                }`}
              >
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className={`text-sm sm:text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                To&apos;liq bot ichida boshqaruv
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                /reminders orqali faol eslatmalarni ko&apos;ring, /edit bilan sana va vaqtni o&apos;zgartiring, /delete orqali esa istalganini bekor qiling.
              </p>
            </div>

            {/* 5 */}
            <div
              className={`p-4 sm:p-6 rounded-xl border space-y-2.5 sm:space-y-3 transition-all ${
                isLight
                  ? "bg-white border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300"
                  : "bg-[#0e1017] border-neutral-800/80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? "bg-[#7026ED]/10 text-[#7026ED] border-[#7026ED]/20"
                    : "bg-[#7026ED]/15 text-[#A78BFA] border-[#7026ED]/30"
                }`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <h3 className={`text-sm sm:text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Barcha turdagi fayllar
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                PDF kitoblar, jadvallar, audio fayllar va fotolarni xotiraga oling. Kerakli vaqtda fayl bilan birga eslatma olasiz.
              </p>
            </div>

            {/* 6 */}
            <div
              className={`p-4 sm:p-6 rounded-xl border space-y-2.5 sm:space-y-3 transition-all ${
                isLight
                  ? "bg-white border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300"
                  : "bg-[#0e1017] border-neutral-800/80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isLight
                    ? "bg-[#7026ED]/10 text-[#7026ED] border-[#7026ED]/20"
                    : "bg-[#7026ED]/15 text-[#A78BFA] border-[#7026ED]/30"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className={`text-sm sm:text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Xavfsiz va ishonchli xotira
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                Barcha yozuvlar va fayllar shaxsiy bulut xotirasida saqlanadi. Qurilmangizni almashtirsangiz ham ma&apos;lumotlar yo&apos;qolmaydi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ishlash tartibi (Minimalist & Accurate) */}
      <section
        id="ishlash-tartibi"
        className={`py-16 sm:py-24 px-4 sm:px-6 border-t transition-colors ${
          isLight ? "bg-white border-neutral-200/80" : "bg-[#090a0f] border-neutral-800/80"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-10 sm:mb-14">
            <h2 className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-[#7026ED]">
              Ishlash tartibi
            </h2>
            <p className={`text-xl sm:text-3xl font-bold tracking-tight ${isLight ? "text-neutral-950" : "text-white"}`}>
              Uch qadamda eslatma yarating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* 01 */}
            <div
              className={`p-6 sm:p-7 rounded-2xl border transition-all space-y-3 ${
                isLight
                  ? "bg-neutral-50/50 border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50"
                  : "bg-[#0e1017] border-neutral-800/80 hover:border-neutral-700 hover:bg-[#11141e]"
              }`}
            >
              <span className="text-xs font-mono font-bold text-[#7026ED] tracking-wider block">
                01
              </span>
              <h3 className={`text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Xabarni yuboring
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                Botga ovozli xabar, video yoki hujjat yuboring. Klaviaturada uzun matn yozish shart emas.
              </p>
            </div>

            {/* 02 */}
            <div
              className={`p-6 sm:p-7 rounded-2xl border transition-all space-y-3 ${
                isLight
                  ? "bg-neutral-50/50 border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50"
                  : "bg-[#0e1017] border-neutral-800/80 hover:border-neutral-700 hover:bg-[#11141e]"
              }`}
            >
              <span className="text-xs font-mono font-bold text-[#7026ED] tracking-wider block">
                02
              </span>
              <h3 className={`text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Vaqtni ayting
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                Ovoz bilan ayting (masalan: «Ertaga soat 10 da») yoki tugmalardan qulay vaqtni tanlang.
              </p>
            </div>

            {/* 03 */}
            <div
              className={`p-6 sm:p-7 rounded-2xl border transition-all space-y-3 ${
                isLight
                  ? "bg-neutral-50/50 border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50"
                  : "bg-[#0e1017] border-neutral-800/80 hover:border-neutral-700 hover:bg-[#11141e]"
              }`}
            >
              <span className="text-xs font-mono font-bold text-[#7026ED] tracking-wider block">
                03
              </span>
              <h3 className={`text-base font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                Eslatmani oling
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                Belgilangan vaqtda bot Telegram orqali xabarnoma va faylingizni asl sifatda yetkazadi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buyruqlar ro'yxati */}
      <section
        id="buyruqlar"
        className={`py-14 sm:py-20 px-4 sm:px-6 border-t transition-colors ${
          isLight ? "bg-white border-neutral-200/80" : "border-neutral-800/80"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-10">
            <h2 className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-[#7026ED]">
              Buyruqlar
            </h2>
            <p className={`text-xl sm:text-3xl font-bold tracking-tight ${isLight ? "text-neutral-950" : "text-white"}`}>
              Bot boshqaruv buyruqlari.
            </p>
            <p className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
              Nusxalash uchun buyruq ustiga bosing.
            </p>
          </div>

          <div
            className={`rounded-xl border divide-y overflow-hidden transition-all ${
              isLight
                ? "border-neutral-200/90 bg-white divide-neutral-200/80 shadow-sm"
                : "border-neutral-800 bg-[#0e1017] divide-neutral-800/80"
            }`}
          >
            {commands.map((item) => (
              <div
                key={item.cmd}
                onClick={() => copyCommand(item.cmd)}
                className={`p-3 sm:px-5 flex items-center justify-between transition-colors cursor-pointer group gap-3 ${
                  isLight ? "hover:bg-neutral-50" : "hover:bg-neutral-800/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7026ED] shrink-0" />
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      {item.cmd}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs pl-6 sm:pl-0 sm:text-right leading-tight sm:leading-normal ${
                      isLight ? "text-neutral-600" : "text-neutral-400"
                    }`}
                  >
                    {item.desc}
                  </span>
                </div>
                <div
                  className={`p-1 sm:p-1.5 rounded border shrink-0 transition-colors ${
                    isLight
                      ? "bg-neutral-100 border-neutral-200 text-neutral-600 group-hover:text-neutral-950"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 group-hover:text-white"
                  }`}
                >
                  {copiedCmd === item.cmd ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savol-javoblar (FAQ) */}
      <section
        id="savollar"
        className={`py-14 sm:py-20 px-4 sm:px-6 border-t transition-colors ${
          isLight ? "bg-[#F8F9FD] border-neutral-200/80" : "border-neutral-800/80 bg-[#0c0d14]"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-10">
            <h2 className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-[#7026ED]">
              Savol-javoblar
            </h2>
            <p className={`text-xl sm:text-3xl font-bold tracking-tight ${isLight ? "text-neutral-950" : "text-white"}`}>
              Ko&apos;p beriladigan savollar.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-lg border overflow-hidden transition-all ${
                  isLight ? "border-neutral-200/90 bg-white shadow-sm" : "border-neutral-800 bg-[#0e1017]"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isLight ? "hover:bg-neutral-50" : "hover:bg-neutral-800/30"
                  }`}
                >
                  <span className={`font-medium text-xs sm:text-sm leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${
                      openFaq === idx ? `rotate-180 ${isLight ? "text-[#7026ED]" : "text-[#A78BFA]"}` : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div
                    className={`px-4 sm:px-5 pb-3.5 text-xs sm:text-sm leading-relaxed border-t pt-2.5 ${
                      isLight ? "border-neutral-100 text-neutral-600" : "border-neutral-800/60 text-neutral-400"
                    }`}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastki CTA qismi */}
      <section
        className={`py-14 sm:py-20 px-4 sm:px-6 border-t text-center transition-colors ${
          isLight ? "bg-white border-neutral-200/80" : "border-neutral-800/80"
        }`}
      >
        <div className="max-w-xl mx-auto space-y-4 sm:space-y-5">
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl mx-auto overflow-hidden bg-white p-1 flex items-center justify-center border ${
              isLight ? "border-neutral-200 shadow-sm" : "border-white/20 shadow-md"
            }`}
          >
            <Image
              src="/logo.png"
              alt="MindSnap"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className={`text-xl sm:text-3xl font-bold tracking-tight ${isLight ? "text-neutral-950" : "text-white"}`}>
            MindSnap bilan rejalashtirishni boshlang.
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
            Telegram orqali xohlagan vaqtda foydalaning. Hech qanday ro&apos;yxatdan o&apos;tish yoki murakkab sozlashlar talab qilinmaydi.
          </p>
          <div className="pt-1">
            <a
              href="https://t.me/mindsnaporgbot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold bg-[#7026ED] hover:bg-[#5E1EE5] text-white px-6 sm:px-7 py-3 rounded-xl sm:rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@mindsnaporgbot ga o&apos;tish</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-8 px-4 sm:px-6 text-xs transition-colors ${
          isLight ? "border-neutral-200/80 bg-[#F4F5F8] text-neutral-600" : "border-neutral-800/80 bg-[#07080b] text-neutral-500"
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div
              className={`w-6 h-6 rounded-md overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-sm shrink-0 border ${
                isLight ? "border-neutral-200" : "border-white/20"
              }`}
            >
              <Image src="/logo.png" alt="MindSnap" width={24} height={24} className="w-full h-full object-contain" />
            </div>
            <span className={`font-semibold ${isLight ? "text-neutral-900" : "text-neutral-300"}`}>MindSnap</span>
            <span>•</span>
            <span>Telegram orqali aqlli eslatmalar</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://t.me/mindsnaporgbot"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isLight ? "hover:text-neutral-950" : "hover:text-neutral-300"}`}
            >
              Telegram bot
            </a>
            <a
              href="https://github.com/OtabekAbduvaliyev/MindSnap"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isLight ? "hover:text-neutral-950" : "hover:text-neutral-300"}`}
            >
              GitHub
            </a>
          </div>

          <div>
            <span>© 2026 MindSnap. Barcha huquqlar himoyalangan.</span>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
