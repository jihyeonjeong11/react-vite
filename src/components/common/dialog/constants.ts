import AnimatedDialog from "./components/AnimatedDialog";
import MainExamDialog from "./components/presentational/MainExamDialog";

export const Dialogs = {
    inactive: null,
    mainExam: MainExamDialog,
    animated: AnimatedDialog
} as const;

export type DialogTypes = keyof typeof Dialogs;