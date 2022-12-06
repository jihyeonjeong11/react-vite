import { useEffect, useState } from "react";

import { getRooms, getScenarios } from "../../temporal/examFakeClient";

const useNeededInfo = () => {
    const [infoLoading, setInfoLoading] = useState(false);
    const [info, setInfo] = useState({});
    // 나중에 진짜 fetching 클라이언트로 대체
    useEffect(() => {
        (async () => {
            await setInfoLoading(true);
            const rooms = await getRooms();
            const scenarios = await getScenarios();
            await setInfo({ rooms, scenarios });
            await setInfoLoading(false);
            return;
        })();

        return setInfo({})
    }, []);

    return {
        infoLoading,
        info,
    };
};

export default useNeededInfo;
