/**
 * Created by jgluhov on 09/02/16.
 */
/*
 * @param $stateProvider|Object
 * @returns nothing
 */
export default function routes($stateProvider) {
	$stateProvider
		.state('admin', {
			url: '/admin',
			template: require('./admin.jade')(),
			controller: 'AdminController',
			controllerAs: 'admin'
		});
}
