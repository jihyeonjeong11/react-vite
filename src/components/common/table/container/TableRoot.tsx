import { useState, useEffect } from "react";

import type { ExamsType } from "../../temporal/examFakeClient";

import { mainExamClassMenu } from "../constants";
import { Table } from "../components/Table";

import { useFetch } from "@/components/common/hooks/useFetch";
import { useCheckBoxes } from "../hooks/useCheckboxes";
import { getExams } from "../../temporal/examFakeClient";
import { ExamTypes } from "@/types/exam";
import { useDialogsContextState } from "@/components/common/contexts/dialogs";

import { motion } from "framer-motion";


const staticHead = "test";

export interface UserData {
    [key: string]: string;
}

export interface UserListProps {
    users: UserData[];
    activeLayout: string;
}

const TableWrapper = () => {
    // const {
    //     response: { data: users },
    //     error,
    //     loading,
    // } = useFetch<UserData[]>("/users");
    // // 나중에 훅 형태로 만들기 11-29
    const [exams, setExams] = useState<ExamsType>([]);

    const { setDialogs, dialogType } = useDialogsContextState();

    const checkboxes = useCheckBoxes(exams && exams.length ? exams.length : 0);
    // if (error) {
    //     return <h2>{"페칭에 실패했습니다"}</h2>;
    // }

    useEffect(() => {
        // api call 시
        // 메인 시험 리스트 마감 안된것 작성 안된것.
        // 메인 시험 테이블 혹은 하위에서 마감 처리할 예정.
        getExamList();
    }, []);

    const getExamList = async () => {
        const exams: ExamsType = await getExams();
        setExams(exams);
    };

    // 나중에 header는 따로 component로 뺍시다. 확정되면

    // https://tailwinduikit.com/components/webapp/table/advance_table/tasks
    // 56 헤더 컴포넌트화. 유저정보만 가지면 되는지??

    // p overflow:
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;

    return (
        <>
            <div className="h-screen w-full">
                <header className="flex bg-header-white-100 min-h-[3.75rem] px-2 items-center justify-end text-header-text-100 font-pretendard">
                    <span className="text-sm">김은미님 반갑습니다.</span>
                </header>

                {/* {loading && <h3>학생 정보 불러오는 중</h3>} */}
                {exams !== null && checkboxes.checkArr.length ? (
                    <>
                        <div className="px-[2rem] bg-main-100 h-full">
                            <div className="py-6 mb-8 px-2 ">
                                <span className="text-2xl font-pretendard font-bold	">
                                    메인 시험 {dialogType}
                                </span>
                            </div>
                            <div  className="sm:flex items-center justify-between mb-3">
                                <motion.button 
                                onClick={()=>{
                                    return setDialogs("mainExam");
    
                                }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-brand-100 hover:bg-main focus:outline-none rounded">
                                    <p className="text-sm font-pretendard font-medium leading-none text-white">
                                        메인 시험 추가
                                    </p>
                                </motion.button>
                                <button onClick={()=>{
                                return setDialogs("animated");

                            }} className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-brand-100 hover:bg-main focus:outline-none rounded">
                                    <p className="text-sm font-pretendard font-medium leading-none text-white">
                                        메인 시험 삭제
                                    </p>
                                </button>
                            </div>
                            <div className="rounded-lg shadow w-full">
                                <Table className="w-full whitespace-nowrap mb-5">
                                    <Table.Head>
                                        <Table.TR className="h-16 border border-gray-100 rounded">
                                            <Table.TH>
                                                <label className="">
                                                    <input
                                                        readOnly
                                                        checked={
                                                            checkboxes.isAllChecked
                                                        }
                                                        type="checkbox"
                                                        className=""
                                                        name=""
                                                        id="all"
                                                        onClick={
                                                            checkboxes.onClickAll
                                                        }
                                                    />
                                                </label>
                                            </Table.TH>
                                            {mainExamClassMenu.titleObject.map(
                                                ({ title }, i) => (
                                                    <Table.TD key={"th" + i}>
                                                        {title}
                                                    </Table.TD>
                                                )
                                            )}
                                        </Table.TR>
                                    </Table.Head>
                                    <Table.TB>
                                        {exams &&
                                            exams.map(
                                                (
                                                    { mec_nm, id, createdAt },
                                                    i
                                                ) => {
                                                    const val =
                                                        checkboxes.checkArr[i];
                                                    return (
                                                        <Table.TR
                                                            key={"user" + i}
                                                            style={{}}
                                                            className="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded"
                                                        >
                                                            <Table.TH className="">
                                                                <label className="">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={val.toString()}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            checkboxes.onCheck(
                                                                                e,
                                                                                i
                                                                            )
                                                                        }
                                                                        checked={
                                                                            val
                                                                        }
                                                                        className=""
                                                                        name=""
                                                                    />
                                                                </label>
                                                            </Table.TH>
                                                            <Table.TD>
                                                                {id}
                                                            </Table.TD>
                                                            <Table.TD className="">
                                                                {mec_nm}
                                                            </Table.TD>
                                                            <Table.TD className="">
                                                                {"작성중"}
                                                            </Table.TD>
                                                            <Table.TD className="">
                                                                {createdAt}
                                                            </Table.TD>
                                                            <Table.TD className="">
                                                                <button className="bg-slate-200">
                                                                    수정
                                                                </button>
                                                            </Table.TD>
                                                        </Table.TR>
                                                    );
                                                }
                                            )}
                                    </Table.TB>
                                </Table>
                            </div>
                            <div className="flex justify-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="inline-flex items-center -space-x-px">
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                <span className="sr-only">
                                                    Previous
                                                </span>
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                2
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                aria-current="page"
                                                className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                            >
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                4
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                5
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>
                ) : (
                    <h3>학생 정보가 없습니다.</h3>
                )}
            </div>
        </>
    );
};

