import ErrorBoundary from "@/routes/error/ErrorBoundary";

type RenderDialogProps = {
    Component: (() => JSX.Element) | null;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    Component
}) => {
    return (
        <ErrorBoundary>
            {Component !== null ? <Component /> : <></>}
        </ErrorBoundary>
    );
};

export default RenderDialog;
