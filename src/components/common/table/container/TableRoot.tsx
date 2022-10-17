import type { ReactNode } from "react";
import React from "react";

import { BsTable, BsGridFill } from "react-icons/bs";

import { useFetch } from "@/components/common/hooks/useFetch";

import LayoutSwitch from "../components/LayoutSwitch";
import StudentsTable from "../components/StudentTable";
import StudentsGrid from "../components/StudentGrid";

interface LayoutOptions {
    table: string;
    grid: string;
}

export const LAYOUT_OPTIONS: Readonly<LayoutOptions> = {
    table: "table",
    grid: "grid",
};

export interface UserData {
    id: number;
    name: string;
    username: string;
    company: Company;
}

interface Company {
    id: number;
    name: string;
}

export interface UserListProps {
    users: UserData[];
    activeLayout: string;
}

const TableWrapper = () => {
    const {
        response: { data: users },
        error,
        loading,
    } = useFetch<UserData[]>("/users");

    if (error) {
        return <h2>{error}</h2>;
    }



    return (
        <React.Fragment>
            <h1>학생</h1>
            {loading && <h3>학생 정보 불러오는 중</h3>}
            {users !== null ? (
                <LayoutSwitch defaultLayout={LAYOUT_OPTIONS.grid}>
                    <LayoutSwitch.Options>
                        <LayoutSwitch.Button layoutPreference={LAYOUT_OPTIONS.table} title="Table Layout">
                            <BsTable />
                        </LayoutSwitch.Button>
                        <LayoutSwitch.Button layoutPreference={LAYOUT_OPTIONS.grid} title="Grid Layout">
                            <BsGridFill />
                        </LayoutSwitch.Button>
                    </LayoutSwitch.Options>
                    <LayoutSwitch.Content>
                        <StudentsGrid activeLayout={LAYOUT_OPTIONS.table} users={users} />
                        <StudentsTable activeLayout={LAYOUT_OPTIONS.grid} users={users} />
                    </LayoutSwitch.Content>
                </LayoutSwitch>
            ) : (
                <h3>학생 정보가 없습니다.</h3>
            )}
        </React.Fragment>
    );
};

export default TableWrapper;
{
    /* <div className="flex flex-col">
        //     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        //         <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        //             <div className="overflow-hidden">
        //                 <table className="min-w-full">
        //                     {/* headComp */
}
//                     <TableHead />
//                     {/* bodyComp */}
//                     <TableBody />
//                 </table>
//             </div>
//         </div>
//     </div>
// </div> */}
