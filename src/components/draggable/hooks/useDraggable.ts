import React, { useCallback, useMemo, useState } from "react";
import type { DraggableEventHandler } from "react-draggable";
import type { Position, Props, RndResizeCallback } from "react-rnd";

type DraggableProps = [
    Position,
    React.Dispatch<React.SetStateAction<Position>>
];

const useDraggable = (
    maximized = false,
    position: Position
): DraggableProps => {
    const [{ x, y }, setPosition] = useState<Position>({ x: 0, y: 0 });

    return [
        {
            x: maximized ? 0 : x,
            y: maximized ? 0 : y,
        },
        setPosition,
    ];
};

export default useDraggable;
