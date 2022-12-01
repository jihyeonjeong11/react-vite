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
    한OSCE4: "4" // 한글 깨짐 문제로 불가피하게 변경: "4한OSCE" -> 한OSCE4
} as const;

export default class Validate {
    SetExamTypes(n:string):string {
        return ExamTypes[n];
    }
    GetExamTypes(n:string):string {
        return Object.keys(ExamTypes).find(key => ExamTypes[key] === n);
    }
}

// http://133.186.228.26:7070/api/exam/examBasicInfo
export interface BasicExamProps {
    ec_cd?: string; // 시험코드 // 없음
    ec_name?: string; // 시험명  // input
    e_student_collocate_kind?: ZeroOrOne; // 시험학생배치종류 // 라디오
    e_type?: ExamTypes; // 시험종류 // 셀렉트
    e_pa_use?: ZeroOrOne; // 시험방송사용 // 라디오
    e_desc?: string; // 시험수업설명 //textarea
}

/** 시험 작성 */
// api request body 기준으로 작성되었습니다.
/** 메인 시험 추가 */
export type NewMainExam =  {
    mec_nm: string; // 메인시험_명
    mec_memo?: string; // 메인시험_설명
}
/** 서브 시험 단계 1: 추가 및 수정 */
export type subExamStep1 = {
    ec_cd?: string; // 시험수업_코드
    mec_cd: string; // 메인시험수업_코드
    ec_name: string; // 시험수업_명
    e_type: "1" | "2" | "3" | "4"; // 시험종류 (1: CPX, 2: OSCE, 3: 한CPX, 4:한OSCE)
    e_pa_use: "0" | "1"; // 시험_방송_사용 (0: 미사용, 1: 사용)
}
/** 서브 시험 단계 2: 그룹별 시나리오 */
export type subExamStep2 = {
    exam_class_group_cd?: string; // 시험_수업_그룹_코드
    ec_cd: string; // 시험수업_코드
    mec_cd: string; // 메인시험수업_코드
    group_nm: string; // 그룹_명
    exam_class_group_row_data?: {
        exam_class_group_row_cd: string, // 시험_수업_그룹_하위_코드
        room_cd: string, // 룸_코드
        scenario_cd: string // 시나리오_코드
    }[]
}
/** 서브 시험 단계 3: 대기학생 추가 */
export type subExamStep3 = Omit<subExamStep2, "exam_class_group_row_data"> & {
    exam_wait_student_data: {
        student_cd: string; // 학생_코드
        student_id: string; // 학생_아이디
        student_nm: string; // 학생_이름
        student_grade: string; // 학생_학년
    }[]
}
/** 서브 시험 단계 4: PA 등록 */
export type subExamStep4 = Pick<subExamStep2, "ec_cd"|"mec_cd"> & {
    pa_data: {
        pa_play_dt: string; // 방송_재생_시간
        exam_pa_mp3_cd: string; // 시험_방송_mp3_코드
        pa_content: string; // 방송_내용
        mp3_file_nm: string; // mp3_파일_명
    }
}

export type ExamForms = NewMainExam | subExamStep1 | subExamStep2 | subExamStep3 | subExamStep4;
export type ExamFormNames = "NewMainExam" | "subExamStep1" | "subExamStep2" | "subExamStep3" | "subExamStep4";


// api 별로 따로 끊어서, 후에 extends하여 사용할 것임.
// module 먼저 localforage 사용, 후 작성 예정.
//  export interface ScenarioProps {
//     scenario_cd: string;
//     scenario_nm: string;
//  }
