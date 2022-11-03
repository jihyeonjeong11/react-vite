import React, { useCallback, useState, useEffect } from "react";
import type { Position } from "react-rnd";
import { useNavigate } from "react-router-dom";

import { useProcesses } from "../process/index";

export interface WindowState {
    maximized?: boolean;
    position?: Position;
    size: { width: number; height: number };
}

export type MemoState = WindowState & {
    value?: string;
};

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
    addToWindow: React.Dispatch<
        React.SetStateAction<{ id: string; data: WindowStates }>
    >;
    removeFromWindow: React.Dispatch<React.SetStateAction<{ id: string }>>;
};

// export type SessionContextState = {
//     processes: Session;
//     open: (id: string, component: React.FC) => void;
//     close: (id: string) => void;
// };

const useSessionContextState = (): SessionContextState => {
    const { processes, setProcesses } = useProcesses();
    const [windowStates, setWindowStates] = useState<WindowStates>({});

    React.useEffect(() => {
        if (processes) {
            const ids = Object.keys(processes);
            ids.forEach((k) => {
                return processes[k] && !windowStates[k]
                    ? addToWindow(k, {
                          position: { x: 0, y: 0 },
                          size: { width: 250, height: 250 },
                          value: "",
                      })
                    : !processes[k] && windowStates[k]
                    ? removeFromWindow(k)
                    : null;
            });
        }
    }, [processes, setProcesses]);

    const addToWindow = (id: string, data: WindowStates) => {
        //console.log(id, windowStates[id])
        return setWindowStates({
            ...windowStates,
            [id]: { ...windowStates[id], ...data },
        });
    };

    const removeFromWindow = (id: string) => {
        return setWindowStates(
            Object.fromEntries(
                Object.entries(windowStates).filter(
                    ([key]) => !key.includes(id)
                )
            )
        );
    };

    const save = () => {

    }

    return {
        windowStates,
        setWindowStates,
        addToWindow,
        removeFromWindow,
    };
};

export default useSessionContextState;
