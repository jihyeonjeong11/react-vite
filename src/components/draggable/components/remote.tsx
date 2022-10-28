import React from "react";
import TestComp from "./testComp";

import { useProcesses } from "@/components/common/contexts/process/index";

const Remote = ({}) => {
    const { processes, open } = useProcesses();
    const memoRef = React.useRef(0);
    const videoRef = React.useRef(0);

    const addMemo = () => {
        open(`memo_${memoRef.current}`, TestComp)
        memoRef.current = memoRef.current + 1;
    };

    const addVideo = () => {
        open(`video_${videoRef.current}`, TestComp)
        videoRef.current = videoRef.current + 1;
    }

    return (
        <div className="container ">
            {JSON.stringify(processes)}
            <div className="w-96 flex justify-between">
                <button onClick={addMemo}>open memo</button>
                <button onClick={addVideo}>open video</button>
            </div>
        </div>
    );
};

export default Remote;
