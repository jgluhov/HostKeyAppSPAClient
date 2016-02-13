/**
 * Created by jgluhov on 09/02/16.
 */
export default class AdminController {
	constructor($scope, AppConstants, AdminService) {
		this.$scope = $scope;
		this.adminService = AdminService;
		this.appConstants = AppConstants;

		this.$scope.users = [];
		this.$scope.cities = [];
		this.$scope.institutions = [];

		// Response from server when page loaded
		this.adminService.loadItems().subscribe(
			data => {
				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						this.$scope[key] = data[key];
					}
				}
				this.$scope.$digest();
			},
			error => console.log(error)
		);

		// Response from server if create button is clicked
		this.adminService.createItem().subscribe(data => {
			console.log(data);
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					this.$scope[key].push(data[key]);
				}
			}
			this.$scope.$digest();
		});

		// Response from server if delete button is clicked
		this.adminService.deleteItem().subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);

		// Requesting data from server
		this.adminService.eventEmitter.emit('loadItems', 'users', `${this.appConstants.host}/users`);
		this.adminService.eventEmitter.emit('loadItems', 'cities', `${this.appConstants.host}/cities`);
		this.adminService.eventEmitter.emit('loadItems', 'institutions', `${this.appConstants.host}/institutions`);
	}

	// Event handlers
	createItem(form, category, item) {
		if (form.$invalid) {
			return;
		}
		this.adminService.eventEmitter.emit('createItem', `${this.appConstants.host}/${category}`, item);

		const modelName = form.$name.split('Form', 1);
		this.$scope[modelName] = null;
		this.$scope.$digest();
	}

	deleteItem(category, item) {
		this.adminService.eventEmitter.emit('deleteItem', `${this.appConstants.host}/${category}`, item);
		this.$scope[category].splice(this.$scope[category].indexOf(item), 1);
		this.$scope.$digest();
	}
}

AdminController.$inject = ['$scope', 'AppConstants', 'AdminService'];
