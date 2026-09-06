import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const dystopianFont = localFont({
  src: [
    {
      path: "./fonts/fonnts.com-Dystopian_Ligth.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Dystopian_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Dystopian_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Dystopian_Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-dystopian",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mindsnap.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MindSnap — Ovozli va aqlli eslatmalar Telegram boti",
    template: "%s | MindSnap",
  },
  description:
    "Telegram orqali ovozli xabarlar, dumaloq videolar, hujjat va rasmlarni saqlang. Gemini AI kerakli vaqtda eslatadi.",
  keywords: [
    "Telegram Bot",
    "MindSnap",
    "MindSnap Bot",
    "mindsnaporgbot",
    "Ovozli eslatma",
    "Spaced Repetition",
    "Gemini AI",
    "Telegram eslatma boti",
    "O'zbekcha Telegram bot",
    "Ovozli xabar eslatma",
    "Dumaloq video saqlash",
    "Smart reminders",
  ],
  authors: [{ name: "MindSnap Team", url: "https://t.me/mindsnaporgbot" }],
  creator: "MindSnap Team",
  publisher: "MindSnap",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: siteUrl,
    title: "MindSnap — Ovozli va aqlli eslatmalar Telegram boti",
    description:
      "Telegram orqali ovozli xabarlar, dumaloq videolar va fayllarni saqlang. Google Gemini AI keraksiz qiyinchiliklarsiz eslatadi.",
    siteName: "MindSnap",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MindSnap — Ovozli va aqlli eslatmalar Telegram boti",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindSnap — Ovozli va aqlli eslatmalar Telegram boti",
    description:
      "Telegram orqali ovozli xabarlar, dumaloq videolar va fayllar. Google Gemini AI bilan aqlli eslatmalar.",
    site: "@mindsnaporgbot",
    creator: "@mindsnaporgbot",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/logo.png",
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MindSnap",
    alternateName: "MindSnap Telegram Bot",
    operatingSystem: "Telegram",
    applicationCategory: "UtilitiesApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Telegram orqali ovozli xabarlar, dumaloq videolar va fayllarni saqlang. Google Gemini AI keraksiz qiyinchiliklarsiz eslatadi.",
    url: siteUrl,
    sameAs: ["https://t.me/mindsnaporgbot"],
    author: {
      "@type": "Organization",
      name: "MindSnap",
      url: siteUrl,
    },
  };

  return (
    <html
      lang="uz"
      className={`${dystopianFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