export default TableWrapper;

// original
// return (
//     <React.Fragment>
//         {loading && <h3>학생 정보 불러오는 중</h3>}
//         {users !== null && checkboxes.checkArr.length ? (
//             <div className=" w-screen h-screen bg-gray-200">
//                 <div className="h-100 mx-auto ">
//                     <h1 className="text-3xl py-4 border-b mb-10">학생</h1>
//                     <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
//                         <Table>
//                             <Table.Head>
//                                 <Table.TR>
//                                     <Table.TH>
//                                         <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
//                                             <input
//                                                 readOnly
//                                                 checked={checkboxes.isAllChecked}
//                                                 type="checkbox"
//                                                 className="form-checkbox focus:outline-none focus:shadow-outline"
//                                                 name=""
//                                                 id="all"
//                                                 onClick={checkboxes.onClickAll}
//                                             />
//                                         </label>
//                                     </Table.TH>
//                                     {mainExamClassMenu.titleObject.map(({title}, i) => (
//                                         <Table.TH key={"th" + i}>{title}</Table.TH>
//                                     ))}
//                                 </Table.TR>
//                             </Table.Head>
//                             <Table.TB>
//                                 {users.map((u, i) => {
//                                     const val = checkboxes.checkArr[i];
//                                     return (
//                                         <Table.TR
//                                             key={"user" + i}
//                                             style={{ background: val ? "antiquewhite" : "white" }}
//                                         >
//                                             <Table.TD>
//                                                 <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
//                                                     <input
//                                                         type="checkbox"
//                                                         value={val.toString()}
//                                                         onChange={(e) => checkboxes.onCheck(e, i)}
//                                                         checked={val}
//                                                         className="form-checkbox focus:outline-none focus:shadow-outline"
//                                                         name=""
//                                                     />
//                                                 </label>
//                                             </Table.TD>
//                                             <Table.TD>{u.id}</Table.TD>
//                                             <Table.TD>{u.name}</Table.TD>
//                                             <Table.TD>{u.phone}</Table.TD>
//                                             <Table.TD>{u.email}</Table.TD>
//                                             <Table.TD>{u.username}</Table.TD>
//                                             <Table.TD>{u.website}</Table.TD>
//                                             <Table.TD>{u.website}</Table.TD>
//                                             <Table.TD>{u.website}</Table.TD>
//                                             <Table.TD>{u.website}</Table.TD>
//                                             <Table.TD>{u.website}</Table.TD>
//                                         </Table.TR>
//                                     );
//                                 })}
//                             </Table.TB>
//                         </Table>
//                     </div>
//                 </div>
//             </div>
//         ) : (
//             <h3>학생 정보가 없습니다.</h3>
//         )}
//     </React.Fragment>
// );

