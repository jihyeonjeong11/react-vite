import { useCallback, useState } from "react";
import type { Position } from "react-rnd";

export interface WindowState {
    maximized?: boolean;
    position?: Position;
    size?: any;
}

export type WindowStates = Record<string, WindowState>;

// export type SessionContextState = {
//     processes: Session;
//     open: (id: string, component: React.FC) => void;
//     close: (id: string) => void;
// };

const useSessionContextState = (): WindowStates => {
    const [WindowState, setWindowState] = useState<WindowStates>(
        {} as WindowStates
    );

    return {
        WindowState,

    };
};

export default useSessionContextState;
