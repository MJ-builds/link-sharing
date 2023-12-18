import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        instrument: ["Instrument Sans", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      boxShadow: {
        "input-shadow": "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
