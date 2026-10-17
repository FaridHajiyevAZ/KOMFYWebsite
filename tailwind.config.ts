import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        komfy: {
          bg: "#E8E3DA", // page background
          surface: "#F4F0E9", // main container
          panel: "#F9F6F1", // alt sections
          card: "#FFFDF9", // cards
          highlight: "#F2EFE7", // compare highlight column
          ink: "#1B1B16", // near-black / footer
          green: "#2F3B33", // primary dark green
          greenSoft: "#46564A",
          gold: "#9C7A45", // accent
          goldSoft: "#B49B6E", // accent on dark
          line: "#E2DACD", // hairline borders
          line2: "#D6CEC0",
          border: "#C8BFAF", // button outlines
          text: "#1B1B16",
          text2: "#3C382F",
          text3: "#5A564D",
          muted: "#6E6A60",
          muted2: "#8A8375",
          onDark: "#EDE8DE",
          onDark2: "#C3BDB0",
          onDark3: "#A9A296",
          // Admin panel
          sidebar: "#242A24",
          sidebarLine: "#333B33",
          sidebarMuted: "#8C877B",
          sidebarLabel: "#6E6A5F",
          rowAlt: "#F6F2EA",
        },
        // B2B rebrand (istehsalçı sayt)
        b2b: {
          bg: "#F6F1EA",
          band: "#EDE7DC",
          ink: "#211E1B",
          ink2: "#1A1712",
          brown: "#7A4E34",
          brownDark: "#5c3a26",
          tan: "#A37964",
          text2: "#4A443C",
          muted: "#8B8378",
          muted2: "#6B6259",
          line: "#DDD4C4",
          footer: "#D9D2C6",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        karla: ["var(--font-karla)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
      letterSpacing: {
        wordmark: "0.32em",
      },
    },
  },
  plugins: [],
};

export default config;
