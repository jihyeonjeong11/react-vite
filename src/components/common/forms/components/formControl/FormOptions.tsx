import { fieldProps } from "@/types/Global"
import React, { ReactElement, ReactNode, useCallback } from "react"
import useCheckbox from "../../hooks/useCheckbox";

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
        defaultValue, 
        register, 
        disabled, 
        error, 
        selectOption, 
        useAllcheck, 
        setValue
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
                const [result, handleChange, handleChangeAll] = useCheckbox(selectOption);
                const update = useCallback((name: string, result: Array<string>) => {
                    setValue(name, result)
                },[]);
                const _handleChange = (event:React.ChangeEvent) => {
                    handleChange(event);
                    update(name, result);
                }
                elements = 
                    <ul aria-invalid={error ? "true" : "false"}>
                        {useAllcheck &&
                            <li key={`${name}_all`}>
                                <label>
                                    <input 
                                        type={"checkbox"}
                                        disabled={disabled ? true : false}
                                        checked={result.length === selectOption.length ? true : false}
                                        onChange={handleChangeAll}
                                    />
                                </label>
                            </li>
                        }
                        {selectOption.map(option => {
                            return (
                                <li key={`${name}_${option.value}`}>
                                    <label>
                                        <input
                                            type={"checkbox"}
                                            disabled={disabled ? true : false}
                                            checked={
                                                (
                                                    defaultValue === option.value || 
                                                    defaultValue && Array.isArray(defaultValue) && defaultValue.find(val => val === option.value)
                                                ) ? 
                                                true : false
                                            } 
                                            value={option.value}
                                            onChange
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
                                            checked={defaultValue === option.value ? true : false}
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