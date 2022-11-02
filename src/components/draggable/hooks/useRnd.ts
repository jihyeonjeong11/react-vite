// const useRnd = (id: string, maximized = false): Props => {
//     const
// }

import rndDefaults, {
    RESIZING_DISABLED,
    RESIZING_ENABLED,
} from "../rndDefaults";
import useDraggable from "./useDraggable";
import useResizable from "./useResizable";
import { useProcesses } from "@/components/common/contexts/process";
import type { DraggableEventHandler } from "react-draggable";
import type { Props, RndResizeCallback } from "react-rnd";
import { getWindowViewport, isWindowOutsideBounds } from "../helpers";

//ifram 쓴다면 쓰자.
const enableIframeCapture = (enable = true): void =>
    document.querySelectorAll("iframe").forEach((iframe) => {
        // eslint-disable-next-line no-param-reassign
        iframe.style.pointerEvents = enable ? "initial" : "none";
    });

const useRnd = (id: string, maximized = false): Props => {
    const {
        processes: {
            [id]: {
                allowResizing = true,
                autoSizing = false,
                lockAspectRatio = false,
            } = {},
        },
    } = useProcesses();
    const [size, setSize] = useResizable(id, autoSizing);
    const [position, setPosition] = useDraggable(id, size);
    const onDragStop: DraggableEventHandler = (
        _event,
        { x: positionX, y: positionY }
    ) => {
        enableIframeCapture();

        const newPosition = { x: positionX, y: positionY };

        if (
            !isWindowOutsideBounds(
                { position: newPosition, size },
                getWindowViewport(),
                true
            )
        ) {
            setPosition(newPosition);
        }
    };
    const onResizeStop: RndResizeCallback = (
        _event,
        _direction,
        { style: { height: elementHeight, width: elementWidth } },
        _delta,
        { x: positionX, y: positionY }
    ) => {
        enableIframeCapture();
        setSize({ height: elementHeight, width: elementWidth });
        setPosition({ x: positionX, y: positionY });
    };
    return {
        disableDragging: maximized,
        enableResizing:
            allowResizing && !maximized ? RESIZING_ENABLED : RESIZING_DISABLED,
        lockAspectRatio,
        onDragStart: () => enableIframeCapture(false),
        onDragStop,
        onResizeStart: () => enableIframeCapture(false),
        onResizeStop,
        position,
        size,
        ...rndDefaults,
    };
};

export default useRnd;
