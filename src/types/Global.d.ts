import { ExamForms } from './exam.d';
import React from "react";

export {};

const windowTypes = {
    memo: 'memo',
    video: 'video',
} as const;

declare global {
    type ComponentWithChildrenProps =  {
        children: (React.ReactNode & { type: { name: string } })[] | React.ReactNode;
        onCheck?: (e: React.SyntheticEvent, index: number) => void;
        className?: string;
        style?: any;
        type?: windowTypes;
        
    }
    type ComponentWithId = ComponentWithChildrenProps & {
        id: string;
    }

}

/** form 양식 */
export type CommonForms = ExamForms | testProps;
/** formItem props */
export type labelProps = {
    /** 해당 Form에서 리턴되는 객체 내에서 사용될 항목의 고유한 이름(키) */
    dataKey: string;
    /** 라벨에 표시될 항목의 명칭 */
    name: string;
    /** 라벨 아래 위치하며 입력에 대한 추가적인 힌트를 제공하는 설명 */
    tip?: string;
    /** 입력 요소의 종류 */
    type: "text" | "desc"| "number" | "select" | "radio" | "date" | "number_string";
    /** 입력값을 전달하는 함수 */
    register?: any;
    /** 해당 항목에 부여되는 옵션 */
    applyOption?: applyOption;
    /** 에러 메세지 */
    error?: string | undefined;
}

/** react-hook-form: Apply validation */
export type applyOption = {
    required?: { value: boolean, message: string };
    disabled?: boolean;
    min?: { value: number, message?: string };
    max?: { value: number, message?: string };
    minLength?: { value: number, message?: string };
    maxLength?: { value: number, message?: string };
    pattern?: { value: RegExp, message: string } | {};
    validate?: Function | Object;
}