import React, { useCallback, useState, useEffect } from "react";
import type { Position } from "react-rnd";

import { useProcesses } from "../process/index";

export interface WindowState {
    maximized?: boolean;
    position?: Position;
    size: {width: number, height: number};
}

export interface MemoState extends WindowState {
    value?: string;
}

export interface VideoState extends WindowState {
    srcUrl?: string;
}

export type WindowStates = Record<string, MemoState | VideoState>;

export type SessionData = {
    // clockSource: ClockSource;
    // iconPositions: IconPositions;
    // runHistory: string[];
    // sortOrders: SortOrders;
    // themeName: ThemeName;\
    // wallpaperFit: WallpaperFit;
    // wallpaperImage: string;
    windowStates: WindowStates;
};

export type SessionContextState = SessionData & {
    addToWindow: React.Dispatch<React.SetStateAction<{id: string, data: WindowStates}>>;
    removeFromWindow: React.Dispatch<React.SetStateAction<{id: string}>>;

};

// export type SessionContextState = {
//     processes: Session;
//     open: (id: string, component: React.FC) => void;
//     close: (id: string) => void;
// };

const useSessionContextState = (): SessionContextState => {
    const { processes } = useProcesses();
    const [windowStates, setWindowStates] = useState<WindowStates>({});

    const addToWindow = (id: string, data: WindowStates) => {
        console.log(id, data)
        console.log({ ...windowStates, [id]: {...windowStates[id], ...data} })
        return setWindowStates({ ...windowStates, [id]: {...windowStates[id], ...data} });
    };

    // setProcesses({
    //     [id]: { id: id, component: component },
    //     ...processes,
    // });

    const removeFromWindow = (id: string) => {
        return setWindowStates(
            Object.fromEntries(
                Object.entries(windowStates).filter(
                    ([key]) => !key.includes(id)
                )
            )
        );
    };

    return {
        windowStates,
        setWindowStates,
        addToWindow,
        removeFromWindow,
    };
};

export default useSessionContextState;
