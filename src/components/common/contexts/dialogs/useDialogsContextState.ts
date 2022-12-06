import { useCallback, useEffect } from "react";
import type { DialogTypes } from "../../dialog/constants";
import { useSafeState } from "../../hooks/useSafeState";
import { useFetch } from "@/components/common/hooks/useFetch";

import { getRooms, getScenarios, RoomsType, ScenariosType } from "../../temporal/examFakeClient";
import { composePromise } from "@/lib/common/helpers/helpers";

export type DialogsContextState = {
    dialogType: DialogTypes;
    setDialogs: (type: DialogTypes) => void;
    turnOff: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    neededInfo: {rooms: RoomsType, scenarios: ScenariosType} | {}
};

const useDialogsContextState = (): DialogsContextState => {
    // response, error, loading

    // 다이얼로그 로직 실행 중 상태
    const [loading, setLoading] = useSafeState<boolean>(false);

    // 현재 활성화된 다이얼로그 타입
    const [dialogType, setDialogType] = useSafeState<DialogTypes>("inactive");

    const [neededInfo, setNeededInfo] = useSafeState({});

    // 룸, 시나리오 받아오는 로직. dialog 하위가 생성될 떄 돌아감..

    useEffect(() => {
        (async () => {
            if (dialogType !== "subExam") return;
            const sum = await composePromise(
                (merged: {rooms: RoomsType}) => setNeededInfo(merged),
                getScenarios,
                getRooms,
            );
            await setLoading(true)
            await sum('not used key').catch(console.log).finally(async () =>await setLoading(false));
        })();
    }, [setDialogType, dialogType]);

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

    const [stepOne, setStepOne] = useSafeState("type");
    const [stepTwo, setStepTwo] = useSafeState("type");

    return {
        dialogType,
        setDialogs,
        turnOff,
        loading,
        setLoading,
        stepOne,
        setStepOne,
        setStepTwo,
        stepTwo,
        neededInfo
    };
};

export default useDialogsContextState;
