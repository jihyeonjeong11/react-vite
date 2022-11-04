import React, { useCallback, useState } from "react";

import localforage from "localforage";

import { useLocalForage } from "../../hooks/useLocalForage";
import MemoComp from "@/components/draggable/components/MemoComp";


export interface Process {
    id?: string;
    component: string;
    minimized: boolean;
    maximized: boolean;
    lockAspectRatio: boolean;
    allowResizing: boolean;
    autoSizing: boolean;
}

export type Processes = Record<string, Process>;

export type ProcessContextState = {
    processes: Processes;
    open: (id: string, component: React.FC) => void;
    close: (id: string) => void;
    setProcesses: React.Dispatch<React.SetStateAction<any>>;
};

export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

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
    const [snapshot, setSnapshot, removeSnapshot, loaded] = useLocalForage<any>(
        "snapshot",
        ""
    );

    React.useEffect(() => {
        
        if(loaded) openStoredProcesses();
    }, [loaded]);

    const openStoredProcesses = async() => {
        if(snapshot.processes){
            let result = {};
            for (let [k, v] of Object.entries(snapshot.processes) as Entries<Process>){
                result[k] = v
            }
            setProcesses(result)
        }
        
    }

    const open = (type: string, component: React.FC, isStored: boolean) => {
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
