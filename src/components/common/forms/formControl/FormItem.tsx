import { labelProps } from "@/types/Global";
import React, { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";

const Label = ({
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

const Input = ({
    tip,
    error,
    ...rest
}: Partial<labelProps>
): JSX.Element => {
    // 요소 생성
    const makeInput = useCallback(({type, placeholder, register, error}: Partial<labelProps>): JSX.Element | undefined => {
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
                        placeholder={placeholder ? placeholder : ''}
                        className={error ? "input-outlined-error" : "input-outlined"}
                        aria-invalid={error ? "true" : "false"}
                    />
                break;
            case "desc":
                element = 
                    <textarea 
                        {...register}
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
const FormItem = React.memo(({
    name,
    ...rest
}: labelProps
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