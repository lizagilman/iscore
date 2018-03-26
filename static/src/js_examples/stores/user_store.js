import { observable } from 'mobx';

class UserStore {
	@observable name = false;
	@observable id = null;
	@observable token = null;
	@observable anonymous = null;
	@observable developer = false;
	@observable loginFail = false;
	@observable isWorking = false;
}
export default new UserStore();
