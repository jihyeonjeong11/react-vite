import contextFactory from "../contextFactory";
import type { DialogsContextState } from "./useDialogsContextState";
import useDialogsContextState from "./useDialogsContextState";

const { Consumer, Provider, useContext } = contextFactory<DialogsContextState>(
    useDialogsContextState
);

export {
    Consumer as DialogsConsumer,
    Provider as DialogsProvider,
    useContext as useDialogsContextState,
};
