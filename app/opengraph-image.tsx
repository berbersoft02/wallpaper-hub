import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 60%, #0a0a0a 100%)",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              "linear-gradient(90deg, transparent 0%, #05d9e8 30%, #ff2a6d 70%, transparent 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#05d9e8",
            letterSpacing: 4,
            textShadow: "0 0 24px rgba(5, 217, 232, 0.6)",
            display: "flex",
          }}
        >
          Only_Gohan Ocean
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#ff2a6d",
            marginTop: 32,
            letterSpacing: 2,
            display: "flex",
          }}
        >
          Ultra HD 4K Anime Wallpapers
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            fontSize: 22,
            color: "#a78bfa",
            letterSpacing: 6,
            display: "flex",
          }}
        >
          saidahriken.site
        </div>
      </div>
    ),
    { ...size }
  );
}
