import React from "react";

import { useSearchParams, useOutletContext } from "react-router-dom";
import Stepper from "../components/stepper";

const steps = ["basic", "hobbys", "social", "else", "someping", "stubs"];

const RegistrationRoot = () => {
    
    let [searchParams, _] = useSearchParams();
    let [idx, setIdx] = React.useState(1);

    // let [user, setUser] = useOutletContext('eee');


    return (
        <React.Fragment>
            <div className="w-[calc(100vw_-_16rem)]">
                <Stepper steps={steps} currentStep={idx} />
                <div className="mb-10" />
                <div>registration main page</div>
                <div
                    onClick={() => {
                        setIdx(idx + 1);
                    }}
                >
                    다음
                </div>
                <div
                    onClick={() => {
                        setIdx(idx - 1);
                    }}
                >
                    이전
                </div>
                
            </div>
        </React.Fragment>
    );
};

export default RegistrationRoot;
