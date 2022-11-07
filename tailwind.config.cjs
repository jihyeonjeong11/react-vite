/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "red-500": "#EF4444",
                "taskbar-background": "hsla(0, 0%, 10%, 70%)",
                background: "hsla(207, 30%, 72%, 25%)",
                textShadow: `
            0 0 1px rgba(0, 0, 0, 75%),
            0 0 2px rgba(0, 0, 0, 50%),

            0 1px 1px rgba(0, 0, 0, 75%),
            0 1px 2px rgba(0, 0, 0, 50%),

            0 2px 1px rgba(0, 0, 0, 75%),
            0 2px 2px rgba(0, 0, 0, 50%)`,

                // window
                "window-header": "rgb(43, 43, 43)",
                "window-shadow": "0 0 12px 0 rgba(0, 0, 0, 50%)",
                "window-outline": "hsla(0, 0%, 25%, 75%)",
                "window-background": "#808080",
            },
        },
    },
    plugins: [],
};

// theme for

// extend: {
//     colors: {
//         background: "hsla(207, 30%, 72%, 25%)",
//         "background-focused": "hsla(207, 60%, 72%, 30%)",
//         backgroundFocusedHover: "hsla(207, 90%, 72%, 35%)",
//         border: "hsla(207, 30%, 72%, 30%)",
//         borderFocused: "hsla(207, 60%, 72%, 35%)",
//         borderFocusedHover: "hsla(207, 90%, 72%, 40%)",
//         text: "#FFF",
//         textShadow: `
//             0 0 1px rgba(0, 0, 0, 75%),
//             0 0 2px rgba(0, 0, 0, 50%),

//             0 1px 1px rgba(0, 0, 0, 75%),
//             0 1px 2px rgba(0, 0, 0, 50%),

//             0 2px 1px rgba(0, 0, 0, 75%),
//             0 2px 2px rgba(0, 0, 0, 50%)`,
//         "taskbar-background": "hsla(0, 0%, 10%, 70%)",
//     },
// },
