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

const useProcessContextState = (): ProcessContextState => {
    const [processes, setProcesses] = useState<Processes>({} as Processes);
    const open = ((id: string, component: React.FC) => {
        return setProcesses({ [id]: { id: id, component: component }, ...processes });
    });

    const close = ((id: string) => {
        return setProcesses(Object.fromEntries(Object.entries(processes).filter(([key]) => !key.includes(id))))
    })

    return {
        processes,
        open,
        close
    };
};

export default useProcessContextState;
