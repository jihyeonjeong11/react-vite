import AnimatedDialog from './components/AnimatedDialog';
import MainExamDialog from './components/presentational/MainExamDialog';
import SubExamDialog from './components/presentational/SubExamDialog';
import type { DialogTypes } from './constants';

const createDialog = (dialog: DialogTypes) => {
    switch (dialog) {
        case "inactive":
            return null;
        case "mainExam":
            return MainExamDialog;
        case "subExam":
            return SubExamDialog
        case "animated":
            return AnimatedDialog;
            
    }
};

export default createDialog;