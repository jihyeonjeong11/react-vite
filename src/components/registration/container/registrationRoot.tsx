import { useState } from "react";

import { useSearchParams, useOutletContext, Outlet } from "react-router-dom";
import Stepper from "../stepper";

const steps = ["기본 정보", "그룹별 설정", "대기 학생", "PA 등록",];

const RegistrationRoot = () => {
    let [searchParams, _] = useSearchParams();
    let [idx, setIdx] = useState(2);

    return (
        <>
            <main className="bg-white w-full">
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
                </div>
            </main>
        </>
    );
};

export default RegistrationRoot;
