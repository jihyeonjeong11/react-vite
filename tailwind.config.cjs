/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "brand": {
                    100: "rgba(var(--deep-blue-100), <alpha-value>)",
                    200: "rgba(var(--deep-blue-200), <alpha-value>)"
                },
                "header-white": {
                    100: "rgba(var(--header-white-100), <alpha-value>)",
                },
                "header-text": {
                    100: "rgba(var(--header-text-100), <alpha-value>)",
                },
                "main": {
                    100: "rgba(var(--main-100), <alpha-value>)",
                },
                // window
                "window-header": "rgb(43, 43, 43)",
                "window-shadow": "0 0 12px 0 rgba(0, 0, 0, 50%)",
                "window-outline": "hsla(0, 0%, 25%, 75%)",
                "window-background": "#808080",
                // sidebar colors
                // "sidebar__background": "#2e53da",
                // "sidebar__background--focused": "#2945a8",
                // "sidebar__text": "#739bec",
                // "sidebar__text--focused": "#ffffff"

            },
            fontFamily: {
                pretendard: ["Pretendard-Regular", "sans-serif"]
            }
        },
    },
    plugins: [],
};
