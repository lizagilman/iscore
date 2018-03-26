import { observable, computed } from 'mobx';

class TaskStore {
	@observable task = {
		project: {name: 'בחר'},
		task_status: 'בבדיקה',
		developers: [],
		opened_by: "",
		email: "",
		description: "",
		start_date: "",
		due_date: "",
		end_date: "",
		review_date: "",
        print_screen_url: "הכנס כתובת אתר של תמונה (URL) או העלה קובץ",
		is_bug: false,
		print_screen_file: null
	};
	@observable taskDevsIds = [];
}
export default new TaskStore();
