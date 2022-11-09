// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>
/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */
/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

export as namespace examLib;

const ZeroOrOne = {
    no: "0",
    yes: "1",
} as const;

const ExamTypes = {
    default: "0",
    CPX: "1",
    OSCE: "2",
    한CPX: "3",
    "4한OSCE": "4",
} as const;

// http://133.186.228.26:7070/api/exam/examBasicInfo
export interface BasicExamProps {
    ec_cd?: string; // 시험코드 // 없음
    ec_name?: string; // 시험명  // input
    e_student_collocate_kind?: ZeroOrOne; // 시험학생배치종류 // 라디오
    e_type?: ExamTypes; // 시험종류 // 셀렉트
    e_pa_use?: ZeroOrOne; // 시험방송사용 // 라디오
    e_desc?: string; // 시험수업설명 //textarea
}

// api 별로 따로 끊어서, 후에 extends하여 사용할 것임.
// module 먼저 localforage 사용, 후 작성 예정.
//  export interface ScenarioProps {
//     scenario_cd: string;
//     scenario_nm: string;
//  }
