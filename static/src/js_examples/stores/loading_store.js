import { observable } from 'mobx';

class LoadingStore {
	@observable is_loading = false;
}
export default new LoadingStore();
