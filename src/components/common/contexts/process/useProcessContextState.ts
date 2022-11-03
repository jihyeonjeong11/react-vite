import React, { useCallback, useState } from "react";

import { useLocalForage } from "../../hooks/useLocalForage";

export interface Process {
    id?: string;
    component: React.FunctionComponent;
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

/**
 * @param {string} type - memo or video currenyly
 * @param {Processes} processes - 프로세스 오브젝트
 * @return {string} id
 */

const createUniquePID = (type: string, processes: Processes) => {
    const arr = Object.keys(processes);
    if(!arr.length) return `${type}__${1}`;
    const [first] = arr
    return `${type}__${Number(first.at(-1)) + 1}`;
};

const useProcessContextState = (): ProcessContextState => {
    const [processes, setProcesses] = useState<Processes>({} as Processes);
    const [snapshot, setSnapshot, removeSnapshot] = useLocalForage<any>('snapshot', '');

    // React.useEffect(() => {
    //     console.log('from process', snapshot)
    //     if(snapshot.processes){
    //         setProcesses(snapshot.processes)
    //     }
    // }, [])

    const open = (type: string, component: React.FC) => {
        const id = createUniquePID(type, processes);
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
