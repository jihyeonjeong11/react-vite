import React from "react";

import DraggableRoot from "@/components/draggable/container/draggableRoot";
import { ProcessProvider } from "@/components/common/contexts/process";


const DraggableScreen = () => {
    return (
        <React.Fragment>
                <ProcessProvider>
                    <DraggableRoot />
                </ProcessProvider>
        </React.Fragment>
    );
};

export default DraggableScreen;
