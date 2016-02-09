/**
 * Created by jgluhov on 09/02/16.
 */
export default class AdminController {
	constructor($scope, AdminService) {
		this.adminService = AdminService;
		this.$scope = $scope;

		this.adminService.observer().subscribe((data) => {
			switch (data) {
				case 'userForm':
					break;
				case 'cityForm':
					break;
				case 'institutionForm':
					break;
				default:
					break;
			}
		});
	}

	submitForm(form) {
		if (form.$invalid) {
			return;
		}

		switch (form.$name) {
			case 'userForm':
				this.adminService.eventEmitter.emit('submitForm', form.$name, 'http://localhost:1337/users', this.$scope.user);
				break;
			case 'cityForm':
				this.adminService.eventEmitter.emit('submitForm', form.$name, 'http://localhost:1337/cities', this.user);
				break;
			case 'institutionForm':
				this.adminService.eventEmitter.emit('submitForm', form.$name, 'http://localhost:1337/institutions', this.user);
				break;
			default:
				break;
		}

	}
}

AdminController.$inject = ['$scope', 'AdminService'];
