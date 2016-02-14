import angular from 'angular';

import 'select2/dist/js/select2';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';

import select2 from './select2.directive';

export default angular.module('directives.select2', [])
	.directive('select2', select2)
	.name;
