import { formArrayprops } from './../../../types/Global.d';

export type fixedForm = "example";

export const example:formArrayprops = [
    {
        dataKey: "email",
        name: "이메일",
        type: "email",
        placeholder: "example@mail.com",
        defaultValue: "aaaa@dddd.com"
    },
    {
        dataKey: "number",
        name: "숫자입력",
        type: "number"
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
            "all", "even", "odd"
        ]
    }
]