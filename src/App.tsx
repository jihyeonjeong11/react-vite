import "./App.css";
import { Link, Outlet } from "react-router-dom";

import localforage from "localforage";

import Aside from "@/routes/aside/Aside";

// todo

localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'forDraggable'
})

function App() {

    return (
        <>
                    <div className="flex overflow-y-hidden">
                        <Aside />
                        <div id="detail">
                            <Outlet />
                        </div>
                    </div>
        </>
    );
}


export default App;
