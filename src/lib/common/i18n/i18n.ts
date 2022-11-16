// https://github.com/i18next/react-i18next/blob/master/example/react-component-lib/src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    test: "testen",
                },
            },
            ko: {
                translation: {
                    test: "테스트",
                },
            },
        },
        lng: "ko", // if you're using a language detector, do not define the lng option
        fallbackLng: "ko",

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

i18n.on("languageChanged", (lng) => {
    i18n.changeLanguage(lng);
});

export default i18n;
