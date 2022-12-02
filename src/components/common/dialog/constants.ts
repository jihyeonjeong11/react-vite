import MainExamDialog from "./components/presentational/MainExamDialog";

export const Dialogs = {
    inactive: null,
    mainExam: ()=> MainExamDialog,
} as const;

export type DialogTypes = keyof typeof Dialogs;