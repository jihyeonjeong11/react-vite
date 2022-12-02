import MainExamDialog from './components/presentational/MainExamDialog';
import type { DialogTypes } from './constants';

const createDialog = (dialog: DialogTypes) => {
    switch (dialog) {
        case "inactive":
            return null;
        case "mainExam":
            return MainExamDialog;
    }
};
export default createDialog;