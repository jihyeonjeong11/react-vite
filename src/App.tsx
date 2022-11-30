import "./App.css";
import { Link, Outlet } from "react-router-dom";

import localforage from "localforage";

import Aside from "@/routes/aside/Aside";
import AsideRoot from "./components/aside/container/AsideRoot";
import { IndexedDbProvider } from "@/components/common/contexts/indexeddb/index";
import Form from "./components/common/forms/components/form";

// todo

localforage.config({
    driver: localforage.INDEXEDDB,
    name: "forDraggable",
});

function App() {
    
    return (
        <>
            <div className="flex overflow-y-hidden">
                <IndexedDbProvider>
                    <AsideRoot />
                    <div id="detail">
                        <button 
                            className="bg-black dark:bg-white py-2 px-4 text-white dark:text-black rounded mx-2 my-2"
                            onClick={() => {document.getElementsByTagName("html")[0].classList.toggle("dark")}}
                        >
                            모드 전환
                        </button>
                        <Outlet />
                    </div>
                </IndexedDbProvider>
            </div>
        </>
    );
}

export default App;
