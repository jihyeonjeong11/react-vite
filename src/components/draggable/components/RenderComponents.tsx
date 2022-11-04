import React from "react";

import ErrorBoundary from "@/routes/error/ErrorBoundary";
import MemoComp from "./MemoComp";

export type ComponentProcessProps = {
    id: string;
};

type RenderComponentProps = {
    Component: string;
    id: string;
};

const RenderComponent: React.FunctionComponent<RenderComponentProps> = ({
    Component,
    id,
}) => {

    const Comp = Component == 'memo' ? MemoComp : MemoComp
    
    const SafeComponent = (
        <ErrorBoundary>
            <Comp id={id} />
        </ErrorBoundary>
    );

    return SafeComponent;
};

export default RenderComponent;
