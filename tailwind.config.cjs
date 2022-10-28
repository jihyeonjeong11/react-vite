/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        // screens: {
        //     mob: "375px",
        //     tablet: "768px",
        //     laptop: "1024px",
        //     laptopl: "1440px",
        //     desktop: "2000px",
        // },
        colors: {
            background: "hsla(207, 30%, 72%, 25%)",
            backgroundFocused: "hsla(207, 60%, 72%, 30%)",
            backgroundFocusedHover: "hsla(207, 90%, 72%, 35%)",
            border: "hsla(207, 30%, 72%, 30%)",
            borderFocused: "hsla(207, 60%, 72%, 35%)",
            borderFocusedHover: "hsla(207, 90%, 72%, 40%)",
            text: "#FFF",
            textShadow: `
              0 0 1px rgba(0, 0, 0, 75%),
              0 0 2px rgba(0, 0, 0, 50%),
        
              0 1px 1px rgba(0, 0, 0, 75%),
              0 1px 2px rgba(0, 0, 0, 50%),
        
              0 2px 1px rgba(0, 0, 0, 75%),
              0 2px 2px rgba(0, 0, 0, 50%)`,
            taskbarBackground: "hsla(0, 0%, 10%, 70%)",
        },
        extend: {},
    },
    plugins: [],
};

// theme for
