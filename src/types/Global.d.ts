import React from "react";

export {};

const windowTypes = {
    memo: 'memo',
    video: 'video',
} as const;

declare global {
    interface ComponentWithChildrenProps {
        children: (React.ReactNode & { type: { name: string } })[] | React.ReactNode;
        onCheck?: (e: React.SyntheticEvent, index: number) => void;
        className?: string;
        style?: any;
        type?: windowTypes;
        id?: string;
    }
}
