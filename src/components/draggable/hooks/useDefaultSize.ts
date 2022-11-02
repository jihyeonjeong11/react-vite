import type { Size } from "./useResizable";

import { useMemo } from "react";
import { DEFAULT_WINDOW_SIZE } from "../constants";

const useDefaultSize = (id: string): Size => {


  return useMemo(
    () =>
        DEFAULT_WINDOW_SIZE,
        []
  );
};

export default useDefaultSize;
