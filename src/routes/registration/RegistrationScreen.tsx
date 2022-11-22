import React from "react";

const Lazy = React.lazy(() => import("@/components/registration/container/RegistrationRoot"));

const RegistrationScreen = () => {
    return (
        <React.Fragment>
            <Lazy />
        </React.Fragment>
    );
};

export default RegistrationScreen;
