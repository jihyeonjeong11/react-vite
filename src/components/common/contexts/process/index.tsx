import contextFactory from "../contextFactory";
import type { ProcessContextState } from "./useProcessContextState";
import useProcessContextState from "./useProcessContextState";

const { Consumer, Provider, useContext } = contextFactory<ProcessContextState>(
  useProcessContextState
);

export {
  Consumer as ProcessConsumer,
  Provider as ProcessProvider,
  useContext as useProcesses,
};
