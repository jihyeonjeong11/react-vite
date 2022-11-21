import React from "react";
import {
    AccordionProvider,
    useAccordion,
} from "@/components/common/contexts/accordion";

import styles from "../aside.module.css";

const AccordionCompound = ({ children, ...rest }: {children: React.ReactNode}) => {
    return <AccordionProvider {...rest}>{children}</AccordionProvider>;
};

const AccordionItem = ({ children, ...rest }: {children: React.ReactNode}) => {
    return <li className="w-full" {...rest}>{children}</li>;
};

const AccordionToggle = ({
    children,
    eventKey,
    ...rest
}: {
    children: React.ReactNode;
    eventKey: number;
}) => {
    const { activeIndex, toggleClick } = useAccordion();

    return (
        <div className="w-full" {...rest}>
            <div className="w-full" onClick={() => toggleClick(eventKey)}>{children}</div>
        </div>
    );
};

const AccordionCollapse = ({
    children,
    eventKey,
    ...rest
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
        <div className={"w-full " + styles['accordion-collapse']} id={id} style={style} {...rest} >
            {children}
        </div>
    );
};

AccordionCompound.Item = React.memo(AccordionItem);
AccordionCompound.Toggle = React.memo(AccordionToggle);
AccordionCompound.Collapse = React.memo(AccordionCollapse);

export default AccordionCompound;
