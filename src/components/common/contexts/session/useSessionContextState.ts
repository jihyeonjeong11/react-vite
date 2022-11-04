import React, { useCallback, useState, useEffect } from "react";
import type { Position } from "react-rnd";
import { useNavigate } from "react-router-dom";

import { useProcesses } from "../process/index";
import { useLocalForage } from "../../hooks/useLocalForage";

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
    const [snapshot, setSnapshot, removeSnapshot, loaded] = useLocalForage<any>(
        "snapshot",
        ""
    );

    React.useEffect(() => {
        if (processes) {
            const ids = Object.keys(processes);
            let result = {};
            ids.forEach((k) => {
                if (processes[k] && !windowStates[k])
                    if(loaded && snapshot.states[k]) result[k] = snapshot.states[k]
                    // result[k] = {
                    //     position: { x: 0, y: 0 },
                    //     size: { width: 250, height: 250 },
                    //     value: "",
                    // };
                if (!processes[k] && windowStates[k]) delete result[k];

                null;
            });
            setWindowStates({ ...windowStates, ...result });
        }
    }, [processes, setProcesses, loaded]);

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

    const save = () => {};

    return {
        windowStates,
        setWindowStates,
        addToWindow,
        removeFromWindow,
    };
};

export default useSessionContextState;
