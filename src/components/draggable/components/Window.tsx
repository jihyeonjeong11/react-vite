import React from "react";

import { BiNotepad } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";

import { useProcesses } from "@/components/common/contexts/process";
import { useSession } from "@/components/common/contexts/session";

const Window = ({ children, type, id }: ComponentWithId) => {
    const {
        processes: { [id]: process },
        close,
    } = useProcesses();

    const {
        windowStates: { [id]: windowState },
    } = useSession();

    return (
        <section className="shadow-window-shadow h-full outline outline-1 outline-window-outline w-full">
            <header className="bg-window-header text-white h-8">
                <nav className="flex items-center">
                    <BiNotepad />
                    <p>메모장</p>
                    <p>{id}</p>
                    {/* <button onClick={()=>close(id)} > */}
                    <button onClick={() => close(id)}>
                        <AiFillCloseCircle />
                    </button>
                </nav>
            </header>
            {children}
        </section>
    );
};

export default Window;
