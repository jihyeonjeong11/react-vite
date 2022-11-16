import React from "react";

import { useTranslation } from "react-i18next";

import type { MenuProps } from "../constants";

import classes from "../aside.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { SlCamrecorder, SlNote } from "react-icons/sl";
import { CgScreen } from "react-icons/cg";
import { BsEye } from "react-icons/bs";
import { useAccordion } from "@/components/common/contexts/accordion";

const iconSorter = (title: string | undefined, size: string, color: string) => {
    switch (title) {
        default:
            return <div style={{width: 24}} />;
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

const ListItem = ({
    item: { title, href },
    eventKey,
}: {
    item: Partial<MenuProps>;
    eventKey: number;
}) => {
    const {activeIndex, toggleClick} = useAccordion();
    const isFocused = React.useMemo(() => eventKey == activeIndex, [activeIndex, eventKey]);
    const {t} = useTranslation();
    return (
        <article className="relative cursor-pointer" id={title}>
            <div
                className={
                    "flex items-center p-2 px-4 text-base font-normal " +
                    classes["list"] +
                    " " +
                    classes["list-background-slide"]
                }
            >
                {iconSorter(
                    title,
                    "1.5rem",
                    isFocused ? "text-white" : "text-sidebar__text"
                )}
                <span
                    className={
                        "ml-3 hover:text-white" +
                        (isFocused ? " text-white" : " text-sidebar__text")
                    }
                >
                    {title && t(title)}
                </span>
            </div>
        </article>
    );
};

export default React.memo(ListItem);
