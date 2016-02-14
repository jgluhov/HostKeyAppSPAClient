/**
 * Created by jgluhov on 09/02/16.
 */
import 'bootstrap/dist/css/bootstrap.css';
import './app.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import config from './app.config';
import AppConstants from './app.constants.js';
import home from './features/home';
import admin from './features/admin';

const app = angular.module('app', [uirouter, home, admin])
	.config(config)
	.constant('AppConstants', new AppConstants())
	.name;

angular.bootstrap(document, [app]);
