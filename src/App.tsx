import "./App.css";
import { Link, Outlet } from "react-router-dom";

import {
    SessionProvider,
    SessionConsumer,
} from "./components/common/contexts/session";
import Aside from "@/routes/aside/Aside";

// todo

function App() {
    return (
        <>
            <SessionProvider>
                    <div className="flex overflow-y-hidden">
                        <Aside />
                        <div id="detail">
                            <Outlet />
                        </div>
                    </div>
            </SessionProvider>
        </>
    );
}


export default App;
