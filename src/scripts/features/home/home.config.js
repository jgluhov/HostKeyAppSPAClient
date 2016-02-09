/**
 * Created by jgluhov on 09/02/16.
 */
/*
 * @param $stateProvider|Object
 * @returns nothing
 */
export default function routes($stateProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			template: require('./home.jade')(),
			controller: 'HomeController',
			controllerAs: 'home'
		});
}

routes.$inject = ['$stateProvider'];
