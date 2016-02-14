/**
 * Created by jgluhov on 09/02/16.
 */
import './admin.styl';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import config from './admin.config';
import AdminController from './admin.controller';
import DataService from '../../services/data';
import select2 from '../../directives/select2';

export default angular.module('app.admin', [uirouter, select2, DataService])
	.config(config)
	.controller('AdminController', AdminController)
	.name;
