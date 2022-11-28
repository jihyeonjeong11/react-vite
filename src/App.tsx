import "./App.css";
import { Link, Outlet } from "react-router-dom";

import localforage from "localforage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import AsideRoot from "./components/aside/container/AsideRoot";
import ClockRoot from "./components/clock/ClockRoot";
import Form from "./components/common/forms/form";
import { CommonForms } from "./types/Global";
import { FormItem } from "./components/common/forms/formControl";
import { addRegex, addRequired } from "./components/common/forms/helpers";

// todo

localforage.config({
    driver: localforage.INDEXEDDB,
    name: "forDraggable",
});

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    test: "testen",
                    recording: "recording",
                    testing: "testing",
                    videos: "videos",
                    managing: "managing",
                },
            },
            ko: {
                translation: {
                    test: "테스트",
                    recording: "녹화",
                    testing: "시험",
                    videos: "영상",
                    managing: "설정",
                },
            },
        },
        lng: "ko", // if you're using a language detector, do not define the lng option
        fallbackLng: "ko",

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

function App() {
    return (
        <>
            <div className="flex overflow-y-hidden bg-white dark:bg-black text-black dark:text-white">
                <AsideRoot />
                <div id="detail">
                    {/* <button 
                            className="bg-black dark:bg-white py-2 px-4 text-white dark:text-black rounded mx-2 my-2"
                            onClick={() => {document.getElementsByTagName("html")[0].classList.toggle("dark")}}
                        >
                            모드 전환
                        </button>
                        <p>테스트용 텍스트</p>
                        <p>테스트용 텍스트</p>
                        <p>테스트용 텍스트</p> */}
                    <Outlet />
                </div>
                <ClockRoot />
            </div>
        </>
    );
}

export default App;
