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
): JSX.Element => {

    let element;

    switch(type) {
        case "select":
            element = 
                <select
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                >
                    <option></option>
                </select>
    }
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