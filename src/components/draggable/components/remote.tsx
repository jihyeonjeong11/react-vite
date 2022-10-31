import React from "react";

import MemoComp from "./MemoComp";
import { useProcesses } from "@/components/common/contexts/process/index";

const Remote = ({}) => {
    const { processes, open } = useProcesses();
    const memoRef = React.useRef(0);
    const videoRef = React.useRef(0);

    const addMemo = () => {
        open(`memo_${memoRef.current}`, MemoComp);
        memoRef.current = memoRef.current + 1;
    };

    const addVideo = () => {
        open(`video_${videoRef.current}`, MemoComp);
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
