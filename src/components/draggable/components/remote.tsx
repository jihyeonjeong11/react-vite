import React from "react";

import MemoComp from "./MemoComp";
import type { StoredWindowProps } from "@/components/common/contexts/indexeddb/useIndexedDbContextState";

import { useIndexedDb } from "@/components/common/contexts/indexeddb";
import { useProcesses } from "@/components/common/contexts/process/index";
import { useSession } from "@/components/common/contexts/session/index";

import { constants } from "@/components/common/contexts/constants";
import { mergeTwoObject } from "@/lib/common/helpers/helpers";

const Remote = ({}) => {
    const { windowStates } = useSession();
    const { processes, open } = useProcesses();
    const { dbLoaded, storedValue, setValue } = useIndexedDb();

    const saveSnapshot = () => {
        //await removeSnapshot()
        //console.log({...processes, ...windowStates});
        // console.log([processes,windowStates].flatMap(Object.entries).reduce((o,[k,v])=>({...o,[k]:{...o[k],...v}}),{})
        const merged: StoredWindowProps = {
            processes: { ...processes },
            states: { ...windowStates },
        };
        setValue(merged);
    };

    const addMemo = () => {
        open(constants.MEMO, "memo", false);
    };

    const addVideo = () => {
        open(constants.VIDEO, "memo", false);
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
