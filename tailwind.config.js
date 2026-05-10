/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ggg: {
          bg: "var(--ggg-bg)",
          panel: "var(--ggg-panel)",
          "panel-strong": "var(--ggg-panel-strong)",
          border: "var(--ggg-border)",
          "border-strong": "var(--ggg-border-strong)",
          text: "var(--ggg-text)",
          muted: "var(--ggg-muted)",
          dim: "var(--ggg-dim)",
          accent: "var(--ggg-accent)",
          "accent-glow": "var(--ggg-accent-glow)",
          "accent-soft": "var(--ggg-accent-soft)",
          "accent-border": "var(--ggg-accent-border)",
          "accent-border-strong": "var(--ggg-accent-border-strong)",
          live: "var(--ggg-live)",
          "live-dim": "var(--ggg-live-dim)",
        },
      },
      maxWidth: {
        ggg: "var(--ggg-max)",
      },
      spacing: {
        ggg: "var(--ggg-pad)",
        4.5: "18px",
        5.5: "22px",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "ggg-hero": ["clamp(80px, 11vw, 160px)", { lineHeight: "0.88", letterSpacing: "0.01em" }],
        "ggg-section": ["clamp(44px, 4.8vw, 72px)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "ggg-page": ["clamp(44px, 5vw, 76px)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "ggg-contact": ["clamp(48px, 5vw, 80px)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "ggg-studio": ["clamp(48px, 5vw, 76px)", { lineHeight: "0.9", letterSpacing: "0.02em" }],
        "ggg-metric": ["clamp(22px, 3.4vw, 42px)", { lineHeight: "1", letterSpacing: "0.02em" }],
        "ggg-media-stat": ["clamp(56px, 7vw, 84px)", { lineHeight: "0.92", letterSpacing: "0.01em" }],
        "ggg-body": ["15px", { lineHeight: "1.65" }],
        "ggg-body-sm": ["13px", { lineHeight: "1.6" }],
        "ggg-body-xs": ["12.5px", { lineHeight: "1.5" }],
        "ggg-label": ["10.5px", { lineHeight: "1.35", letterSpacing: "0.14em" }],
        "ggg-eyebrow": ["10px", { lineHeight: "1.3", letterSpacing: "0.2em" }],
      },
      borderRadius: {
        "ggg-sm": "6px",
        ggg: "11px",
        "ggg-md": "14px",
        "ggg-lg": "18px",
      },
      boxShadow: {
        "ggg-card": "0 8px 32px rgba(0,0,0,0.55)",
        "ggg-card-hover":
          "0 24px 64px rgba(0,0,0,0.75), 0 0 40px rgba(0,0,0,0.4)",
      },
      keyframes: {
        landingTicker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        livePulse: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.45",
            transform: "scale(0.8)",
          },
        },
      },
      animation: {
        "landing-ticker": "landingTicker 38s linear infinite",
        "live-pulse": "livePulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
