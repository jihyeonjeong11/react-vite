export type MenuProps = {
    title: string;
    hasChildren: boolean;
    href: string;
    children?: MenuProps[];
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
            { title: "item_testing1", hasChildren: false, href: "/" },
            { title: "item_testing2", hasChildren: false, href: "/" },
        ],
    },
    { title: "videos", hasChildren: false, href: "video" },
    { title: "managing", hasChildren: false, href: "managing" },
    { title: "React Hook Form", hasChildren: false, href: "form" },
];

export default menus;
