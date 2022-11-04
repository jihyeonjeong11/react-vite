import React, {useRef} from "react";

import { ProcessConsumer } from "@/components/common/contexts/process/index";
import { SessionConsumer } from "@/components/common/contexts/session";
import RenderComponent from "../components/RenderComponents";
import useUnmount from "@/components/common/hooks/useUnmount";

import Remote from "../components/remote";

const DraggableRoot = () => {
    
    return (
        <>
            <main className="bg-background w-[calc(100vw_-_16rem)] h-full relative overflow-hidden">
                <ProcessConsumer>
                        {({ processes = {} }) => {
                            return (
                                <div>
                                    {JSON.stringify(processes)}
                                    {Object.entries(processes).map(
                                        ([id, { component }]) => {
                                            return (
                                                id && (
                                                    <RenderComponent
                                                        key={id}
                                                        id={id}
                                                        Component={component}
                                                    />
                                                )
                                            );
                                        }
                                    )}
                                </div>
                            );
                        }}
                </ProcessConsumer>
                <TaskBar />
            </main>
        </>
    );
};

export default DraggableRoot;

// backdrop-filter: ${({ theme }) => `blur(${theme.sizes.taskbar.blur})`};
// background-color: ${({ theme }) => theme.colors.taskbar.background};
// bottom: 0;
// contain: size layout;
// height: ${TASKBAR_HEIGHT}px;
// left: 0;
// position: absolute;
// right: 0;
// width: 100vw;
// z-index: 1000;

const TaskBar = () => {
    return (
        <nav className="backdrop-blur bg-taskbar-background sticky top-[100vh] ">
            <p className="text-white">taskbar</p>
            <Remote />
        </nav>
    );
};
