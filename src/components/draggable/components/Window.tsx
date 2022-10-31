import React from "react";

import { CiMemoPad } from "react-icons/ci";
import {AiFillCloseCircle} from "react-icons/ai";

import { useProcesses } from "@/components/common/contexts/process";

const Window = ({ children, type, id}: ComponentWithChildrenProps) => {
    const {processes: {[id]: process}, close} = useProcesses();

    return (
        <section className="shadow-window-shadow h-full outline outline-1 outline-window-outline w-full">
            <header className="bg-window-header text-white h-8">
                <nav className="flex items-center">
                    
                    <CiMemoPad />
                    <p>메모장</p>
                    <p>{id}</p>
                    <button onClick={()=>close(id)}>
                        <AiFillCloseCircle />
                    </button>
                </nav>
            </header>
            {children}
        </section>
    );
};

export default Window;
