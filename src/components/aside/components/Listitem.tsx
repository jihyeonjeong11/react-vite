import React from "react";

import type { MenuProps } from "../constants";

import classes from "../aside.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { SlCamrecorder, SlNote } from "react-icons/sl";
import { CgScreen } from "react-icons/cg";
import { BsEye } from "react-icons/bs";
import { useAccordion } from "@/components/common/contexts/Accordion";

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

const ListItem = ({
    item: { title, href },
    eventKey,
}: {
    item: Partial<MenuProps>;
    eventKey: number;
}) => {
    const {activeIndex, toggleClick} = useAccordion();
    const isFocused = React.useMemo(() => eventKey == activeIndex, [activeIndex, eventKey]);
    return (
        <article className="relative cursor-pointer" id={title}>
            <div
                className={
                    "flex items-center p-2 px-4 text-base font-normal " +
                    classes["list"] +
                    " " +
                    classes["list-background-slide"] +
                    " hover:bg-brand-200 active:bg-brand-200 focus:bg-brand-200"
                }
            >
                {iconSorter(
                    title,
                    "1.5rem",
                    isFocused ? "text-white" : "text-white/50"
                )}
                <span
                    className={
                        "ml-3 hover:text-white" +
                        (isFocused ? " text-white" : " text-white/50")
                    }
                >
                    {title}
                </span>
            </div>
        </article>
    );
};

export default React.memo(ListItem);
