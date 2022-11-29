import "./App.css";
import { Link, Outlet } from "react-router-dom";

import localforage from "localforage";

import Aside from "@/routes/aside/Aside";
import AsideRoot from "./components/aside/container/AsideRoot";
import { IndexedDbProvider } from "@/components/common/contexts/indexeddb/index";
import Form from "./components/common/forms/components/form";
import { CommonForms, fieldProps, formArrayprops } from "./types/Global";

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
            placeholder: "example@mail.com",
            defaultValue: "aaaa@dddd.com"
        },
        {
            dataKey: "fruit",
            name: "과일",
            type: "radio",
            selectOption: [
                {value: "apple", name: "사과"},
                {value: "cherry", name: "체리"},
                {value: "grape", name: "포도"},
            ],
            tip: "하나만 고를 수 있는 radio입니다.",
            defaultValue: "apple"
        },
        {
            dataKey: "local",
            type: "select",
            name: "지역",
            selectOption: [
                {value: "지역1"},
                {value: "지역2"},
                {value: "지역3"},
                {value: "지역4"}
            ]
        },
        {
            dataKey: "checking",
            name: "테스트",
            type: "checkbox",
            selectOption: [
                {value: "체크1"},
                {value: "체크2"},
                {value: "체크3"},
                {value: "체크4"},
                {value: "체크5"},
            ],
            defaultValue: ["체크1"]
        },
        {
            dataKey: "something",
            name: "모두 고르시오",
            type: "checkbox",
            tip: "하나만 골라도 됩니다.",
            selectOption: [
                {value: "메일1"},
                {value: "메일2"},
                {value: "메일3"},
                {value: "메일4"},
                {value: "메일5"}
            ],
            customCheck: [
                "all", "even"
            ]
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
                        <Form submit={submitTest} formProps={emailForm} key={"emailForm"} keyName={"emailForm"}>
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
