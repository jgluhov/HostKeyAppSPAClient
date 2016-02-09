/**
 * Created by jgluhov on 09/02/16.
 */
/**
 * @param $urlRouterProvider
 * @param $locationProvider
 * @param $compileProvider
 */

export default function config($urlRouterProvider, $locationProvider, $compileProvider) {
	$urlRouterProvider.otherwise('/');

	// Performance boost
	$compileProvider.debugInfoEnabled(true);
}

config.$inject = ['$urlRouterProvider', '$locationProvider', '$compileProvider'];
