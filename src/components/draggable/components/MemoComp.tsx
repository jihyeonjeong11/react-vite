import { useRef } from "react";

// import type { StoredWindowProps } from "@/components/common/hooks/useLocalForage";

import Window from "./Window";
import { Rnd } from "react-rnd";
import { useProcesses } from "@/components/common/contexts/process";
import { useSession } from "@/components/common/contexts/session";
import { pxToNum } from "@/lib/common/helpers/helpers";

const MemoComp = ({ id }: { id: string }) => {
    const {
        processes: { [id]: process },
    } = useProcesses();

    const {
        windowStates: { [id]: windowState },
        addToWindow,
        removeFromWindow,
        windowStates,
    } = useSession();

    const rndRef = useRef(null);

    const textareaRef = useRef(null);

    return (
        <>
            {windowState && (
                <Rnd
                    enableUserSelectHack={false}
                    ref={rndRef}
                    position={windowState.position}
                    size={windowState.size}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        const { width, height } = ref.style;

                        addToWindow(id, {
                            size: {
                                width: pxToNum(width),
                                height: pxToNum(height),
                            },
                        });
                    }}
                    onDragStop={(e, { x, y }) => {
                        addToWindow(id, { position: { x, y } });
                        console.log(windowState);
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
                        <div>{JSON.stringify(windowState.position)}</div>
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
                                onChange={(e) =>
                                    addToWindow(id, { value: e.target.value })
                                }
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
