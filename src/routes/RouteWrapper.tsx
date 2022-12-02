//const Lazy = React.lazy(() => import('@/components/common/table/container/TableRoot')) // experiental. need loading sync
const RouteWrapper = ({ children }: ComponentWithChildrenProps) => {
    return (
        <>
            <main className="w-[calc(100vw_-_12rem)] h-full relative overflow-hidden">

                {children}

            </main>
        </>
    );
};

export default RouteWrapper;
