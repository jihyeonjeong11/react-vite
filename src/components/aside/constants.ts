import { Dialogs, DialogTypes } from "../common/contexts/dialogs/useDialogsContextState";

export type MenuProps = {
    title: string;
    hasChildren: boolean;
    href?: string;
    children?: MenuProps[];
    hasDialog?: true;
    dialogType?: DialogTypes;
};

export type MenuType = MenuProps[];

const menus: MenuType = [
    { title: "Home", hasChildren: false, href: "/" },
    {
        title: "recording",
        hasChildren: true,
        href: "",
        children: [
            { title: "item_recording1", hasChildren: false, href: "/" },
            { title: "item_recording2", hasChildren: false, href: "/" },
        ],
    },
    {
        title: "testing",
        hasChildren: true,
        href: "",
        children: [
            { title: "메인 시험 작성", hasChildren: false, hasDialog: true, dialogType: Dialogs["MainExam"]}, // 지금 작업하는 TableRoot
            { title: "메인 시험 마감", hasChildren: false, href: "/table" }, // 마감된 메인시험의 테이블
        ],
    },
    { title: "videos", hasChildren: false, href: "video" },
    { title: "managing", hasChildren: false, href: "managing" },
    { title: "React Hook Form", hasChildren: false, href: "form" },
];

export default menus;
