import type { ReactNode } from "react";
import React from "react";


const TableWrapper = () => {
    return (
        <tbody>
            <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><input type="checkbox" className="align-middle" name="" id="" /></td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Mark</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Otto</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@mdo</td>
            </tr>
            <tr className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><input type="checkbox" className="align-middle" name="" id="" /></td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Jacob</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Thornton</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@fat</td>
            </tr>
            <tr className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><input type="checkbox" className="align-middle" name="" id="" /></td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Larry</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Wild</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@twitter</td>
            </tr>
        </tbody>
    );
};

export default TableWrapper;
