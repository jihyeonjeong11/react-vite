import React from "react";

import { useToggle } from "./useToggle";
import { useTimeoutEffect } from "./useTimeoutEffect";
import { useNavigate } from "react-router-dom";

export type MenuAnimationProps = {
    boolean: string;
    toggle: () => void | NodeJS.Timeout;
}

const useMenuAnimation = () => {
    const [boolean, setBoolean] = useToggle(false);
    const [closing, setClosing] = useToggle(false);

    const [cancel, reset] = useTimeoutEffect(
        () => {
            setBoolean(false);
        },
        400
    )

    const toggle =  React.useCallback(() => {
        if(boolean)  return setClosing(true)
        return setBoolean(true);
    }, [boolean, closing]);

    const tickClosing = () => {
        return setTimeout(() => setClosing(false), 400)
    }

    React.useEffect(() => {
        if(closing){
            return tickClosing()
        }

    }, [closing])

    

    return [
        boolean,
        toggle,
        closing,
    ];
};

export default useMenuAnimation;
