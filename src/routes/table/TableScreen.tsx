import React from "react";

const Lazy = React.lazy(() => import('@/components/common/table/container/TableRoot'))

const RegistrationScreen = () => {
    return (
        <React.Fragment>
            <Lazy />
        </React.Fragment>
    );
};

export default RegistrationScreen;
