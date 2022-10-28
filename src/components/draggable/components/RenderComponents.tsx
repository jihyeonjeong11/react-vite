import React from "react";

import ErrorBoundary from "@/routes/error/ErrorBoundary";

export type ComponentProcessProps = {
    id: string;
};

type RenderComponentProps = {
    Component: React.FunctionComponent<ComponentProcessProps >;
    id: string;
};

const RenderComponent: React.FunctionComponent<RenderComponentProps> = ({
    Component,
    id,
}) => {
    
    const SafeComponent = (
        <ErrorBoundary>
            <Component id={id} />
        </ErrorBoundary>
    );

    return SafeComponent;
};

export default RenderComponent;
