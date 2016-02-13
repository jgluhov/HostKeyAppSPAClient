/**
 * Created by jgluhov on 09/02/16.
 */

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uiselect from 'ui-select';
import ngSanitize from 'angular-sanitize';

import config from './admin.config';
import AdminController from './admin.controller';
import AdminService from './admin.service';

export default angular.module('app.admin', [uirouter, uiselect, ngSanitize])
	.config(config)
	.controller('AdminController', AdminController)
	.service('AdminService', AdminService)
	.name;
