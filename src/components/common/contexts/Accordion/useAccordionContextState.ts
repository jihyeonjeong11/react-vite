import React, { useState } from "react";

import type { MenuType } from "@/components/aside/constants";

import { useNavigate } from "react-router-dom";
import menus from "@/components/aside/constants";

export type AccordionContextState = {
    activeIndex: number | null;
    toggleClick: (eventIndex: number) => void;
    menus: MenuType
};

type ErrorHandler = (e?: Error) => void;

const defaultErrorHandler: ErrorHandler = (e?: Error) => {
    console.error(e);
};

const useAccordionContextState = (): AccordionContextState => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleClick = React.useCallback((eventIndex: number) => {
        if(!menus[eventIndex].hasChildren) return navigate(menus[eventIndex].href);
        return setActiveIndex(eventIndex === activeIndex ? null : eventIndex);
    }, [activeIndex]);

    return {
        activeIndex,
        toggleClick,
        menus
    };
};

export default useAccordionContextState;
