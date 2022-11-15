import contextFactory from "../contextFactory";
import type { AccordionContextState } from "./useAccordionContextState";
import useAccordionContextState from "./useAccordionContextState";

const { Consumer, Provider, useContext } = contextFactory<AccordionContextState>(
    useAccordionContextState
);

export {
  Consumer as AccordionConsumer,
  Provider as AccordionProvider,
  useContext as useAccordion,
};

