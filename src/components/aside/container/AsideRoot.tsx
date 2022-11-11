import React, { useState } from "react";

import menus from "../constants";
import ListItem from "../components/Listitem";
import classes from "../aside.module.css";

export type HighlightEnumProps =
    | "home"
    | "recording"
    | "testing"
    | "videos"
    | "managing"
    | "none";

    // useDebounce 먼저 걸어야겠다.ㅣ

const AsideRoot = () => {
    const [highlight, setHighlight] = useState<HighlightEnumProps>("none");

    const clickEnum = React.useCallback(
        (e: React.SyntheticEvent) => {
            const target = (e.target as HTMLLIElement).closest("li");
            if (target != null) {
                if (highlight == target.id) return setHighlight("none");
                if (highlight == "none" || highlight != target.id)
                    return setHighlight(target.id as HighlightEnumProps);
            }
        },
        [highlight]
    );

    return (
        <>
            <aside className="w-48" aria-label="Sidebar">
                <nav className=" h-screen py-4 bg-sidebar__background">
                    <ul className="space-y-2" onClick={clickEnum}>
                        {Object.keys(menus).map((key) => {
                            const { title, href, hasChildren, children } =
                                menus[key];
                            return (
                                <>
                                    <ListItem
                                        key={key}
                                        item={{ title, href }}
                                    />
                                    {highlight == title && hasChildren && (
                                        <article
                                            className={
                                                classes[
                                                    highlight == title
                                                        ? "slide-fade-in-dropdown"
                                                        : "slide-fade-out-dropdown"
                                                ]
                                            }
                                        >
                                            <ul>
                                                {children?.map((e, i) => (
                                                    <li key={i}>children</li>
                                                ))}
                                            </ul>
                                        </article>
                                    )}
                                </>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default AsideRoot;
