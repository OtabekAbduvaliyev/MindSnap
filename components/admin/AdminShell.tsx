"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BellRing,
  Image as ImageIcon,
  Send,
  Activity,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ArrowUpRight,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { logoutAdminAction } from "@/app/admin/actions";

interface AdminShellProps {
  children: React.ReactNode;
  adminEmail?: string;
}

export default function AdminShell({
  children,
  adminEmail = "otabekabduvaliyev1910@gmail.com",
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // false = kengaytirilgan (full), true = ixchamlashtirilgan (faqat ikonalar ko'rinadi)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Saqlangan holatni localStorage orqali yuklash va html classiga qo'llash
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem("mindsnap_admin_sidebar_collapsed");
      if (savedCollapsed !== null) {
        setIsCollapsed(savedCollapsed === "true");
      }
      const savedTheme = localStorage.getItem("mindsnap_theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // localStorage xatolik berishi mumkin bo'lgan holatlar uchun
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("mindsnap_admin_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("mindsnap_theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
    } catch {}
  };

  const handleGlobalSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem("q") as HTMLInputElement)?.value.trim();
    if (q) {
      router.push(`/admin/reminders?search=${encodeURIComponent(q)}`);
    }
  };

  // Agar login sahifasida bo'lsa, to'liq ekranli oyna chiqariladi
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin", label: "Boshqaruv paneli", icon: LayoutDashboard, exact: true },
    { href: "/admin/users", label: "Foydalanuvchilar", icon: Users },
    { href: "/admin/reminders", label: "Eslatmalar va Tsikllar", icon: BellRing },
    { href: "/admin/memories", label: "Xotiralar va Fayllar", icon: ImageIcon },
    { href: "/admin/broadcast", label: "Xabarnoma yuborish", icon: Send },
    { href: "/admin/system", label: "Tizim holati", icon: Activity },
  ];

  const currentNavItem = navItems.find((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)
  );
  const currentTitle = currentNavItem ? currentNavItem.label : "Boshqaruv";

  // Yon panel to'liq kenglikdagi tarkibi (Expanded)
  const FullSidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col justify-between h-full select-none w-full bg-white dark:bg-[#0c1017]">
      <div>
        {/* Brand & Logo Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between gap-2">
          <Link
            href="/admin"
            onClick={() => isMobile && setMobileNavOpen(false)}
            className="flex items-center gap-3 min-w-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="MindSnap Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight">
                  MindSnap
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#7026ED]/10 dark:bg-[#7026ED]/20 text-[#7026ED] dark:text-[#A78BFA] border border-[#7026ED]/20 dark:border-[#7026ED]/30 shrink-0">
                  Admin
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold whitespace-nowrap">
                  Bot Faol
                </span>
              </div>
            </div>
          </Link>

          {/* Yopish / Kichraytirish tugmasi */}
          {isMobile ? (
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              title="Yopish"
              aria-label="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              title="Panelni ixchamlashtirish (faqat ikonalar)"
              aria-label="Panelni ixchamlashtirish"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigatsiya Havolalari */}
        <div className="px-3.5 py-4 space-y-1">
          <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-3 mb-2">
            Bo&apos;limlar
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? "bg-[#7026ED] text-white shadow-xs font-semibold"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/90 dark:hover:bg-[#161e2e]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Tashqi havolalar (Veb-sahifa & Telegram Bot) */}
          <div className="pt-4 mt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-1">
            <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-3 mb-2">
              Tezkor havolalar
            </p>
            <a
              href="https://t.me/mindsnaporgbot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#161e2e] transition-colors"
            >
              <span className="truncate">Telegram bot (@mindsnaporgbot)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            </a>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#161e2e] transition-colors"
            >
              <span className="truncate">Asosiy veb-sahifa</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Profil va Chiqish (Pastki panel) */}
      <div className="p-3.5 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-[#090d14]/70 space-y-2.5">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-[#121824] border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#7026ED]/10 dark:bg-[#7026ED]/20 border border-[#7026ED]/20 dark:border-[#7026ED]/30 flex items-center justify-center text-[#7026ED] dark:text-[#A78BFA] shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="truncate min-w-0">
            <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{adminEmail}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              Super Admin
            </p>
          </div>
        </div>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Tizimdan chiqish</span>
          </button>
        </form>
      </div>
    </div>
  );

  // Yon panel faqat piktogrammalar (Collapsed / Shrunk) ko'rinishi
  const ShrunkSidebarContent = () => (
    <div className="flex flex-col justify-between h-full select-none w-full py-4 px-2 items-center bg-white dark:bg-[#0c1017]">
      <div className="w-full flex flex-col items-center space-y-5">
        {/* MindSnap Logo & Bot Online nuqtasi */}
        <div className="relative group">
          <Link
            href="/admin"
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-105 transition-transform"
            title="MindSnap Boshqaruv Paneli"
          >
            <Image
              src="/logo.png"
              alt="MindSnap Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </Link>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#0c1017] rounded-full animate-pulse"
            title="Bot Faol"
          />
        </div>

        {/* Panelni kengaytirish tugmasi */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-neutral-400 hover:text-[#7026ED] dark:hover:text-[#A78BFA] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Panelni to'liq ochish"
          aria-label="Panelni to'liq ochish"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>

        {/* Navigatsiya ikonalari */}
        <nav className="flex flex-col gap-1.5 w-full items-center">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative ${
                  isActive
                    ? "bg-[#7026ED] text-white shadow-xs font-semibold"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Pastki profil va chiqish ikonalari */}
      <div className="w-full flex flex-col items-center gap-2 pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div
          className="w-9 h-9 rounded-xl bg-[#7026ED]/10 dark:bg-[#7026ED]/20 border border-[#7026ED]/20 dark:border-[#7026ED]/30 flex items-center justify-center text-[#7026ED] dark:text-[#A78BFA]"
          title={`${adminEmail} (Super Admin)`}
        >
          <ShieldCheck className="w-4 h-4" />
        </div>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            title="Tizimdan chiqish"
            aria-label="Tizimdan chiqish"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark bg-[#080b11] text-neutral-100" : "bg-[#FAF9FD] text-neutral-800"} antialiased overflow-hidden font-sans selection:bg-[#7026ED]/20 selection:text-[#7026ED] transition-colors duration-200`}>
      {/* Desktop Sidebar (Yig'ilganda yo'qolib ketmaydi, balki ixcham ikonalar rejimiga o'tadi) */}
      <aside
        className={`hidden lg:flex flex-col justify-between bg-white dark:bg-[#0c1017] border-r border-neutral-200/90 dark:border-neutral-800/80 shadow-2xs z-20 shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[68px]" : "w-64 xl:w-72"
        }`}
      >
        {isCollapsed ? <ShrunkSidebarContent /> : <FullSidebarContent />}
      </aside>

      {/* Mobil Drawer Backdrop & Slide-in menyu */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex"
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            className="w-72 sm:w-80 max-w-[85vw] bg-white dark:bg-[#0c1017] h-full shadow-2xl animate-in slide-in-from-left duration-200 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FullSidebarContent isMobile />
          </div>
        </div>
      )}

      {/* Asosiy Ish Maydoni (Viewport) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Doimiy Top Bar (Mukammal va toza sayqallangan dizayn) */}
        <header className="h-16 bg-white/95 dark:bg-[#0c1017]/95 border-b border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shadow-2xs shrink-0 z-10 transition-colors">
          {/* Chap qism: Mobil menyu yoki Desktop Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobil Burger Tugmasi */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-neutral-100/80 dark:bg-[#121824] hover:bg-neutral-100 dark:hover:bg-[#182030] text-neutral-800 dark:text-neutral-100 border border-neutral-200/60 dark:border-neutral-700/80 shadow-2xs active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label="Menyu"
            >
              <Menu className="w-4 h-4 text-[#7026ED] dark:text-[#A78BFA]" />
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Menyu</span>
            </button>

            {/* Mobil Logo */}
            <div className="flex lg:hidden items-center gap-2 pl-1 min-w-0 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#121824] border border-neutral-200 dark:border-neutral-700 p-0.5 flex items-center justify-center shrink-0">
                <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">
                MindSnap
              </span>
            </div>

            {/* Desktop Breadcrumb ko'rsatkichi */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 min-w-0">
              <span className="font-medium text-neutral-500 dark:text-neutral-400">MindSnap</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600 shrink-0" />
              <span className="font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-[#121824] border border-neutral-200/60 dark:border-neutral-800 px-2.5 py-1 rounded-lg text-xs truncate">
                {currentTitle}
              </span>
            </div>
          </div>

          {/* O'rta qism: Universal Tezkor Qidiruv */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-2">
            <form onSubmit={handleGlobalSearch} className="relative w-full">
              <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="q"
                placeholder="Telegram ID yoki eslatma qidirish..."
                className="w-full h-9 pl-9 pr-8 bg-neutral-50/90 dark:bg-[#121824] hover:bg-neutral-100/70 dark:hover:bg-[#161e2e] focus:bg-white dark:focus:bg-[#0f141f] border border-neutral-200/90 dark:border-neutral-700/80 rounded-xl text-xs text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#7026ED] focus:ring-2 focus:ring-[#7026ED]/15 transition-all shadow-2xs"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-neutral-400 dark:text-neutral-500 bg-white dark:bg-[#0c1017] border border-neutral-200/90 dark:border-neutral-700/80 px-1 py-0.5 rounded shadow-2xs pointer-events-none">
                ↵
              </kbd>
            </form>
          </div>

          {/* O'ng qism: Mavzu almashtirgich, Bot holati va Profil */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Mavzuni almashtirish tugmasi (Theme Toggler) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="h-9 px-2.5 sm:px-3 rounded-xl bg-white dark:bg-[#121824] hover:bg-neutral-50 dark:hover:bg-[#182030] text-neutral-700 dark:text-neutral-200 text-xs font-semibold border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title={theme === "light" ? "Qorong'i rejimga o'tish" : "Yorug' rejimga o'tish"}
              aria-label="Mavzuni almashtirish"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#7026ED]" />
                  <span className="hidden sm:inline">Tungi rejim</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Kunduzgi rejim</span>
                </>
              )}
            </button>

            {/* Bot Faol nishoni */}
            <div className="h-9 px-2.5 sm:px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 whitespace-nowrap shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Bot Faol</span>
              <span className="sm:hidden">Faol</span>
            </div>

            {/* Admin profil nishoni (Katta ekranlar uchun) */}
            <div className="hidden xl:flex items-center gap-2 h-9 px-3 rounded-xl bg-white dark:bg-[#121824] border border-neutral-200/90 dark:border-neutral-700/80 text-xs shadow-2xs">
              <div className="w-5 h-5 rounded-md bg-[#7026ED]/10 dark:bg-[#7026ED]/20 text-[#7026ED] dark:text-[#A78BFA] flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium truncate max-w-[130px]">{adminEmail}</span>
            </div>
          </div>
        </header>

        {/* Asosiy kontent maydoni */}
        <main className="flex-1 overflow-y-auto bg-[#FAF9FD] dark:bg-[#080b11] p-3.5 sm:p-6 lg:p-8 transition-colors">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
