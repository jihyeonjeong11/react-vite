import AnimatedDialog from './components/AnimatedDialog';
import MainExamDialog from './components/presentational/MainExamDialog';
import type { DialogTypes } from './constants';

const createDialog = (dialog: DialogTypes) => {
    switch (dialog) {
        case "inactive":
            return null;
        case "mainExam":
            return MainExamDialog;
        case "animated":
            return AnimatedDialog;
            
    }
};

export default createDialog;