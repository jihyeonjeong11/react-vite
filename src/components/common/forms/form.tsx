import React, { ReactElement, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { CommonForms } from "../../../types/Global";

const Form = ({
    children,
    submit
}: {
    children: ReactElement | ReactElement[];
    submit: (data: CommonForms) => void;
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CommonForms>();
    const onSubmit: SubmitHandler<CommonForms> = data => {
        submit(data)
    };
    const [labels, setLabels] = useState(React.Children.map(children, (child) => {
        if(typeof child === "object") {
            if(child.props && child.props.dataKey) {
                return {...child, props: {...child.props, register: register}}
            }
        }
        return child;
    }))
    useEffect(() => {
        if(errors !== undefined) {
            const errorKeys = Object.keys(errors);
            setLabels(React.Children.map(children, (child) => {
                if(typeof child === "object") {
                    if(child.props && child.props.dataKey) {
                        const key = errorKeys.find(key => key === child.props.dataKey);
                        if(key !== undefined) {
                            return {...child, props: {...child.props, register: register, error: errors[key]?.message}}
                        }
                        return {...child, props: {...child.props, register: register, error: undefined}}
                    }
                }
                return child;
            }))
        }
    },[errors])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {labels}
        </form>
    );
}

export default Form;