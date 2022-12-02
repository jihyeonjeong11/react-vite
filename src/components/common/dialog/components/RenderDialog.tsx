import ErrorBoundary from "@/routes/error/ErrorBoundary";

type RenderDialogProps = {
    component: (() => JSX.Element) | null;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    component: Component
}) => {
    return (
        <ErrorBoundary>
            {Component !== null ? <Component /> : <></>}
        </ErrorBoundary>
    );
};

export default RenderDialog;
