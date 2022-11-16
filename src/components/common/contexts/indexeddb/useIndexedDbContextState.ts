import React, { useCallback, useState, useEffect, useRef } from "react";

import type { Processes } from "../process/useProcessContextState";
import type { WindowStates } from "../session/useSessionContextState";

import localForage from "localforage";

import { dbKey } from "../constants";

export type StoredWindowProps = {
    processes: Processes;
    states: WindowStates;
};

export type IndexedDbContextState = {
    storedValue: null | StoredWindowProps;
    dbLoaded: boolean;
    removeValue: () => void;
    setValue: (value: StoredWindowProps) => void;
};

type ErrorHandler = (e?: Error) => void;

const defaultErrorHandler: ErrorHandler = (e?: Error) => {
    console.error(e);
};

const useIndexedDbContextState = (): IndexedDbContextState => {
    const [storedValue, setStoredValue] = useState<null | StoredWindowProps>(
        null
    );
    const [dbLoaded, setDbLoaded] = useState<boolean>(false);

    const _errorHandler = useRef(
        typeof defaultErrorHandler == undefined || defaultErrorHandler == null
            ? defaultErrorHandler
            : defaultErrorHandler
    );

    const error = (e?: Error) => {
        _errorHandler.current(e);
    };

    useEffect(() => {
        (async function () {
            try {
                const value: StoredWindowProps | null =
                    await localForage.getItem(dbKey);
                    console.log('value', value)

                if (value !== null) setStoredValue(value);
                setDbLoaded(true);
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
                    await localForage.setItem(dbKey, value);
                } catch (e: any) {
                    error(e);
                }
            }

            set(value);
        },
        [dbKey]
    );

    const removeValue = useCallback(
        () => {
            async function remove() {
                try {
                    setStoredValue(null);
                    await localForage.removeItem(dbKey);
                } catch (e: any) {
                    error(e);
                }
            }

            remove();
        },
        [dbKey]
    );

    return {
        dbLoaded,
        storedValue,
        setValue,
        removeValue,
    };
};

export default useIndexedDbContextState;
