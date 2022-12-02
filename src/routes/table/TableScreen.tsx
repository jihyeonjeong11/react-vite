import TableRoot from "@/components/common/table/container/TableRoot";
import RouteWrapper from "../RouteWrapper";

//const Lazy = React.lazy(() => import('@/components/common/table/container/TableRoot')) // experiental. need loading sync

const RegistrationScreen = () => {
    return (
        <RouteWrapper>
            <TableRoot />
        </RouteWrapper>
    );
};

export default RegistrationScreen;
