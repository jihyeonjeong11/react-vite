import { fieldProps, labelProps } from "@/types/Global"
import { ReactElement, ReactNode } from "react"

const FieldsetRoot = ({
    name,
    children
}: {
    children: ReactNode | ReactNode[];
} & Partial<labelProps>
): ReactElement => {
    return (
        <fieldset>
            <legend className="pb-2 inline-block font-medium">{name}</legend>
            {children}
        </fieldset>
    )
};

const SelectRoot = ({
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
    tip,
    placeholder,
    type,
    dataKey,
    register,
    selectOption,
    applyOption,
    error
}: Partial<fieldProps>
): ReactElement => {
    return (
        <FieldsetRoot name={name}>
            <SelectRoot 
                tip={tip}
                placeholder={placeholder}
                type={type}
                selectOption={selectOption}
                register={register}
                dataKey={dataKey}
                applyOption={applyOption}
                error={error}
            />
        </FieldsetRoot>
    )
}

export default FormOptions;