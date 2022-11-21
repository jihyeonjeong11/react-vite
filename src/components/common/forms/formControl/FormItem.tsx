import { labelProps } from "@/types/Global";
import { ReactElement, ReactNode } from "react";

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
const InputRoot = ({
    tip,
    placeholder,
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

    let element;
    
    switch(type) {
        case "text":
        case "password":
        case "number_string":
            element = 
                <input 
                    type={(type === "number_string" ? "tel"
                        : (type === "password" ? "password"
                        : "text"
                        ))
                    } 
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                    placeholder={placeholder ? placeholder : ''}
                />
            break;
        case "desc":
            element = 
                <textarea 
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                    placeholder={placeholder ? placeholder : ''}
                />
            break;
        case "number":
            element =
                <input 
                    type={"number"}
                    inputMode={"numeric"}
                    pattern={"[0-9]*"}
                    {...register(dataKey, {...applyOption, valueAsNumber: true})}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                    placeholder={placeholder ? placeholder : ''}
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
                <p>{error}</p>
            }
        </>
    )
};
const FormItem = ({
    name,
    tip,
    placeholder,
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
                placeholder={placeholder}
                type={type}
                register={register} 
                dataKey={dataKey}
                applyOption={applyOption}
                error={error}
            />
        </LabelRoot>
    )
};

export default FormItem;