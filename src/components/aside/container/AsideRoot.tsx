import { Fragment, useCallback } from "react";

import AccordionCompound from "../components/AccordionCompound";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AccordionConsumer } from "@/components/common/contexts/accordion";
import { useDialogsContextState } from "@/components/common/contexts/dialogs";

import ListItem from "../components/Listitem";
import type { DialogTypes } from "@/components/common/dialog/constants";


// useDialogContextState, 중앙관리
// RenderDialog 실제 컴포넌트 import
// 해야 할 것: modal 감싸는 공통 부분 더 분리하기, 모달 결정하는 함수 switch 문으로 변경

const AsideRoot = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    const { dialogType, setDialogs } = useDialogsContextState();

    const navBubble = useCallback(
        (e: React.MouseEvent) => {
            const target = (e.target as Element).closest("button");
            if (target && target.dataset.dialog)
                return setDialogs(target.dataset.dialog as DialogTypes);
            if (target && target.dataset.lang)
                return i18n.changeLanguage(target.dataset.lang);
            if (target && target.dataset.href)
                return navigate(target.dataset.href);
        },
        [dialogType, i18n, navigate]
    );

    return (
        <>
            <aside className="w-48" aria-label="Sidebar">
                <nav
                    onClick={navBubble}
                    className=" h-screen py-4 bg-brand-100"
                >
                    <div className="flex justify-evenly mb-12">
                        <button data-lang="ko" className="text-white">
                            ko
                        </button>
                        <button data-lang="en" className="text-white">
                            en
                        </button>
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
                                                        hasDialog,
                                                        dialogType,
                                                    },
                                                    index
                                                ) => (
                                                    <Fragment
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
                                                                                        hasDialog:
                                                                                            c.hasDialog,
                                                                                        dialogType:
                                                                                            c.dialogType,
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
                                                    </Fragment>
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
