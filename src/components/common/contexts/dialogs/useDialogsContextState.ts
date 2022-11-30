import { useCallback, useState, useEffect, useRef } from "react";
import { useSafeState } from "../../hooks/useSafeState";

export const Dialogs = {
    Inactive: "inactive",
    MainExam: "mainExam",
} as const;

export type DialogTypes = typeof Dialogs[keyof typeof Dialogs];

export type DialogsContextState = {
    dialogType: DialogTypes;
    setDialogs: (type: DialogTypes) => void;
    turnOff: () => void;
};

const useDialogsContextState = (): DialogsContextState => {
    const [dialogType, setDialogType] = useSafeState<DialogTypes>(
        Dialogs.Inactive
    );

    const setDialogs = useCallback(
        (type: DialogTypes) => {
            return setDialogType(
                type == dialogType ? Dialogs.Inactive : type
            );
        },
        [dialogType]
    );

    const turnOff = useCallback(
        () => {
            return setDialogType(
                Dialogs.Inactive
            );
        },
        [dialogType]
    )

    return {
        dialogType,
        setDialogs,
        turnOff
    };
};

export default useDialogsContextState;
