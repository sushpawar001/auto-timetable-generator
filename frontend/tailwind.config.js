import fluid, { extract, screens, fontSize } from "fluid-tailwind";
/** @type {import('tailwindcss').Config} */
export default {
    content: { files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], extract },
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8",
                    DEFAULT: "#0ea5e9",
                    600: "#0284c7",
                    700: "#0369a1",
                    800: "#075985",
                    900: "#0c4a6e",
                    950: "#082f49",
                },
                secondary: "#FFFFFF", // white
            },
            fontFamily: {
                // rubik: ["Rubik", "sans-serif"],
                custom: ["Nunito", "sans-serif"],
            },
            screens,
            fontSize,
        },
    },
    plugins: [
        require("daisyui"),
        require("tailwind-scrollbar")({
            nocompatible: true,
        }),
        fluid,
    ],
};
