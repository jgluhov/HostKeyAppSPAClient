/**
 * Created by jgluhov on 09/02/16.
 */

export default class HomeController {
	constructor($scope) {
		this.name = 'HomeController';
		this.$scope = $scope;

		this.$scope.options = {
			scrollbarV: false
		};

		this.$scope.data = [
			{name: 'Austin', gender: 'Male'},
			{name: 'Marjan', gender: 'Male'}
		];
	}
}

HomeController.$inject = ['$scope'];
