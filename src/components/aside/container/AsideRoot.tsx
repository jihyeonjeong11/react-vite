import AccordionCompound from "../components/AccordionCompound";

import { useTranslation } from "react-i18next";

import { AccordionConsumer } from "@/components/common/contexts/accordion";

import ListItem from "../components/Listitem";
import React from "react";

const AsideRoot = () => {
    const {i18n} = useTranslation();

    const changeLang = (e: React.MouseEvent) => {
        const target = (e.target as Element).closest('button')
        return target && i18n.changeLanguage(target.dataset.lang)
    }
    
    return (
        <>
            <aside className="w-48" aria-label="Sidebar">
                <nav className="h-screen py-4 bg-sidebar__background">
                    <div onClick={changeLang} className="flex justify-evenly mb-12">
                        <button data-lang="ko" className="text-white">ko</button>
                        <button data-lang="en" className="text-white">en</button>
                    </div>
                    <ul className="space-y-2">
                        <AccordionCompound>
                            <AccordionConsumer>
                                {({ menus }) => {
                                    return (
                                        <>
                                            {menus.map(
                                                (
                                                    {
                                                        title,
                                                        href,
                                                        hasChildren,
                                                        children,
                                                    },
                                                    index
                                                ) => (
                                                    <React.Fragment
                                                        key={
                                                            index + "asidemenu"
                                                        }
                                                    >
                                                        <AccordionCompound.Item>
                                                            <AccordionCompound.Toggle
                                                                eventKey={index}
                                                            >
                                                                <ListItem
                                                                    item={{
                                                                        title,
                                                                        href,
                                                                    }}
                                                                    eventKey={
                                                                        index
                                                                    }
                                                                />
                                                            </AccordionCompound.Toggle>
                                                            <AccordionCompound.Collapse
                                                                eventKey={index}
                                                            >
                                                                {hasChildren &&
                                                                    children?.map(
                                                                        (
                                                                            c,
                                                                            i
                                                                        ) => {
                                                                            return (
                                                                                <ListItem
                                                                                    key={
                                                                                        i +
                                                                                        "childrenmenu"
                                                                                    }
                                                                                    item={{
                                                                                        title: c.title,
                                                                                        href: c.href,
                                                                                    }}
                                                                                    eventKey={
                                                                                        index
                                                                                    }
                                                                                />
                                                                            );
                                                                        }
                                                                    )}
                                                            </AccordionCompound.Collapse>
                                                        </AccordionCompound.Item>
                                                    </React.Fragment>
                                                )
                                            )}
                                        </>
                                    );
                                }}
                            </AccordionConsumer>
                        </AccordionCompound>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default AsideRoot;

// <ul>
// <ListItem
//     key={key}
//     item={{ title, href }}
//     clickEvent={clickEvent}
//     boolean={boolean}
// />
// {boolean && hasChildren && (
//     <article
//         className={
//             classes[
//                 !closing
//                     ? "slide-fade-in-dropdown"
//                     : "slide-fade-out-dropdown"
//             ]
//         }
//     >
//         <ul>
//             {children?.map(({ title, href }, i) => (
//                 <ListItem
//                     key={i}
//                     item={{
//                         title,
//                         href,
//                     }}
//                     clickEvent={clickEvent}
//                     boolean={boolean}
//                 />
//             ))}
//         </ul>
//     </article>
// )}
// </ul>
