import React from "react";

import CrashErrorScreen from "./CrashErrorScreen";

type Props = {
    children?: React.ReactNode;
};

type State = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        // for webpack5 .env
        // if (process.env.NODE_ENV === 'production') {
        //     //Sentry.captureException(error);
        // }
        if (import.meta.env.PROD) {
            //Sentry.captureException(error);
        }
    }

    render() {
        // crashError custom screen
        if (this.state.hasError) {
            return <CrashErrorScreen />;
        }

        return <ErrorBoundaryWrapper hasError={this.state.hasError}>{this.props.children}</ErrorBoundaryWrapper>;
    }
}

type ErrorBoundaryWrapperProps = {
    children: React.ReactNode;
    hasError: boolean;
};

function ErrorBoundaryWrapper(props: ErrorBoundaryWrapperProps) {
    return <>{props.children}</>;
}

export default ErrorBoundary;
