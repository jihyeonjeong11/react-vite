import React from "react";
import { useNavigate } from "react-router-dom";

export type CrashErrorScreenProps = {
    onResolve: () => void;
};

function CrashErrorScreen() {
    const navigate = useNavigate();
    const rollback = () => {
        return navigate('/')
    }
    return (
        <div>
            <div>uncaught error found</div>

            <div className="button-wrapper">
                <button  onClick={rollback}>
                    홈으로 이동하기
                </button>
            </div>
        </div>
    );
}

export default CrashErrorScreen; 