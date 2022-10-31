import React from "react";

import Window from "./Window";
import { Rnd } from "react-rnd";
import { useProcesses } from "@/components/common/contexts/process";

const MemoComp = ({ id }: { id: string }) => {
    const {
        processes: { [id]: process },
    } = useProcesses();
    const [position, setPosition] = React.useState({});
    const [size, setSize] = React.useState({});

    const textareaRef = React.useRef(null)

    return (
        <Rnd
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({
                    width: ref.style.width,
                    height: ref.style.height,
                });
            }}
            onDragStop={({ x, y }) => {
                setPosition({ x, y });
            }}
        >
            <div>{("xCoor " + position?.x)}</div>
            <div>{("yCoor " + position?.y)}</div>
            <div>{("width " + size?.width)}</div>
            <div>{("height " + size?.height)}</div>
            <div>{("val " + textareaRef ? textareaRef.current?.value : '')}</div>

            <Window id={id}>
                <textarea
                    placeholder="hello"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    ref={textareaRef}
                ></textarea>
            </Window>
        </Rnd>
    );
};

export default MemoComp;
