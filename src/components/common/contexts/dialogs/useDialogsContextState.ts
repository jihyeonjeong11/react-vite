import { useCallback } from "react";
import type { DialogTypes } from "../../dialog/constants";
import { useSafeState } from "../../hooks/useSafeState";

export type DialogsContextState = {
    dialogType: DialogTypes;
    setDialogs: (type: DialogTypes) => void;
    turnOff: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const useDialogsContextState = (): DialogsContextState => {
    // 다이얼로그 로직 실행 중 상태
    const [loading, setLoading] = useSafeState<boolean>(false);
    
    // 현재 활성화된 다이얼로그 타입
    const [dialogType, setDialogType] = useSafeState<DialogTypes>(
        "inactive"
    );
    // 다이얼로그 타입 전환
    const setDialogs = useCallback(
        (type: DialogTypes) => {
            return setDialogType(
                type == dialogType ? "inactive" : type
            );
        },
        [dialogType]
    );
    // 다이얼로그 비활성화 처리
    const turnOff = useCallback(
        () => {
            console.log("inacive")
            return setDialogType(
                "inactive"
            );
        },
        []
    );

    return {
        dialogType,
        setDialogs,
        turnOff,
        loading,
        setLoading
    };
};

export default useDialogsContextState;
