import React from "react";

import MemoComp from "./MemoComp";
import { useProcesses } from "@/components/common/contexts/process/index";
import {useSession} from "@/components/common/contexts/session/index";

import {constants} from "@/components/common/contexts/constants";

const Remote = ({}) => {
    const {windowStates, setWindowStates} = useSession();
    const { processes, open } = useProcesses();
    const memoRef = React.useRef(0);
    const videoRef = React.useRef(0);

    const addMemo = () => {
        open(constants.MEMO, MemoComp);
        memoRef.current = memoRef.current + 1;
    };

    const addVideo = () => {
        open(constants.VIDEO, MemoComp);
        videoRef.current = videoRef.current + 1;
    };

    return (
        <div className="container ">
            {JSON.stringify(processes)}
            <div className="w-96 flex justify-between">
                <button onClick={addMemo}><p className="text-white">open memo</p></button>
                <button onClick={addVideo}><p className="text-white">open video</p></button>
            </div>
        </div>
    );
};

export default Remote;
