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

		this.dtOptions = DTOptionsBuilder.newOptions().withBootstrap();

		this.$http.get(`${AppConstants.host}/users`).then((response) => {
			this.users = response.data.users;
		});

		// Response from server when page loaded
		this.dataService.loadItems().subscribe(
			data => {
				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						this.$scope[key] = data[key];
					}
				}
				this.$scope.$digest();
			}
		);

		// Requesting data from server
		this.dataService.eventEmitter.emit('loadItems', 'users', `${this.appConstants.host}/users`);
		this.dataService.eventEmitter.emit('loadItems', 'cities', `${this.appConstants.host}/cities`);
		this.dataService.eventEmitter.emit('loadItems', 'institutions', `${this.appConstants.host}/institutions`);
	}
}

HomeController.$inject = ['$scope', '$http', 'AppConstants', 'DTOptionsBuilder', 'DataService'];
