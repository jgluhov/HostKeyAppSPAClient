/**
 * Created by jgluhov on 09/02/16.
 */
export default class AdminController {
	constructor($scope, AdminService) {
		this.adminService = AdminService;
		this.$scope = $scope;

		this.adminService.observer().subscribe((data) => console.log(data));
	}

	submitForm(form) {
		if (form.$invalid) {
			return;
		}

		switch (form.$name) {
			case 'userForm':
				this.adminService.eventEmitter.emit('submitForm', '/users', this.$scope.user);
				break;
			case 'cityForm':
				this.adminService.eventEmitter.emit('submitForm', '/cities', this.user);
				break;
			case 'institutionForm':
				this.adminService.eventEmitter.emit('submitForm', '/institutions', this.user);
				break;
			default:
				break;
		}

	}
}

AdminController.$inject = ['$scope', 'AdminService'];
