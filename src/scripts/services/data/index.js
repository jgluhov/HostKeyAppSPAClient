import angular from 'angular';

import DataService from './data.service';

export default angular.module('services.data', [])
	.service('DataService', DataService)
	.name;
