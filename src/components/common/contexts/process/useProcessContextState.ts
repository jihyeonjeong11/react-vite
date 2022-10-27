import { useCallback, useState } from "react";
import TestComp from "@/components/draggable/components/testComp";

export interface Process {
    id?: string;
    component?: React.FC;
}

export type Processes = Record<string, Process>;

export type ProcessContextState = {
    processes: Processes;
    open: (id: string, component: React.FC) => void;
};

const useProcessContextState = (): ProcessContextState => {
    const [processes, setProcesses] = useState<Processes>(Object.create(null) as Processes);
    const open = ((id: string, component: React.FC) => {
        return setProcesses({ [id]: { id: id, component: component }, ...processes });
    });

    return {
        processes,
        open,
    };
};

export default useProcessContextState;
