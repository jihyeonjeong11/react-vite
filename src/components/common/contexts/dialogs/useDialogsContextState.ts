import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSafeState } from "../../hooks/useSafeState";

export const Dialogs = {
    Inactive: "inactive",
    MainExam: "mainExam",
} as const;

export type DialogTypes = typeof Dialogs[keyof typeof Dialogs];

export type DialogsContextState = {
    dialogType: DialogTypes;
    setDialogs: (type: DialogTypes) => void;
};

const useDialogsContextState = (): DialogsContextState => {
    const [dialogType, setDialogType] = useSafeState<DialogTypes>(
        Dialogs.Inactive
    );

    const setDialogs = React.useCallback(
        (type: DialogTypes) => {
            return setDialogType(
                type == dialogType ? Dialogs.Inactive : type
            );
        },
        [dialogType]
    );

    return {
        dialogType,
        setDialogs,
    };
};

export default useDialogsContextState;
