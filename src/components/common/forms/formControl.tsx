import { ReactElement, ReactNode } from "react";
import { labelProps } from '../../../types/Global';

const LabelRoot = ({
    name,
    children
}: {
    children: ReactNode;
} & Partial<labelProps>
):ReactElement => {
    return (
        <label>
            <span className="pb-2 inline-block font-medium">{name}</span>
            {children}
        </label>
    )
};

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
}

const InputRoot = ({
    tip,
    type,
    register,
    dataKey,
    applyOption,
    error
}: Partial<labelProps>
): JSX.Element => {
    // 클래스
    const inputClass = (isError: string | undefined) => {
        const base = "px-2 py-1 rounded w-full outline-0 outline-none"
        let result: string = '';
        if(isError) {
            result = "border-rose-600 border-2";
        } else {
            result = "border-slate-300 border";
        }
        return result.concat(' ', base);
    };
    const messageClass = "";

    let element;
    
    switch(type) {
        case "text":
            element = 
                <input 
                    type={"text"} 
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                />
            break;
        case "desc":
            element = 
                <textarea 
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                />
            break;
        case "number_string":
            element = 
                <input 
                    type={"tel"}
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                />
            break;
        case "number":
            element =
                <input 
                    type={"text"}
                    inputMode={"numeric"}
                    pattern={"[0-9]*"}
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                />
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
                <p className={messageClass}>{error}</p>
            }
        </>
    )
};

const FormItem = ({
    name,
    tip,
    type,
    dataKey,
    register,
    applyOption,
    error
}: labelProps
): ReactElement => {
    return (
        <LabelRoot name={name}>
            <InputRoot
                tip={tip}
                type={type}
                register={register} 
                dataKey={dataKey}
                applyOption={applyOption}
                error={error}
            />
        </LabelRoot>
    )
};

const FormOptions = ({
    value,
    name,
    type,
    dataKey,
    register,
    applyOption,
    error
}: {
    value: string;
} & Partial<labelProps>
): ReactElement => {
    return (
        <FieldsetRoot name={name}>
            <></>
        </FieldsetRoot>
    )
}

export { FormItem, FormOptions }