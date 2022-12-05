import { useCallback, useEffect } from "react";
import type { DialogTypes } from "../../dialog/constants";
import { useSafeState } from "../../hooks/useSafeState";
import { useFetch } from "@/components/common/hooks/useFetch";

export type DialogsContextState = {
    dialogType: DialogTypes;
    setDialogs: (type: DialogTypes) => void;
    turnOff: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const useDialogsContextState = (): DialogsContextState => {
    // response, error, loading
    const {response: rooms, error: roomsError, loading: roomsLoading} = useFetch("/rooms");

    // useEffect(() => {
    //     (() => {
    //         if(!rooms.data && !roomsLoading) 
             
    //     })(); 
    // }, [rooms, roomsError, roomsLoading]);

    // 다이얼로그 로직 실행 중 상태
    const [loading, setLoading] = useSafeState<boolean>(false);



    // 현재 활성화된 다이얼로그 타입
    const [dialogType, setDialogType] = useSafeState<DialogTypes>("inactive");
    // 다이얼로그 타입 전환
    const setDialogs = useCallback(
        (type: DialogTypes) => {
            return setDialogType(type == dialogType ? "inactive" : type);
        },
        [dialogType]
    );
    // 다이얼로그 비활성화 처리
    const turnOff = useCallback(() => {
        return setDialogType("inactive");
    }, []);

    const [stepOne, setStepOne] = useSafeState('type')
    const [stepTwo, setStepTwo] = useSafeState('type')

    return {
        dialogType,
        setDialogs,
        turnOff,
        loading,
        setLoading,
        stepOne,
        setStepOne,
        setStepTwo, stepTwo
    };
};

export default useDialogsContextState;
