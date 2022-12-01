import type { labelProps } from "@/types/Global";
import { ReactElement, ReactNode, useCallback, memo } from "react";

const Label = ({
    name,
    children
}: {
    children: ReactNode;
} & Pick<labelProps, "name">
):ReactElement => {
    return (
        <label>
            <span className="label-heading">{name}</span>
            {children}
        </label>
    )
};

const Input = ({
    tip,
    error,
    ...rest
}: Omit<labelProps, "dataKey"|"name">
): JSX.Element => {
    // 요소 생성
    const makeInput = useCallback(({
        type, 
        placeholder, 
        register, 
        disabled, 
        error
    }: Omit<labelProps, "dataKey"|"name"|"defaultValue">
    ): JSX.Element | undefined => {
        let element;
        switch(type) {
            case "text":
            case "email":
            case "password":
            case "number_string":
            case "number":
                element = 
                    <input 
                        type={( type === "number" ? "number"
                            : (type === "number_string" ? "tel"
                            : (type === "password" ? "password"
                            : "text"
                            )))
                        }
                        {...register}
                        disabled={disabled ? true : false}
                        placeholder={placeholder ? placeholder : ''}
                        className={error ? "input-outlined-error" : "input-outlined"}
                        aria-invalid={error ? "true" : "false"}
                    />
                break;
            case "desc":
                element = 
                    <textarea 
                        {...register}
                        disabled={disabled ? true : false}
                        placeholder={placeholder ? placeholder : ''}
                        className={error ? "input-outlined-error" : "input-outlined"}
                        aria-invalid={error ? "true" : "false"}
                    />
                break;
        }
    return element;
    },[]);

    return (
        <>
            {
                tip && 
                <p>{tip}</p>
            }
            {makeInput({error, ...rest})}
            {
                error &&
                <p>{error}</p>
            }
        </>
    )
};

const FormItem = memo(({
    name,
    ...rest
}: Omit<labelProps, "dataKey"|"defaultValue">
): ReactElement => {
    return (
        <Label name={name}>
            <Input
                {...rest}
            />
        </Label>
    )
});

export default FormItem;