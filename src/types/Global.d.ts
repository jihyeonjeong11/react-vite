import React from "react";

export {};

declare global {
    interface ComponentWithChildrenProps {
        children: (React.ReactNode & { type: { name: string } })[] | React.ReactNode;
        onCheck?: (e: React.SyntheticEvent, index: number) => void;
        className?: string;
        style?: any;
    }
}
