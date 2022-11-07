import { useState, useEffect, useCallback, useRef } from "react";
import type { ProcessProps } from "../contexts/process/useProcessContextState";
import type { WindowStates } from "../contexts/session/useSessionContextState";

import localForage from "localforage";

export interface StoredWindowProps {
    [key: string]: Record<string, ProcessProps> | Record<string, WindowStates>;
    processes: Record<string, ProcessProps>;
    states: Record<string, WindowStates>;
}

type ErrorHandler = (e?: Error) => void;

const defaultErrorHandler: ErrorHandler = (e?: Error) => {
    console.error(e);
};

export function useLocalForage<D>(
    key: string,
    initialValue: D,
    errorHandler?: ErrorHandler
) {
    const [storedValue, setStoredValue] = useState<D | null | StoredWindowProps>(initialValue);
    const [loaded, setLoaded] = useState<boolean>(false);
    const _errorHandler = useRef(
        typeof errorHandler == undefined || errorHandler == null
            ? defaultErrorHandler
            : errorHandler
    );

    const error = (e?: Error) => {
        _errorHandler.current(e);
    };

    useEffect(() => {
        (async function () {
            try {
                const value: D | null = await localForage.getItem(key);
                setStoredValue(value == null ? initialValue : value);
                setLoaded(true);
            } catch (e: any) {
                error(e);
            }
        })();
    }, []);

    const setValue = useCallback(
        (value: StoredWindowProps) => {
            async function set(value: StoredWindowProps) {
                try {
                    setStoredValue(value);
                    await localForage.setItem(key, value);
                } catch (e: any) {
                    error(e);
                }
            }

            set(value);
        },
        [key]
    );

    const removeValue = useCallback(() => {
        async function remove() {
            try {
                setStoredValue(null);
                await localForage.removeItem(key);
            } catch (e: any) {
                error(e);
            }
        }

        remove();
    }, [key]);

    return [storedValue, setValue, removeValue, loaded] as const;
}
