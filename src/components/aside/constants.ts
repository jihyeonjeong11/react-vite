export type MenuProps =   {
    title: string;
    hasChildren: boolean;
    href: string;
    children?: any[];
};

export type MenuType = Record<string, MenuProps>;

const menus: MenuType = {
    "1": { title: "Home", hasChildren: false, href: "/" },
    "2": {
        title: "recording",
        hasChildren: true,
        href: "",
        children: [1,2,3,4,5],
    },
    "3": { title: "testing", hasChildren: true, href: "", children: [1,2,3,4,5] },
    "4": { title: "videos", hasChildren: false, href: "video" },
    "5": { title: "managing", hasChildren: false, href: "managing" },
};

export default menus;
