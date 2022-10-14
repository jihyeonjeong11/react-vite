import type { ReactNode } from "react";
import React from "react";

export interface TableProps {
    children: ReactNode;
}

const TableHead = () => {
    return (
        <thead className="border-b">
            <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center ">
                    <input type="checkbox" name="" id="" />
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center ">
                    #
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                    First
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                    Last
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                    Handle
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;
