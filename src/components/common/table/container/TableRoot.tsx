import React from "react";

import { staticState } from "../constants";
import { Table } from "../components/TableCompound";

import { useFetch } from "@/components/common/hooks/useFetch";
import { useCheckBoxes } from "../hooks/useCheckboxes";

const staticHead = "test";

export interface UserData {
    [key: string]: string;
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

    const checkboxes = useCheckBoxes(users && users.length ? users.length : 0);
    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <React.Fragment>
            {loading && <h3>학생 정보 불러오는 중</h3>}
            {users !== null && checkboxes.checkArr.length ? (
                <div className=" w-screen h-screen">
                    <div className="h-100 mx-auto ">
                        <h1 className="text-3xl py-4 border-b mb-10">학생</h1>
                        <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                            <Table>
                                <Table.Head>
                                    <Table.TR>
                                        <Table.TH>
                                            <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                <input
                                                    readOnly
                                                    checked={checkboxes.isAllChecked}
                                                    type="checkbox"
                                                    className="form-checkbox focus:outline-none focus:shadow-outline"
                                                    name=""
                                                    id="all"
                                                    onClick={checkboxes.onClickAll}
                                                />
                                            </label>
                                        </Table.TH>
                                        {staticState[staticHead].map((t, i) => (
                                            <Table.TH key={"th" + i}>{t}</Table.TH>
                                        ))}
                                    </Table.TR>
                                </Table.Head>
                                <Table.TB>
                                    {users.map((u, i) => {
                                        const val = checkboxes.checkArr[i];
                                        return (
                                            <Table.TR
                                                key={"user" + i}
                                                style={{ background: val ? "antiquewhite" : "white" }}
                                            >
                                                <Table.TD>
                                                    <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={val.toString()}
                                                            onChange={(e) => checkboxes.onCheck(e, i)}
                                                            checked={val}
                                                            className="form-checkbox focus:outline-none focus:shadow-outline"
                                                            name=""
                                                        />
                                                    </label>
                                                </Table.TD>
                                                <Table.TD>{u.id}</Table.TD>
                                                <Table.TD>{u.name}</Table.TD>
                                                <Table.TD>{u.phone}</Table.TD>
                                                <Table.TD>{u.email}</Table.TD>
                                                <Table.TD>{u.username}</Table.TD>
                                                <Table.TD>{u.website}</Table.TD>
                                                <Table.TD>{u.website}</Table.TD>
                                                <Table.TD>{u.website}</Table.TD>
                                                <Table.TD>{u.website}</Table.TD>
                                                <Table.TD>{u.website}</Table.TD>
                                            </Table.TR>
                                        );
                                    })}
                                </Table.TB>
                            </Table>
                        </div>
                    </div>
                </div>
            ) : (
                <h3>학생 정보가 없습니다.</h3>
            )}
        </React.Fragment>
    );
};

export default TableWrapper;
