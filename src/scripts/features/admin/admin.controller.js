/**
 * Created by jgluhov on 09/02/16.
 */
export default class AdminController {
	constructor($scope, AdminService) {
		this.adminService = AdminService;
		this.$scope = $scope;
		this.$scope.users = [];
		this.$scope.cities = [];
		this.$scope.institutions = [];

		this.adminService.createItem().subscribe(data => {
			this.$scope[data.category].push(data.response.user);
			this.$scope.$digest();
		});

		this.adminService.loadData().subscribe(data => {
			console.log(data);
			//switch (data.form) {
			//	case 'userForm':
			//		this.$scope.users = data.response.users;
			//		this.$scope.$digest();
			//		break;
			//	case 'cityForm':
			//		break;
			//	case 'institutionForm':
			//		break;
			//	default:
			//		break;
			//}
		});

		this.adminService.deleteItem().subscribe(data => {
			this.$scope[data.category].splice(this.$scope[data.category].indexOf(data.item), 1);
			this.$scope.$digest();
		});

		this.adminService.eventEmitter.emit('loadItems', 'users', 'http://localhost:1337/users');
		this.adminService.eventEmitter.emit('loadItems', 'cities', 'http://localhost:1337/cities');
		this.adminService.eventEmitter.emit('loadItems', 'institutions', 'http://localhost:1337/institutions');
	}

	submitForm(item, form) {
		if (form.$invalid) {
			return;
		}
		const category = form.$name.split('Form')[0];
		this.adminService.eventEmitter.emit('createItem', category, `http://localhost:1337/${category}`, item);
	}

	deleteItem(item, category) {
		this.adminService.eventEmitter.emit('deleteItem', category, `http://localhost:1337/${category}`, item);
	}
}

AdminController.$inject = ['$scope', 'AdminService'];
