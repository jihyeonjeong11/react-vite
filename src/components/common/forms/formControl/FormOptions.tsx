import { fieldProps } from "@/types/Global"
import { ReactElement, ReactNode, useCallback } from "react"

const Fieldset = ({
    name,
    children
}: {
    children: ReactNode | ReactNode[];
} & Partial<fieldProps>
): ReactElement => {
    return (
        <fieldset>
            <legend className="label-heading">{name}</legend>
            {children}
        </fieldset>
    )
};

const Select = ({
    name,
    tip,
    placeholder,
    type,
    selectOption,
    register,
    dataKey,
    applyOption,
    error
}: Partial<fieldProps>
): ReactNode | ReactNode[] => {
    // 요소 생성
    const makeSelect = useCallback(({name, type, placeholder, defaultValue, register, disabled, error, selectOption}: Partial<fieldProps>): JSX.Element | JSX.Element[] | undefined => {
        let elements;
        if(selectOption && selectOption.length > 0) {
            switch(type) {
            case "select":
                elements = 
                    <select disabled={disabled ? true : false} value={defaultValue} {...register} >
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
                elements = 
                    <ul>
                        {selectOption.map(option => {
                            return (
                                <li>
                                    <label>
                                        <input
                                            key={option.value}
                                            type={"checkbox"}
                                            value={option.value}
                                            {...register}
                                        />
                                        {option.name || option.value}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
            case "radio":
                elements = 
                    <ul>
                        {}
                    </ul>
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
            {element}
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
}: fieldProps
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