// <div class="sm:px-6 w-full">
// <div class="px-4 md:px-10 py-4 md:py-7">
//     <div class="flex items-center justify-between">
//         <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white">Tasks</p>
//         <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 dark:text-gray-200  bg-gray-200 dark:bg-gray-800  hover:bg-gray-300   dark:hover:bg-gray-700  cursor-pointer rounded">
//             <p>Sort By:</p>
//             <select aria-label="select" class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
//                 <option class="text-sm text-indigo-800">Latest</option>
//                 <option class="text-sm text-indigo-800">Oldest</option>
//                 <option class="text-sm text-indigo-800">Latest</option>
//             </select>
//         </div>
//     </div>
// </div>
// <div class="bg-white dark:bg-gray-900  py-4 md:py-7 px-4 md:px-8 xl:px-10">
//     <div class="sm:flex items-center justify-between">
//         <div class="flex items-center">
//             <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
//                 <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
//                     <p>All</p>
//                 </div>
//             </a>
//             <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
//                 <div class="py-2 px-8 text-gray-600 dark:text-gray-200  hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
//                     <p>Done</p>
//                 </div>
//             </a>
//             <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
//                 <div class="py-2 px-8 text-gray-600 dark:text-gray-200  hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
//                     <p>Pending</p>
//                 </div>
//             </a>
//         </div>
//         <button onclick="popuphandler(true)" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
//             <p class="text-sm font-medium leading-none text-white">Add Task</p>
//         </button>
//     </div>
//     <div class="mt-7 overflow-x-auto">
//         <table class="w-full whitespace-nowrap">
//             <tbody>
//                 <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">Marketing Keynote Presentation</p>
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg1.svg" alt="clip">
//                         </div>
//                     </td>
//                     <td class="pl-24">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg" alt="tag">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">Urgent</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <button class="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">Due today at 18:00</button>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none  h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td  class="focus:text-indigo-600 ">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">UX Wireframes</p>
//                         </div>
//                     </td>
//                     <td class="pl-24">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg" alt="tag">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">Urgent</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <button class="py-3 px-6 focus:outline-none text-sm leading-none text-gray-700 dark:text-white dark:bg-gray-800  bg-gray-100 rounded">Due on 21.02.21</button>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none focus:text-indigo-600 h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                   <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">Marketing Keynote Presentation</p>
//                         </div>
//                     </td>
//                     <td class="pl-24"></td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <button class="py-3 px-7 text-sm leading-none text-gray-700 dark:text-white  bg-gray-100 dark:bg-gray-800 rounded focus:outline-none">Due tomorrow</button>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2  focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" checked="" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">Development Phase 1</p>
//                         </div>
//                     </td>
//                     <td class="pl-24"></td>
//                     <td class="pl-5"></td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-red-300 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-red-300 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">Marketing Keynote Presentation</p>
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg1.svg" alt="clip">
//                         </div>
//                     </td>
//                     <td class="pl-24">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg" alt="tag">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">Urgent</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <button class="py-3 px-7 text-sm leading-none text-gray-700 dark:text-white  bg-gray-100 rounded focus:outline-none">Due tomorrow</button>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" checked="" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">Marketing Keynote Presentation</p>
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg1.svg" alt="clip">
//                         </div>
//                     </td>
//                     <td class="pl-24"></td>
//                     <td class="pl-5"></td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">CSS and functionality</p>
//                         </div>
//                     </td>
//                     <td class="pl-24">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg" alt="tag">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">Urgent</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <button class="py-3 px-3 text-sm leading-none text-red-700 bg-red-100 rounded focus:outline-none">Due Today at 18:00</button>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" checked="" type="checkbox" class="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">Marketing Keynote Presentation</p>
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg1.svg" alt="clip">
//                         </div>
//                     </td>
//                     <td class="pl-24"></td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg" alt="tag">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">Urgent</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//                 <tr class="h-3"></tr>
//                 <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 dark:border-gray-600  rounded">
//                     <td>
//                         <div class="ml-5">
//                             <div class="bg-gray-200 dark:bg-gray-800  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                 <input placeholder="checkbox" type="checkbox" class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
//                                 <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
//                                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg7.svg" alt="check-icon">
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                     <td class="">
//                         <div class="flex items-center pl-5">
//                             <p class="text-base font-medium leading-none text-gray-700 dark:text-white  mr-2">Vue integration</p>
//                         </div>
//                     </td>
//                     <td class="pl-24">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg" alt="tag">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">Urgent</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg" alt="list">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg" alt="chat">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">23</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <div class="flex items-center">
//                             <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg" alt="paper clip">
//                             <p class="text-sm leading-none text-gray-600 dark:text-gray-200  ml-2">04/07</p>
//                         </div>
//                     </td>
//                     <td class="pl-5">
//                         <button class="py-3 px-3 text-sm leading-none text-gray-700 dark:text-white  bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  rounded focus:outline-none">Due Today at 18:00</button>
//                     </td>
//                     <td class="pl-4">
//                         <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 dark:text-gray-200  py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-700   dark:bg-gray-800  focus:outline-none">View</button>
//                     </td>
//                     <td>
//                         <div class="relative px-5 pt-2">
//                             <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
//                                 <img  class="dropbtn" onclick="dropdownFunction(this)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg" alt="dropdown">
//                             </button>
//                             <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Edit</p>
//                                 </div>
//                                 <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
//                                     <p>Delete</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// </div>
// </div>
// <style>
// .checkbox:checked + .check-icon {
//     display: flex;
// }
// </style>
