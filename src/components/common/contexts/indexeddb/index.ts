import contextFactory from "../contextFactory";
import type { IndexedDbContextState } from "./useIndexedDbContextState";
import useIndexedDbContextState from "./useIndexedDbContextState";

const { Consumer, Provider, useContext } = contextFactory<IndexedDbContextState>(
    useIndexedDbContextState
);

export {
  Consumer as IndexedDbConsumer,
  Provider as IndexedDbProvider,
  useContext as useIndexedDb,
};

