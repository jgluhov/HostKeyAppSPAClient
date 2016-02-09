/**
 * Created by jgluhov on 09/02/16.
 */
export default class AdminController {
	constructor($scope, AdminService) {
		this.adminService = AdminService;
		this.$scope = $scope;
		this.$scope.users = [];
		this.cities = [];
		this.institutions = [];

		this.adminService.createData().subscribe(data => {
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
			console.log(data);
		});

		this.adminService.loadData().subscribe(data => {
			console.log(data);
			switch (data.form) {
				case 'userForm':
					this.$scope.users = data.response.users;
					this.$scope.$digest();
					break;
				case 'cityForm':
					break;
				case 'institutionForm':
					break;
				default:
					break;
			}
		});

		this.adminService.eventEmitter.emit('loadData', 'userForm', 'http://localhost:1337/users');
		//this.adminService.eventEmitter.emit('loadData', 'cityForm', 'http://localhost:1337/cities');
		//this.adminService.eventEmitter.emit('loadData', 'institutionForm', 'http://localhost:1337/institutions');
	}

	submitForm(form) {
		if (form.$invalid) {
			return;
		}

		switch (form.$name) {
			case 'userForm':
				this.adminService.eventEmitter.emit('createData', form.$name, 'http://localhost:1337/users', this.$scope.user);
				break;
			case 'cityForm':
				this.adminService.eventEmitter.emit('createData', form.$name, 'http://localhost:1337/cities', this.user);
				break;
			case 'institutionForm':
				this.adminService.eventEmitter.emit('createData', form.$name, 'http://localhost:1337/institutions', this.user);
				break;
			default:
				break;
		}

	}
}

AdminController.$inject = ['$scope', 'AdminService'];
