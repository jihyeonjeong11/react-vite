import "./App.css";
import { Link, Outlet } from "react-router-dom";

import localforage from "localforage";

import Aside from "@/routes/aside/Aside";
import AsideRoot from "./components/aside/container/AsideRoot";
import { IndexedDbProvider } from "@/components/common/contexts/indexeddb/index";
import Form from "./components/common/forms/Form";
import { CommonForms } from "./types/Global";
import FormItem from "./components/common/forms/formControl/FormItem";
import { addRegex, addRequired } from "./components/common/forms/helpers";

// todo

localforage.config({
    driver: localforage.INDEXEDDB,
    name: "forDraggable",
});

function App() {
    const submitTest = (data: CommonForms) => {
        console.log(data);
    }
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
                        <Form submit={submitTest}>
                            <FormItem 
                                key="email" 
                                dataKey="email" 
                                name="메일" 
                                type="text" 
                                applyOption={{
                                    required: addRequired,
                                    pattern: addRegex("email")
                                }} 
                            />
                            <FormItem 
                                key="desc"
                                dataKey="desc"
                                name="설명"
                                type="desc"
                                applyOption={{
                                    required: addRequired
                                }}
                            />
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
