import { fieldProps } from "@/types/Global"
import React, { ReactElement, ReactNode, useCallback } from "react"
import { Controller } from "react-hook-form";
import { useCustomCheck } from "../../hooks/useCustomCheck";

const Fieldset = ({
    name,
    children
}: {
    children: ReactNode | ReactNode[];
} & Pick<fieldProps, "name">
): ReactElement => {
    return (
        <fieldset>
            <legend className="label-heading">{name}</legend>
            {children}
        </fieldset>
    )
};

const Select = ({
    tip,
    error,
    ...rest
}: Omit<fieldProps, "dataKey">
): JSX.Element => {
    // 요소 생성
    const makeSelect = useCallback(({
        name, 
        type, 
        placeholder, 
        register, 
        disabled, 
        error, 
        selectOption, 
        customCheck,
        defaultValue,
        control
    }: Omit<fieldProps, "dataKey">
    ): JSX.Element | JSX.Element[] | undefined => {
        let elements;
        if(selectOption && selectOption.length > 0) {
            switch(type) {
            case "select":
                elements = 
                    <select 
                        disabled={disabled ? true : false} 
                        value={defaultValue} 
                        {...register}
                        aria-invalid={error ? "true" : "false"} 
                    >
                        {placeholder &&
                            <option value="">{placeholder}</option>
                        }
                        {selectOption.map(option => {
                            return <option value={option.value}>{option.name || option.value}</option>
                        })
                        }
                    </select>
                break;
            case "checkbox":
                if(customCheck && customCheck.length > 0) {
                    // const [props, logic, effect] = useCustomCheck(customCheck[0])
                    // console.log(props)
                    elements =
                        <Controller 
                            control={control}
                            name={name}
                            render={({field}) => {
                                const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                                    const target = event.currentTarget;
                                    // 커스텀 액션 추가
                                    // 그 외 일반적인 핸들링
                                    if(target.checked) {
                                        if([...field.value].length + 2 === selectOption.length) {
                                            return field.onChange(selectOption.map(option => option.value));
                                        }
                                        return field.onChange([...field.value, target.value]);
                                    } else {}
                                }
                                return (
                                    <ul aria-invalid={error ? "true" : "false"}>
                                        {selectOption.map(option => {
                                            return (
                                                <li key={`${name}_${option.value}`}>
                                                    <label>
                                                        <input 
                                                        type={"checkbox"}
                                                        onChange={onChange}
                                                        value={option.value}
                                                        checked={field.value ? field.value.some((val: string) => val === option.value) : false}
                                                        />
                                                        {option.name || option.value}
                                                    </label>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )
                            }}
                            defaultValue={defaultValue ? defaultValue : null}
                        />
                } else {
                    elements = 
                    <ul aria-invalid={error ? "true" : "false"}> 
                        {selectOption.map(option => {
                            return (
                                <li key={`${name}_${option.value}`}>
                                    <label>
                                        <input
                                            type={"checkbox"}
                                            disabled={disabled ? true : false}
                                            value={option.value}
                                            {...register}
                                        />
                                        {option.name || option.value}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                break;
            case "radio":
                elements = 
                    <ul aria-invalid={error ? "true" : "false"}>
                        {selectOption.map(option => {
                            return (
                                <li key={`${name}_${option.value}`}>
                                    <label>
                                        <input 
                                            name={name}
                                            type={"radio"}
                                            disabled={disabled ? true : false} 
                                            value={option.value}
                                            {...register}
                                        />
                                        {option.name || option.value}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                break;
            }
        } else {
            elements = <></>;
        }
        return elements;
    },[]);
    return (
        <>
            {
                tip &&
                <p>{tip}</p>
            }
                {makeSelect({error, ...rest})}
            {
                error &&
                <p>{error}</p>
            }
        </>
    )
}

const FormOptions = ({
    name,
    ...rest
}: Omit<fieldProps, "dataKey">
): ReactElement => {
    return (
        <Fieldset name={name}>
            <Select
                name={name}
                {...rest}
            />
        </Fieldset>
    )
}

export default FormOptions;