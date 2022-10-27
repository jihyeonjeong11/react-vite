import React from "react";

import { ProcessConsumer } from "@/components/common/contexts/process/index";

import Remote from "../components/remote";

const DraggableRoot = () => {
    return (
        <div>
            <Remote />
            <ProcessConsumer>
                    {({ processes = {} }) => {
                        return (
                            <div>
                                {Object.entries(processes).map(
                                    ([id]) => id && id.includes('memo') ? <textarea className="w-10 bg-yellow-300" key={id} placeholder="memo" />
                                                    : <div className="w-10 bg-orange-300">video player</div>
                                )}
                            </div>
                        );
                    }}
            </ProcessConsumer>
        </div>
    );
};

export default DraggableRoot;
