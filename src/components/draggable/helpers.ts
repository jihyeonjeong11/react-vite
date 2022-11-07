import type { Size } from "./hooks/useResizable";
import type { WindowState } from "../common/contexts/session/useSessionContextState";
import type { Position } from "react-rnd";

import { TASKBAR_HEIGHT } from "./constants";
import { viewHeight, viewWidth, pxToNum } from "@/lib/common/helpers/helpers";

export const WINDOW_OFFSCREEN_BUFFER_PX = {
    BOTTOM: 15,
    LEFT: 150,
    RIGHT: 50,
    TOP: 15,
};

export const getWindowViewport = (): { x: number; y: number } => ({
    x: viewWidth(),
    y: viewHeight() - TASKBAR_HEIGHT,
});

export const maxSize = (size: Size, lockAspectRatio: boolean): Size => {
    const desiredHeight = Number(size.height);
    const desiredWidth = Number(size.width);
    const [vh, vw] = [viewHeight(), viewWidth()];
    const vhWithoutTaskbar = vh - TASKBAR_HEIGHT;
    const height = Math.min(desiredHeight, vhWithoutTaskbar);
    const width = Math.min(desiredWidth, vw);

    if (!lockAspectRatio) return { height, width };

    const isDesiredHeight = desiredHeight === height;
    const isDesiredWidth = desiredWidth === width;

    if (!isDesiredHeight && !isDesiredWidth) {
        if (desiredHeight > desiredWidth) {
            return {
                height,
                width: Math.round(width / (vhWithoutTaskbar / height)),
            };
        }

        return {
            height: Math.round(height / (vw / width)),
            width,
        };
    }

    if (!isDesiredHeight) {
        return {
            height,
            width: Math.round(width / (desiredHeight / height)),
        };
    }

    if (!isDesiredWidth) {
        return {
            height: Math.round(height / (desiredWidth / width)),
            width,
        };
    }

    return { height, width };
};

export const isWindowOutsideBounds = (
    windowState: WindowState,
    bounds: Position,
    checkOffscreen = false
): boolean => {
    const { position, size } = windowState || {};
    const { x = 0, y = 0 } = position || {};
    const { height = 0, width = 0 } = size || {};

    if (checkOffscreen) {
        return (
            x + WINDOW_OFFSCREEN_BUFFER_PX.RIGHT > bounds.x ||
            x + pxToNum(width) - WINDOW_OFFSCREEN_BUFFER_PX.LEFT < 0 ||
            y + WINDOW_OFFSCREEN_BUFFER_PX.BOTTOM > bounds.y ||
            y + WINDOW_OFFSCREEN_BUFFER_PX.TOP < 0
        );
    }

    return (
        x < 0 ||
        y < 0 ||
        x + pxToNum(width) > bounds.x ||
        y + pxToNum(height) > bounds.y
    );
};
