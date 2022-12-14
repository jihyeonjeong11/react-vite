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
            { title: "시험 작성", hasChildren: false, hasDialog: true, dialogType: Dialogs["MainExam"]},
            { title: "시험 목록", hasChildren: false, href: "/table" },
        ],
    },
    { title: "videos", hasChildren: false, href: "video" },
    { title: "managing", hasChildren: false, href: "managing" },
];

export default menus;
