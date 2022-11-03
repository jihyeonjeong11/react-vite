import React from "react";

import Window from "./Window";
import { Rnd } from "react-rnd";
import { useProcesses } from "@/components/common/contexts/process";
import { useSession } from "@/components/common/contexts/session";

const MemoComp = ({ id }: { id: string }) => {
    const {
        processes: { [id]: process },
    } = useProcesses();

    const {
        windowStates: { [id]: windowState },
        setWindowStates,
        addToWindow,
        removeFromWindow,
        windowStates,
    } = useSession();

    const rndRef = React.useRef(null);

    // React.useEffect(() => {
    //     //if (windowState) return;

    //         addToWindow(id, {
    //             position: { x: 0, y: 0 },
    //             size: { width: "250px", height: "250px" },
    //         });
    //     return removeFromWindow(id);
    // }, []);

    const textareaRef = React.useRef(null);
    return (
        <>
            {windowState && (
                <Rnd
                    enableUserSelectHack={false}
                    ref={rndRef}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        const { width, height } = ref.style;
                        addToWindow(id, { size: { width, height } });
                    }}
                    onDragStop={({ x, y }) => {
                        addToWindow(id, { position: { x, y } });
                    }}
                    minHeight={282}
                    minWidth={250}
                >
                    {/* <div>{"xCoor " + windowState?.position?.x}</div>
                    <div>{"yCoor " + windowState?.position?.y}</div>
                    <div>{"width " + windowState?.size?.width}</div>
                    <div>{"height " + windowState?.size?.height}</div>
                    <div>
                        {"val " + textareaRef ? textareaRef.current?.value : ""}
                    </div> */}

                    <Window id={id}>
                        <article
                            style={{
                                width: windowState?.size?.width || 250,
                                height: windowState?.size?.height || 250,
                            }}
                            className="flex items-center justify-center h-[calc(100%_-_2rem)]"
                        >
                            <textarea
                                placeholder="hello"
                                name=""
                                id=""
                                cols={30}
                                rows={10}
                                ref={textareaRef}
                                value={windowState.value}
                                onChange={(e)=>addToWindow(id,{value: e.target.value})}
                                className="w-full h-full resize-none"
                            />
                        </article>
                    </Window>
                </Rnd>
            )}
        </>
    );
};

export default MemoComp;
