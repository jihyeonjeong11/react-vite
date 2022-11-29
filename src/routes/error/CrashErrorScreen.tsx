import { useNavigate } from "react-router-dom";
import AsideRoot from "@/components/aside/container/AsideRoot";

export type CrashErrorScreenProps = {
    onResolve: () => void;
};

function CrashErrorScreen() {
    const navigate = useNavigate();
    const rollback = () => {
        return navigate("/");
    };
    return (
        <div className="flex overflow-y-hidden">
            <AsideRoot />
            <div id="detail">
                <div>uncaught error found</div>

                <div className="button-wrapper">
                    <button onClick={rollback}>홈으로 이동하기</button>
                </div>
            </div>
        </div>
    );
}

export default CrashErrorScreen;
