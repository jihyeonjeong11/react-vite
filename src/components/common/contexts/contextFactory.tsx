import React, { createContext, useContext, FC } from "react";

const contextFactory = <T,>(
    useContextState: () => T,
    ContextComponent?: React.ComponentType
): {
    Consumer: React.Consumer<T>;
    Provider: React.FC<{ children: React.ReactNode; }>;
    useContext: () => T;
} => {
    const Context = createContext<T>({} as T);
    const ProcessProvider: FC<{children: React.ReactNode}> = ({ children }) => (
        <Context.Provider value={useContextState()}>
            {children}
            {ContextComponent ? <ContextComponent /> : <></>}
        </Context.Provider>
    );

    return {
        Consumer: Context.Consumer,
        Provider: ProcessProvider,
        useContext: () => useContext(Context),
    };
};

export default contextFactory;
