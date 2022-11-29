import { lazy } from "react";

const Lazy = lazy(
    () => import("@/components/registration/container/RegistrationRoot")
);

const RegistrationScreen = () => {
    return (
        <>
            <Lazy />
        </>
    );
};

export default RegistrationScreen;
