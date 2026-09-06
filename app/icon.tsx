import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default function Icon() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "3px",
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
    ),
    {
      ...size,
    }
  );
}
