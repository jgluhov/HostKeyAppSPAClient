/**
 * Created by jgluhov on 09/02/16.
 */
import angular from 'angular';
import uirouter from 'angular-ui-router';

import config from './home.config';
import HomeController from './home.controller';

export default angular.module('app.home', [uirouter])
	.config(config)
	.controller('HomeController', HomeController)
	.name;
