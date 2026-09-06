import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MindSnap — Ovozli va aqlli eslatmalar Telegram boti",
    short_name: "MindSnap",
    description:
      "Telegram orqali ovozli xabarlar, dumaloq videolar, hujjat va rasmlarni saqlang. Gemini AI kerakli vaqtda eslatadi.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7026ED",
    icons: [
      {
        src: "/icon",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
