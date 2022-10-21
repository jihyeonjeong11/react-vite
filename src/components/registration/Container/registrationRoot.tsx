import React from "react";

import { useSearchParams, Outlet, useOutletContext } from "react-router-dom";
import Stepper from "../components/stepper";
import BasicExamInfo from '../components/basicExamInfo';

const steps = ["basic", "rooms"];

const RegistrationRoot = () => {
    let [searchParams, _] = useSearchParams();
    const [test, setTest] = React.useState<boolean>(false);



    return (
        <React.Fragment>
            <Stepper steps={steps} currentStep={1} />
            <div>registration main pa22ge</div>
            <BasicExamInfo />
        </React.Fragment>
    );
};

export function useTest() {
    return useOutletContext();
}


export default RegistrationRoot;
