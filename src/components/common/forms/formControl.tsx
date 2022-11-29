import { ReactElement, ReactNode, useMemo, memo } from "react";
import { fieldProps, labelProps } from "@/types/Global";

const tipClass = "";
const errorMessageClass = "h-8";
const LabelRoot = ({
    name,
    children,
}: {
    children: ReactNode;
} & Partial<labelProps>): ReactElement => {
    return (
        <label>
            <span className="pb-2 inline-block font-medium">{name}</span>
            {children}
        </label>
    );
};

const FieldsetRoot = ({
    name,
    children,
}: {
    children: ReactNode | ReactNode[];
} & Partial<labelProps>): ReactElement => {
    return (
        <fieldset>
            <legend className="pb-2 inline-block font-medium">{name}</legend>
            {children}
        </fieldset>
    );
};

const InputRoot = ({
    tip,
    placeholder,
    type,
    register,
    dataKey,
    applyOption,
    error,
}: Partial<labelProps>): JSX.Element => {
    // 클래스
    const inputClass = useMemo(() => (isError: string | undefined) => {
        const base = "px-2 py-1 rounded w-full outline-0 outline-none";
        let result: string = "";
        if (isError) {
            result = "border-rose-600 border-2";
        } else {
            result = "border-slate-300 border";
        }
        return result.concat(" ", base);
    }, []);

    let element;

    switch (type) {
        case "text":
        case "password":
        case "number_string":
            element = (
                <input
                    type={
                        type === "number_string"
                            ? "tel"
                            : type === "password"
                            ? "password"
                            : "text"
                    }
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                    placeholder={placeholder ? placeholder : ""}
                />
            );
            break;
        case "desc":
            element = (
                <textarea
                    {...register(dataKey, applyOption)}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                    placeholder={placeholder ? placeholder : ""}
                />
            );
            break;
        case "number":
            element = (
                <input
                    type={"number"}
                    inputMode={"numeric"}
                    pattern={"[0-9]*"}
                    {...register(dataKey, {
                        ...applyOption,
                        valueAsNumber: true,
                    })}
                    aria-invalid={error ? "true" : "false"}
                    className={inputClass(error)}
                    placeholder={placeholder ? placeholder : ""}
                />
            );
    }

    return (
        <>
            <div className="flex flex-col gap-1">
                {tip && <p className={tipClass}>{tip}</p>}
                {element}
                {error ? 
                    <small className={errorMessageClass}>{error}</small> : <small className="h-8" />
                }
            </div>
        </>
    );
};

const MemoizedLabelRoot = memo(LabelRoot);
const MemoizedInputRoot = memo(InputRoot);

const FormItem = ({
    name,
    tip,
    type,
    dataKey,
    register,
    applyOption,
    error,
}: labelProps): ReactElement => {
    return (
        <MemoizedLabelRoot name={name}>
            <MemoizedInputRoot
                tip={tip}
                type={type}
                register={register}
                dataKey={dataKey}
                applyOption={applyOption}
                error={error}
            />
        </MemoizedLabelRoot>
    );
};

// const FormOptions = ({
//     name,
//     tip,
//     type,
//     dataKey,
//     register,
//     selectOption,
//     applyOption,
//     error
// }: Partial<fieldProps>
// ): ReactElement => {
//     return (
//         <FieldsetRoot name={name}>
//             <SelectRoot
//                 tip={tip}
//                 type={type}
//                 selectOption={selectOption}
//                 register={register}
//                 dataKey={dataKey}
//                 applyOption={applyOption}
//                 error={error}
//             />
//         </FieldsetRoot>
//     )
// }

//FormOptions

export { FormItem };
