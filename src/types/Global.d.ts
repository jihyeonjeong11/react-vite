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
/** formControl props */
type formProps = {
    /** 해당 Form에서 리턴되는 객체 내에서 사용될 항목의 고유한 이름(키) */
    dataKey: string;
    /** 라벨에 표시될 항목의 명칭 */
    name: string;
    /** 입력값을 전달하는 함수 */
    register?: any;
    /** 라벨 아래 위치하며 입력에 대한 추가적인 힌트를 제공하는 설명 */
    tip?: string;
    /** 저장되지 않는 미리보기 값 */
    placeholder?: string;
    /** 해당 항목에 부여되는 옵션 */
    applyOption?: applyOption;
    /** 에러 메세지 */
    error?: string | undefined;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 입력된 값 */
    defaultValue?: string | string[] | number | number[];
}
export type labelProps = {
    /** 입력 요소의 종류 */
    type: "text" | "desc"| "number" | "number_string" | "password" | "email";
} & formProps;
export type fieldProps = {
    /** 입력 요소의 종류 */
    type:  "select" | "radio" | "checkbox";
    /** 하위 선택 목록 */
    selectOption: (string | number)[];
} & formProps;

export type formControlprops = (labelProps | fieldProps);
export type formArrayprops = (formControlprops)[];

/** react-hook-form: Apply validation */
type numericOption = { value: number, message: string };
export type regexOption = { value: RegExp, message: string };
export type applyOption = {
    required?: { value: boolean, message: string };
    min?: numericOption;
    max?: numericOption;
    minLength?: numericOption;
    maxLength?: numericOption;
    pattern?: regexOption;
    valueAsNumber?: boolean;
}