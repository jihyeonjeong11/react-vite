import type { CommonForms, FormNames } from "@/types/Global";
import { ReactElement, useMemo } from "react";
import useStepper from "../../dialog/hooks/useStepper";
import Form from "../components/form";
import useFixedForm from "../hooks/useFixedForm";
import Stepper from "@/components/registration/stepper";
import { useDialogsContextState } from "../../contexts/dialogs/index";

const FormRoot = ({
    submit,
    type,
    defaultValues,
    children,
    ...rest
}: {
    /** form 처리 후 결과를 받을 함수 */
    submit: (data: CommonForms) => void;
    /** 사용하고자 하는 제출 양식의 이름 */
    type: FormNames;
    /** 수정하는 경우와 같이 이전 정보가 존재할 때 추가 */
    defaultValues?: CommonForms;
    children?: ReactElement;
}) => {
    const formProps = useFixedForm(type, defaultValues);
    const { steps, idx, setIdx } = useStepper(1);

    const Component = useMemo(() => switchStepModal(idx), [idx]);

    return <StepWrapper steps={steps} idx={idx} Component={Component} setIdx={setIdx} />;

    // return (
    //     <Form submit={submit} formProps={formProps} name={type} {...rest}>
    //         {children}
    //     </Form>
    // )
};

const switchStepModal = (idx: number) => {
    switch (idx) {
        default:
            return () => <div>idx {" " + idx + " "} error</div>;
        case 1:
            return StepOne;
        case 2:
            return StepTwo;
    }
};

const StepWrapper = ({
    steps,
    idx,
    Component,
    setIdx
}: {
    steps: string[];
    idx: number;
    Component: React.FC;
    setIdx: (arg0:number) => void;
}) => {
    return (
        <main className="container relative">
            <div className="container flex flex-col items-center">
                <Stepper steps={steps} currentStep={idx} />
            </div>
            <Component />
            <div className="mt-5 container flex justify-center">
                <div className="container w-[20vw] justify-evenly flex">
                    <SubmitButton isActive={true} />
                    <SubmitButton isActive={false} />
                </div>
            </div>
            <div onClick={()=>setIdx(idx -1)} className="absolute top-1/2 left-0 transform -translate-x-1/4 -translate-y-1/2">
                <p>이전</p>
            </div>
            <div onClick={()=>setIdx(idx + 1)} className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
                <p>다음</p>
            </div>
        </main>
    );
};

const StepOne = () => {
    const { steps, idx } = useStepper(1);
    const { stepOne, setStepOne } = useDialogsContextState();

    return (
        <>
            <header className="flex items-start container mb-1">
                <p>Step 2</p>
                <p>그룹별 설정</p>
            </header>
            <section className="min-h-[20vh] bg-white">
                <div className="container  rounded">
                    <p>그룹 목록</p>
                    <p>최대 방 개수</p>
                </div>
            </section>
        </>
    );
};

const StepTwo = () => {
    const { steps, idx } = useStepper(2);
    const { stepTwo, setStepTwo } = useDialogsContextState();

    return (
        <>
            <div className="flex items-start container mb-1">
                <p>Step 2</p>
                <p>그룹별 설정</p>
            </div>
            <div className="container bg-white rounded">
                <p>그룹 목록</p>
                <p>최대 방 개수</p>
            </div>
        </>
    );
};

export default FormRoot;

const SubmitButton = ({
    isActive = false,
    onClick = () => null,
}: {
    isActive: boolean;
    onClick: any;
}) => {
    return (
        <button
            className={`${buttonConfig["medium"]} ${buttonConfig["primary"]} ${
                isActive
                    ? Object.values(buttonConfig["active"]).join(" ")
                    : Object.values(buttonConfig["inActive"]).join(" ")
            }`}
            onClick={onClick}
        >
            <p> {isActive ? "다음" : "취소"} </p>
        </button>
    );
};

// 나중에 index.css 보고 거기 할것.

const buttonConfig = {
    primary: "container",
    active: {
        bgColor: "bg-brand-100",
        txtColor: "text-white",
    },
    inActive: {
        bgColor: "bg-white",
        txtColor: "text-[#131523]",
        outline: "border-brand-100 border",
    },
    medium: "w-[6.813rem] h-[2.5rem]",
};

// const AbsoluteArrow = () => {
//     return ()
// }

// 스텝2만 다른 코드로 뺌.

// const formProps = useFixedForm(type, defaultValues);
// return (
//     <Form submit={submit} formProps={formProps} name={type} {...rest}>
//         {children}
//     </Form>
// )
