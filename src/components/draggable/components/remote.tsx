import React from "react";

import MemoComp from "./MemoComp";

import { useLocalForage } from "@/components/common/hooks/useLocalForage";
import { useProcesses } from "@/components/common/contexts/process/index";
import { useSession } from "@/components/common/contexts/session/index";

import { constants } from "@/components/common/contexts/constants";
import { mergeTwoObject } from "@/lib/common/helpers/helpers";

const Remote = ({}) => {
    const { windowStates, setWindowStates } = useSession();
    const { processes, open } = useProcesses();
    const [snapshot, setSnapshot, removeSnapshot] = useLocalForage<any>(
        "snapshot",
        ""
    );
    const memoRef = React.useRef(0);
    const videoRef = React.useRef(0);

    const saveSnapshot = async () => {
        //await removeSnapshot()
        //console.log({...processes, ...windowStates});
       // console.log([processes,windowStates].flatMap(Object.entries).reduce((o,[k,v])=>({...o,[k]:{...o[k],...v}}),{})

        
        const merged = {processes: {...processes}, states: {...windowStates}};
        console.log(merged)
        setSnapshot(merged);
    };

    const addMemo = () => {
        open(constants.MEMO, 'memo');
        memoRef.current = memoRef.current + 1;
    };

    const addVideo = () => {
        open(constants.VIDEO, 'memo');
        videoRef.current = videoRef.current + 1;
    };

    return (
        <div className="container ">
            {JSON.stringify(processes)}
            <div className="w-96 flex justify-between">
                <button onClick={addMemo}>
                    <p className="text-white">open memo</p>
                </button>
                <button onClick={addVideo}>
                    <p className="text-white">open video</p>
                </button>
                <button onClick={saveSnapshot}>
                    <p className="text-white">savesnapshot</p>
                </button>
            </div>
        </div>
    );
};

export default Remote;
