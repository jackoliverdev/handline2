/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // shadcn/ui system colors - Used by the UI components
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F08515",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F5EFE0",
          foreground: "#1E1E1E",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // BRAND COLOR PALETTE
        // HandLine Company colour scheme
        brand: {
          // PRIMARY COLORS
          primary: "#F08515",     // Primary Orange - Main brand colour
          dark: "#1E1E1E",        // Dark Grey - For headings and primary text
          light: "#F5EFE0",       // Light Beige - For backgrounds and subtle highlights
          white: "#FFFFFF",       // White - For backgrounds and contrast
          secondary: "#5A5A5A",   // Secondary Grey - For secondary text
          
          // SEMANTIC COLORS
          success: "#36B37E",     // Green - Confirmations, completions, positive actions
          warning: "#FFAB00",     // Orange - Alerts, warnings, needs attention
          error: "#FF5630",       // Red - Errors, destructive actions, critical issues
          info: "#2684FF",        // Blue - Information, help, neutral notifications
        }
      },
      
      // BRAND TYPOGRAPHY SYSTEM
      fontSize: {
        // Standard Tailwind font sizes with adjusted configurations to match site design
        'xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        'sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'base': ['1rem', { lineHeight: '1.75', fontWeight: '400' }],
        'lg': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'xl': ['1.25rem', { lineHeight: '1.75', fontWeight: '400' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        '5xl': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}