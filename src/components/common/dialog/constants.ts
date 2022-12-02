const Dialogs = ["inactive", "mainExam"] as const;

export type DialogTypes = typeof Dialogs[number];
