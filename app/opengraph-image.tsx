import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "MindSnap — Ovozli va aqlli eslatmalar Telegram boti";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090a0f",
          backgroundImage: "radial-gradient(circle at 50% 30%, #1e1338 0%, #090a0f 70%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.4,
          }}
        />

        {/* Outer card box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(14, 16, 23, 0.85)",
            border: "1px solid rgba(112, 38, 237, 0.4)",
            borderRadius: "32px",
            padding: "50px 70px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(112, 38, 237, 0.2)",
            textAlign: "center",
            maxWidth: "1080px",
            width: "100%",
          }}
        >
          {/* Header Row: Logo & Bot Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoBase64}
                alt="MindSnap"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "42px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              MindSnap
            </span>
            <span
              style={{
                backgroundColor: "rgba(112, 38, 237, 0.25)",
                color: "#C4B5FD",
                border: "1px solid rgba(112, 38, 237, 0.4)",
                padding: "6px 16px",
                borderRadius: "12px",
                fontSize: "20px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Bot
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "46px",
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
              marginBottom: "18px",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Ovozli va aqlli eslatmalar Telegram boti
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.5,
              color: "#94a3b8",
              margin: 0,
              marginBottom: "36px",
              maxWidth: "800px",
            }}
          >
            Telegram orqali ovozli xabarlar, dumaloq videolar va fayllarni saqlang. Google Gemini AI keraksiz qiyinchiliklarsiz eslatadi.
          </p>

          {/* Footer Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#7026ED",
                color: "#ffffff",
                padding: "12px 28px",
                borderRadius: "100px",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              <span>@mindsnaporgbot</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#e2e8f0",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              <span>✨ Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
