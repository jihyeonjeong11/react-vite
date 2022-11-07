import React, { useCallback, useState } from "react";

import type { StoredWindowProps } from "../../hooks/useLocalForage";

import { useLocalForage } from "../../hooks/useLocalForage";
import { useIndexedDb } from "../indexeddb";

export type ProcessProps = {
    id: string;
    component: string;
    minimized: boolean;
    maximized: boolean;
    lockAspectRatio: boolean;
    allowResizing: boolean;
    autoSizing: boolean;
};

export type Processes = Record<string, ProcessProps>;

export type ProcessContextState = {
    processes: Processes;
    open: (id: string, component: string, isStored: boolean) => void;
    close: (id: string) => void;
    setProcesses: React.Dispatch<React.SetStateAction<Processes>>;
};

/**
 * @param {string} type - memo or video currenyly
 * @param {Processes} processes - 프로세스 오브젝트
 * @return {string} id
 */

const createUniquePID = (type: string, processes: Processes) => {
    const arr = Object.keys(processes);
    if (!arr.length) return `${type}__${1}`;
    const [first] = arr;
    return `${type}__${Number(first.at(-1)) + 1}`;
};

const useProcessContextState = (): ProcessContextState => {
    const [processes, setProcesses] = useState<Processes>({} as Processes);
    const {dbLoaded, storedValue} = useIndexedDb();

    React.useEffect(() => {
        if (dbLoaded) openStoredProcesses();
    }, [dbLoaded]);

    const openStoredProcesses = async () => {
        if (storedValue !== null && storedValue.processes) {
            console.log(storedValue)
            let result: Processes = {};
            for (let [k, v] of Object.entries(storedValue.processes)) {
                result[k] = v;
            }
            setProcesses(result);
        }
    };

    const open = (type: string, component: string, isStored: boolean) => {
        const id = isStored ? type : createUniquePID(type, processes);
        return setProcesses({
            [id]: {
                id: id,
                component: component,
                minimized: false,
                maximized: false,
                lockAspectRatio: false,
                allowResizing: false,
                autoSizing: false,
            },
            ...processes,
        });
    };

    const close = (id: string) => {
        return setProcesses(
            Object.fromEntries(
                Object.entries(processes).filter(([key]) => !key.includes(id))
            )
        );
    };

    return {
        processes,
        setProcesses,
        open,
        close,
    };
};

export default useProcessContextState;
