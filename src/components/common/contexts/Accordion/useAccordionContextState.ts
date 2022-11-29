import { useState, useCallback } from "react";

import type { MenuType } from "@/components/aside/constants";

import menus from "@/components/aside/constants";

export type AccordionContextState = {
    activeIndex: number | null;
    toggleClick: (eventIndex: number) => void;
    menus: MenuType
};

const useAccordionContextState = (): AccordionContextState => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleClick = useCallback((eventIndex: number) => {
        return setActiveIndex(eventIndex === activeIndex ? null : eventIndex);
    }, [activeIndex]);

    return {
        activeIndex,
        toggleClick,
        menus
    };
};

export default useAccordionContextState;
