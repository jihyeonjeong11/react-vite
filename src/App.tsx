import "./App.css";
import { Link, Outlet } from "react-router-dom";

import localforage from "localforage";

import Aside from "@/routes/aside/Aside";
import AsideRoot from "./components/aside/container/AsideRoot";
import { IndexedDbProvider } from "@/components/common/contexts/indexeddb/index";
import Form from "./components/common/forms/components/form";
import { CommonForms, formArrayprops } from "./types/Global";

// todo

localforage.config({
    driver: localforage.INDEXEDDB,
    name: "forDraggable",
});

function App() {
    const submitTest = (data: CommonForms) => {
        console.log(data);
    }
    const emailForm:formArrayprops = [
        {
            dataKey: "email",
            name: "이메일",
            type: "email",
            placeholder: "example@mail.com"
        }
    ]
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
                        <Form submit={submitTest} formProps={emailForm}>
                            <p>그냥 p 태그</p>
                            <button type="submit">제출 버튼</button>
                        </Form>
                        <Outlet />
                    </div>
                </IndexedDbProvider>
            </div>
        </>
    );
}

export default App;
