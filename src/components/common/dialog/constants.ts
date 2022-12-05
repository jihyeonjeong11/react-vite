const Dialogs = ["inactive", "mainExam", "subExam"] as const;

export type DialogTypes = typeof Dialogs[number];
