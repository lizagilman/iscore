import { observable, computed } from 'mobx';

class EmployeeStore {
	@observable allEmployees = [];

    @computed get autoCompleteEmployees() {
        let obj = {
            data: {}
        };
        for(let employee of this.allEmployees){
            obj.data[`${employee.FirstName} ${employee.LastName}`] = employee.EMail;
        }
        return obj;
    }


}
export default new EmployeeStore();
