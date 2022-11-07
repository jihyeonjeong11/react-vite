import React, { useMemo, useState, useLayoutEffect } from "react";
import type { Props } from "react-rnd";

import { useSession } from "@/components/common/contexts/session/index";
import { useProcesses } from "@/components/common/contexts/process";
import useMinMaxRef from "./useMinMaxRef";
import useDefaultSize from "./useDefaultSize";
import { maxSize } from "../helpers";

export type Size = NonNullable<Props["size"]>;

type Resizable = [Size, React.Dispatch<React.SetStateAction<Size>>];

const useResizable = (id: string, autoSizing = false): Resizable => {
    const defaultSize = useDefaultSize(id);
    const {
        windowStates: { [id]: { size: stateSize = defaultSize } = {} } = {},
    } = useSession();
    const {
        processes: { [id]: { lockAspectRatio = false } = {} },
    } = useProcesses();
    const [size, setSize] = useState<Size>(() =>
        maxSize(stateSize, lockAspectRatio)
    );
    const blockAutoSizeRef = useMinMaxRef(id);

    useLayoutEffect(() => {
        if (autoSizing && !blockAutoSizeRef.current) {
            setSize(maxSize(stateSize, lockAspectRatio));
        }
    }, [autoSizing, blockAutoSizeRef, lockAspectRatio, stateSize]);

    return [size, setSize];
};

export default useResizable;
