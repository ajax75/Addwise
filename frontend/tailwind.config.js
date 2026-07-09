/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      /* ------------------------------------------------------------------ *
       * Design system — single source of truth for type, color & fonts.
       * The font scale below is intentionally ~1 step larger than Tailwind's
       * defaults, so every existing text-* utility across the whole project
       * grows without touching each component.
       * ------------------------------------------------------------------ */
      colors: {
        accent: "#3BA7FF",
        ink: "#0B0B0B",
        surface: "#F9FAFB",
        muted: "#4B5563"
      },
      fontFamily: {
        heading: ["Geist", "ui-sans-serif", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.15rem" }],     // 13px (was 12)
        sm: ["0.9375rem", { lineHeight: "1.4rem" }],      // 15px (was 14)
        base: ["1.0625rem", { lineHeight: "1.75rem" }],   // 17px (was 16)
        lg: ["1.1875rem", { lineHeight: "1.85rem" }],     // 19px (was 18)
        xl: ["1.375rem", { lineHeight: "1.95rem" }],      // 22px (was 20)
        "2xl": ["1.625rem", { lineHeight: "2.1rem" }],    // 26px (was 24)
        "3xl": ["2rem", { lineHeight: "2.4rem" }],        // 32px (was 30)
        "4xl": ["2.5rem", { lineHeight: "2.75rem" }],     // 40px (was 36)
        "5xl": ["3.25rem", { lineHeight: "1.1" }],        // 52px (was 48)
        "6xl": ["4rem", { lineHeight: "1.05" }],          // 64px (was 60)
        "7xl": ["4.75rem", { lineHeight: "1.05" }],       // 76px (was 72)
        "8xl": ["6.25rem", { lineHeight: "1" }]           // 100px (was 96)
      }
    }
  },
  plugins: []
};
