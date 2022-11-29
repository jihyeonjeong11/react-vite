import { createContext } from "react";

import CustomTable from "./CustomTable";
import CustomTableHead from "./CustomTableHead";
import { CustomTH } from "./CustomTrTH";
import { CustomTR, CustomTD } from "./CustomTableTRTD";

import styles from "@/styles/table.module.css";

interface TableContextState {
    activeLayout: string;
    setActiveLayout: (prevLayout: string) => void;
}

const tableContext = createContext<TableContextState | null>(null);

export function Table({ children, ...rest }: ComponentWithChildrenProps) {
    return <CustomTable {...rest}>{children}</CustomTable>;
}

Table.Head = ({ children, ...rest }: ComponentWithChildrenProps) => {
    return <CustomTableHead {...rest}>{children}</CustomTableHead>;
};

Table.TB = ({ children, ...rest }: ComponentWithChildrenProps) => {
    return <tbody {...rest}>{children}</tbody>;
};

Table.TH = ({ children, ...rest }: ComponentWithChildrenProps) => {
    return <CustomTH {...rest}>{children}</CustomTH>;
};

Table.TR = ({ children, ...rest }: ComponentWithChildrenProps) => {
    return <CustomTR {...rest}>{children}</CustomTR>;
};

Table.TD = ({ children, ...rest }: ComponentWithChildrenProps) => {
    return <CustomTD {...rest}>{children}</CustomTD>;
};

// Table.Foot = ({ children, ...rest }) => {
//   return <TFoot {...rest}>{children}</TFoot>;
// };

