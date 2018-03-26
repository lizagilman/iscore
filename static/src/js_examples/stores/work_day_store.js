import { observable } from 'mobx';

class WorkDayStore {
    @observable projectNameInput = "";
    @observable isFromHome = false;
    @observable assignmentType = "";
    @observable assignmentID = null;
    @observable userClickedSaveWorkDay = false;
}
export default new WorkDayStore();
