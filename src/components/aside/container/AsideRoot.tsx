import AccordionCompound from "../components/AccordionCompound";

import { AccordionConsumer } from "@/components/common/contexts/Accordion";

import ListItem from "../components/Listitem";
import React from "react";

const AsideRoot = () => {
    return (
        <>
            <aside className="w-48" aria-label="Sidebar">
                <nav className=" h-screen py-4 bg-sidebar__background">
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
