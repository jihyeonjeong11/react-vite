import React from "react";
import {
    AccordionProvider,
    useAccordion,
} from "@/components/common/contexts/accordion";

import styles from "../aside.module.css";

const AccordionCompound = ({ children, ...rest }: {children: React.ReactNode}) => {
    return <AccordionProvider>{children}</AccordionProvider>;
};

const AccordionItem = ({ children }: {children: React.ReactNode}) => {
    return <li className="w-full">{children}</li>;
};

const AccordionToggle = ({
    children,
    eventKey,
}: {
    children: React.ReactNode;
    eventKey: number;
}) => {
    const { activeIndex, toggleClick } = useAccordion();

    return (
        <div className="w-full">
            <button className="w-full" onClick={() => toggleClick(eventKey)}>{children}</button>
        </div>
    );
};

const AccordionCollapse = ({
    children,
    eventKey,
}: {
    children: React.ReactNode;
    eventKey: number;
}) => {
    const { activeIndex } = useAccordion();
    const [style, setStyle] = React.useState({height: 0});

    const id = React.useMemo(() => "accordionCollapse-" + eventKey, [eventKey]);

    React.useLayoutEffect(() => {
        const element = document.getElementById(id);
        if(eventKey === activeIndex){
            const height = element?.scrollHeight;
            if(height) setStyle({height});
            return
        }
        setStyle({height: 0})
    }, [eventKey, activeIndex])

    return (
        <div className={"w-full " + styles['accordion-collapse']} id={id} style={style} >
            {children}
        </div>
    );
};

AccordionCompound.Item = React.memo(AccordionItem);
AccordionCompound.Toggle = React.memo(AccordionToggle);
AccordionCompound.Collapse = React.memo(AccordionCollapse);

export default AccordionCompound;
