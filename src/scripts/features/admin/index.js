/**
 * Created by jgluhov on 09/02/16.
 */
import './admin.styl';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import config from './admin.config';
import AdminController from './admin.controller';
import AdminService from './admin.service';
import select2 from '../../directives/select2';

export default angular.module('app.admin', [uirouter, select2])
	.config(config)
	.controller('AdminController', AdminController)
	.service('AdminService', AdminService)
	.name;
