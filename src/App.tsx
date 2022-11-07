import "./App.css";
import { Link, Outlet } from "react-router-dom";

import localforage from "localforage";

import Aside from "@/routes/aside/Aside";
import { IndexedDbProvider } from "@/components/common/contexts/indexeddb/index";

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
                    <Aside />
                    <div id="detail">
                        <Outlet />
                    </div>
                </IndexedDbProvider>
            </div>
        </>
    );
}

export default App;
