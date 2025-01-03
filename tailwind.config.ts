import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            screens: {
                "2xl": "1440px",
            }
        },
        extend: {
            screens: {
                xs: '300px', // Custom xs breakpoint for min-width of 300px
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                selection: {
                    DEFAULT: '#000000',
                    dark: '#ffffff',
                },
                selectionText: {
                    DEFAULT: '#ffffff',
                    dark: '#000000',
                },
                'black-opacity-30': 'rgba(0, 0, 0, 0.3)',
            },
            backdropFilter: ['responsive'],
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animationDelay: {
                "0s": "0s",
                "1s": "1s",
                "2s": "2s",
                "3s": "3s",
                "4s": "4s",
                "5s": "5s",
            },
            listStyleType: {
                'none': 'none',
                'decimal': 'decimal', // Default decimal styling
                'disc': 'disc', // Default dot styling
            },
        },
    },
    plugins: [
        tailwindcssAnimate,
        function (pluginApi: { addUtilities: (utilities: Record<string, { animationDelay: string }>) => void }) {
            const { addUtilities } = pluginApi;
            const delays = {
                ".animation-delay-0s": { animationDelay: "0s !important" },
                ".animation-delay-1s": { animationDelay: "1s !important" },
                ".animation-delay-2s": { animationDelay: "2s !important" },
                ".animation-delay-3s": { animationDelay: "3s !important" },
                ".animation-delay-4s": { animationDelay: "4s !important" },
                ".animation-delay-5s": { animationDelay: "5s !important" },
            };
            addUtilities(delays);
        },
    ],
};

export default config;
