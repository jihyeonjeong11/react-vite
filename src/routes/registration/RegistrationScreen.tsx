import React from "react";

const Lazy = React.lazy(() => import("@/components/registration/container/registrationRoot"));

const RegistrationScreen = () => {
    return (
        <React.Fragment>
            <Lazy />
        </React.Fragment>
    );
};

export default RegistrationScreen;
