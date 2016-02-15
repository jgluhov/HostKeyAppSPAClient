/**
 * Created by jgluhov on 09/02/16.
 */

export default class HomeController {
	constructor($scope, $http, AppConstants, DTOptionsBuilder, DataService) {
		this.$scope = $scope;
		this.$http = $http;
		this.appConstants = AppConstants;
		this.dataService = DataService;

		this.users = [];
		this.cities = [];
		this.institutions = [];

		this.$scope.filter = {
			cities: [],
			institutions: []
		};

		this.dtOptions = DTOptionsBuilder.newOptions().withBootstrap();

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

		// Requesting data from server
		this.dataService.eventEmitter.emit('loadItems', 'users', `${this.appConstants.host}/users`);
		this.dataService.eventEmitter.emit('loadItems', 'cities', `${this.appConstants.host}/cities`);
		this.dataService.eventEmitter.emit('loadItems', 'institutions', `${this.appConstants.host}/institutions`);

		this.$scope.$on('$destroy', () => {
			this.loadItems$.dispose();
		});
	}

	onSelect(category, item) {
		const elem = this[category].filter(el => el.name === item.text)[0];
		this[category].splice(this[category].indexOf(elem), 1);
		this.$scope.filter[category].push(elem);

		this.$scope.$broadcast('onChange');
		this.$scope.$digest();
	}

	onFilterRemove(category, item) {
		const elem = this.$scope.filter[category].filter(el => {
			return el._id === item._id;
		})[0];
		this.$scope.filter[category].splice(this[category].indexOf(elem), 1);
		this[category].push(elem);
	}

	onFilterApply() {
		this.dataService.eventEmitter.emit('loadItems', 'users', `${this.appConstants.host}/users`, this.$scope.filter);
	}
}

HomeController.$inject = ['$scope', '$http', 'AppConstants', 'DTOptionsBuilder', 'DataService'];
