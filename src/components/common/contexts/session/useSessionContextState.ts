import React, { useCallback, useState, useEffect } from "react";
import type { Position } from "react-rnd";

import { useProcesses } from "../process/index";

export interface WindowState {
    maximized?: boolean;
    position?: Position;
    size?: any;
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
    // themeName: ThemeName;
    // wallpaperFit: WallpaperFit;
    // wallpaperImage: string;
    windowStates: WindowStates;
};

export type SessionContextState = SessionData & {
    setWindowStates: React.Dispatch<React.SetStateAction<WindowStates>>;
};

// export type SessionContextState = {
//     processes: Session;
//     open: (id: string, component: React.FC) => void;
//     close: (id: string) => void;
// };

const useSessionContextState = (): SessionContextState => {
    const { processes } = useProcesses();
    const [windowStates, setWindowStates] = useState<WindowStates>({});

    return {
        windowStates,
        setWindowStates,
    };
};

export default useSessionContextState;
