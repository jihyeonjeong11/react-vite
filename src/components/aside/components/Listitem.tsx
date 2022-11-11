import React from "react";
import type { MenuProps } from "../constants";

import classes from "../aside.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { SlCamrecorder, SlNote } from "react-icons/sl";
import { CgScreen } from "react-icons/cg";
import { BsEye } from "react-icons/bs";

const iconSorter = (title: string | undefined, size: string, color: string) => {
    switch (title) {
        default:
            return <></>;
        case "home":
            return <AiOutlineHome size={size} className={color} />;
        case "recording":
            return <SlCamrecorder size={size} className={color} />;
        case "testing":
            return <SlNote size={size} className={color} />;
        case "videos":
            return <CgScreen size={size} className={color} />;
        case "managing":
            return <BsEye size={size} className={color} />;
    }
};

const ListItem = ({ item: { title, href } }: { item: Partial<MenuProps> }) => (
    <li className="relative cursor-pointer" id={title}>
        <a
            href={!!href ? href : `javascript:void(0)`}
            className={
                "flex items-center p-2 px-4 text-base font-normal " +
                classes["btn"] +
                " " +
                classes["btn-background-slide"]
            }
        >
            {iconSorter(title, "1.5rem", "text-sidebar__text")}
            <span className="ml-3 text-sidebar__text hover:text-white">
                {title}
            </span>
        </a>
    </li>
);

export default ListItem;
