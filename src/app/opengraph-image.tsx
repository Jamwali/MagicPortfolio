import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ishaan Jamwal — machine learning and full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#f7f7f8",
          background: "#09090b",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, color: "#a1a1aa" }}>
          <span>Ishaan Jamwal</span>
          <span>Hamilton, Canada</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, fontSize: 22, color: "#a1a1aa" }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ff6f8a" }} />
            Models → systems → useful products
          </div>
          <div style={{ maxWidth: 980, fontSize: 76, lineHeight: 0.98, letterSpacing: "-4px", fontWeight: 700 }}>
            Machine learning, built all the way through.
          </div>
        </div>
        <div style={{ display: "flex", gap: 42, fontSize: 24, color: "#d4d4d8" }}>
          <span>Computer vision</span>
          <span>Local LLMs</span>
          <span>Full-stack systems</span>
        </div>
      </div>
    ),
    size,
  );
}
