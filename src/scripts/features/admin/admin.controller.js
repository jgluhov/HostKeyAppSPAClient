/**
 * Created by jgluhov on 09/02/16.
 */
import angular from 'angular';

export default class AdminController {
	constructor($scope, AppConstants, DataService) {
		this.$scope = $scope;
		this.dataService = DataService;
		this.appConstants = AppConstants;

		// Data arrays for tables
		this.users = [];
		this.cities = [];
		this.institutions = [];

		// Form models
		$scope.user = {};
		$scope.city = {};
		$scope.institution = {};

		// Response from server when page loaded
		this.loadItems$ = this.dataService.loadItems().subscribe(
			data => {
				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						this[key] = data[key];
					}
				}
				this.$scope.$digest();
			}
		);

		// Response from server if create button is clicked
		this.createItem$ = this.dataService.createItem().subscribe(data => {
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					this[key].push(data[key]);
				}
			}
			this.$scope.$digest();
		});

		// Response from server if delete button is clicked
		this.deleteItem$ = this.dataService.deleteItem().subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);

		// Requesting data from server
		this.dataService.eventEmitter.emit('loadItems', 'users', `${this.appConstants.host}/users`);
		this.dataService.eventEmitter.emit('loadItems', 'cities', `${this.appConstants.host}/cities`);
		this.dataService.eventEmitter.emit('loadItems', 'institutions', `${this.appConstants.host}/institutions`);

		this.$scope.$on('$destroy', () => {
			this.deleteItem$.dispose();
			this.createItem$.dispose();
			this.loadItems$.dispose();
		});
	}

	// Event handlers
	createItem(form, category, item) {
		if (form.$invalid) {
			return;
		}
		this.dataService.eventEmitter.emit('createItem', `${this.appConstants.host}/${category}`, angular.copy(item));

		const model = form.$name.split('Form')[0];
		this.$scope[model].name = undefined;
		this.$scope.$broadcast('onChange');
	}

	deleteItem(category, item) {
		this.dataService.eventEmitter.emit('deleteItem', `${this.appConstants.host}/${category}`, item);
		this[category].splice(this[category].indexOf(item), 1);
	}

	onSelect(category, item) {
		switch (category) {
			case 'cities': this.$scope.user.cityID = item.id; break;
			case 'institutions': this.$scope.user.institutionID = item.id; break;
			default: break;
		}
		this.$scope.$apply();
	}
}

AdminController.$inject = ['$scope', 'AppConstants', 'DataService'];
