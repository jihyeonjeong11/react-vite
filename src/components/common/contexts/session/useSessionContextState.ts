import React, { useCallback, useState, useEffect } from "react";
import type { Position } from "react-rnd";
import type { StoredWindowProps } from "../../hooks/useLocalForage";
import { useNavigate } from "react-router-dom";

import { useProcesses } from "../process/index";
import { useLocalForage } from "../../hooks/useLocalForage";
import { useIndexedDb } from "../indexeddb";

// 나중에 Process와 네이밍 맞출것



export type WindowProps = {
    position: Position;
    size: { width: number; height: number };
    value: string;
};



export type WindowStates = Record<string, WindowProps>;

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
    addToWindow: (id: string, data: Partial<WindowProps>) => void;
    removeFromWindow: (id: string) => void;
};

const useSessionContextState = (): SessionContextState => {
    const { processes, setProcesses } = useProcesses();
    const [windowStates, setWindowStates] = useState<WindowStates>({});

    const { dbLoaded, storedValue } = useIndexedDb();

    React.useEffect(() => {
        if (processes) {
            const ids = Object.keys(processes);
            let result: WindowStates = {};
            ids.forEach((k) => {
                if (processes[k] && !windowStates[k])
                    if (dbLoaded && storedValue && storedValue.states[k]) {
                        result[k] = storedValue.states[k];
                    } else if (
                        dbLoaded &&
                        storedValue &&
                        !storedValue.states[k]
                    ) {
                        result[k] = {
                            position: { x: 0, y: 0 },
                            size: { width: 250, height: 250 },
                            value: "",
                        };
                    }

                if (!processes[k] && windowStates[k]) delete result[k];

            });

            setWindowStates({ ...windowStates, ...result });
        }
    }, [processes, setProcesses, dbLoaded]);

    const addToWindow = (id: string, data: Partial<WindowProps>) => {
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
        addToWindow,
        removeFromWindow,
    };
};

export default useSessionContextState;


// export interface WindowState {
//     position?: Position;
//     size: { width: number; height: number };
// }

// export type MemoState = WindowState & {
//     value?: string;
// };

// // export type Processes = Record<string, ProcessProps>;

// // export interface VideoState extends WindowState {
// //     srcUrl?: string;
// // }