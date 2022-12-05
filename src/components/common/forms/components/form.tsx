import { ReactElement, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { applyOption, CommonForms, fieldProps, formArrayprops, labelProps } from "@/types/Global";
import FormItem from "./formControl/FormItem";
import { addRegex, addRequired } from "../helpers";
import FormOptions from "./formControl/FormOptions";

const Form = ({
    formProps,
    children,
    submit,
    name,
    ...rest
}: {
    formProps: formArrayprops;
    children?: ReactElement | ReactElement[];
    submit: (data: CommonForms) => void;
    name: string;
}) => {
    /** useForm 초기 설정 */
    let defaultList: {[key: string]: string | string[]} = {};
    formProps.map(item => defaultList[item.dataKey] = item.defaultValue ? item.defaultValue : "");
    const { register, handleSubmit, control, watch , formState: { errors } } = useForm<CommonForms>({defaultValues: defaultList});
    const onSubmit: SubmitHandler<CommonForms> = data => {
        submit(data);
    };

    /** 선택지를 고르는 항목인지 체크 */
    const isSelector = useCallback((i: labelProps | fieldProps): i is fieldProps => {
        return (i as fieldProps).selectOption !== undefined;
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {formProps.map((item) => {
                const {type, applyOption, dataKey, name, tip, placeholder, disabled, defaultValue} = item;
                /* register 설정 */
                let _option: applyOption = {
                    // 기본 설정 1: 필수
                    required: addRequired
                };
                if(addRegex(type) !== undefined) {
                    // 기본 설정 2: 정의된 정규표현 있을 경우 추가
                    _option.pattern = addRegex(type);
                };
                if(type === "number") {
                    // 기본 설정 3: 숫자 타입 항목일 경우 추가
                    _option.valueAsNumber = true;
                }
                if(applyOption !== undefined) {
                    // item으로 전달된 설정이 있을 경우 덮어쓰기
                    _option = {..._option, ...applyOption};
                }
                const _register = register(dataKey, _option);
                /* 항목 그리기 */
                if(isSelector(item)){
                    // 선택 가능한 입력 항목 
                    return (
                        <FormOptions 
                            key={dataKey}
                            dataKey={dataKey}
                            type={item.type}
                            name={name}
                            selectOption={item.selectOption}
                            tip={tip}
                            placeholder={placeholder}
                            register={_register}
                            error={errors[dataKey] && errors[dataKey]?.message?.toString()}
                            disabled={disabled}
                            defaultValue={defaultValue}
                            control={control}
                            customCheck={item.customCheck}
                            visibleState={item.isBelongto ? watch(item.isBelongto.targetDataKey) === item.isBelongto.targetValue : true}
                        />
                    )
                } else if (item as labelProps) {
                    // 사용자 입력 항목
                    return (
                        <FormItem 
                            type={item.type}
                            key={dataKey} 
                            name={name}
                            tip={tip}
                            placeholder={placeholder}
                            register={_register}
                            error={errors[dataKey] && errors[dataKey]?.message?.toString()}
                            disabled={disabled}
                            visibleState={item.isBelongto ? watch(item.isBelongto.targetDataKey) === item.isBelongto.targetValue : true}
                        />
                    )
                }
            })}
            {children}
        </form>
    );
}

export default Form;