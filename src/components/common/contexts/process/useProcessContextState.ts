import { useCallback, useState } from "react";

export interface Process {
    id?: string;
    component: React.FunctionComponent;
}

export type Processes = Record<string, Process>;

export type ProcessContextState = {
    processes: Processes;
    open: (id: string, component: React.FC) => void;
    close: (id: string) => void;
};

/**
 * @param {string} type - memo or video currenyly
 * @param {Processes} processes - 프로세스 오브젝트
 * @return {string} id
 */

const createUniquePID = (type: string, processes: Processes) => {
    const existingProcess = Object.keys(processes).filter(([key]) =>
        type.includes(key)
    );
    return `${type}__${existingProcess.length}`;
};

const useProcessContextState = (): ProcessContextState => {
    const [processes, setProcesses] = useState<Processes>({} as Processes);
    const open = (type: string, component: React.FC) => {
        const id = createUniquePID(type, processes);
        return setProcesses({
            [id]: { id: id, component: component },
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
        open,
        close,
    };
};

export default useProcessContextState;
