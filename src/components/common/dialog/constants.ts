export const Dialogs = {
    inactive: {
        name: "inactive",
        title: null,
        component: null
    },
    mainExam: {
        name: "mainExam",
        title: "메인 시험 추가",
        component: null
    },
} as const;

export type DialogTypes = keyof typeof Dialogs;