import DraggableRoot from "@/components/draggable/container/DraggableRoot";
import { ProcessProvider } from "@/components/common/contexts/process";
import { SessionProvider } from "@/components/common/contexts/session";

const DraggableScreen = () => {
    return (
        <>
                <ProcessProvider>
                    <SessionProvider>
                        <DraggableRoot />
                    </SessionProvider>
                </ProcessProvider>
        </>
    );
};

export default DraggableScreen;
