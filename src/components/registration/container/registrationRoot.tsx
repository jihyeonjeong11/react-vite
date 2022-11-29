import { useState } from "react";

import { useSearchParams, useOutletContext, Outlet } from "react-router-dom";
import Stepper from "../stepper";

const steps = ["basic", "hobbys", "social", "else", "someping", "stubs"];

const RegistrationRoot = () => {
    let [searchParams, _] = useSearchParams();
    let [idx, setIdx] = useState(1);

    // let [user, setUser] = useOutletContext('eee');

    return (
        <>
            <main className="w-[calc(100vw_-_16rem)]">
                <div className="container flex flex-col items-center">
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
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default RegistrationRoot;
