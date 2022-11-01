import React from "react";

import DraggableRoot from "@/components/draggable/container/draggableRoot";
import { ProcessProvider } from "@/components/common/contexts/process";
import { SessionProvider } from "@/components/common/contexts/session";

const DraggableScreen = () => {
    return (
        <React.Fragment>
            <ProcessProvider>
                <SessionProvider>
                    <DraggableRoot />
                </SessionProvider>
            </ProcessProvider>
        </React.Fragment>
    );
};

export default DraggableScreen;
