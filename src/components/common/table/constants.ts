interface StaticProps {
    [key: string]: string[];
};

const MainExams =  {
    mecCd: 'mec_cd',
    skinCd: 'skin_cd',
    mecNm: 'mecNm',
    mecState: 'mecState',
    mecInsertDt: 'mec_insert_dt',
    mecUpdateDt: 'mec_update_dt',
} as const;

export type MainExamKeys = typeof MainExams[keyof typeof MainExams];

export type MainExamProps = Record<string, MainExamKeys>;

export const mainExamClassMenu: {titleObject: {title: string, key: MainExamKeys}[]} = {
    titleObject: [
        {
            title: '메인시험명',
            key: MainExams['mecCd'],
        },
        {
            title: '메인시험상태',
            key: MainExams['mecState'],
        },
        {
            title: '생성일자',
            key: MainExams['mecInsertDt'],
        },
        {
            title: '수정일자',
            key: MainExams['mecUpdateDt'],
        }
    ]
}

export const staticState: StaticProps = {
    test: [
        "ID",
        "메인시험명",
        "시험종류",
        "학생배치",
        "그룹별 시험 정보",
        "대기 학생",
        "PA 정보",
        "이벤트",
        "생성일자",
        "수정일자",
    ],
    class: ["id", "수업명", "수업과목", "수업시간", "수업실"],
};