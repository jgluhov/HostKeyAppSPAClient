/**
 * Created by jgluhov on 09/02/16.
 */
import 'angular-data-table/release/dataTable.css';
import 'angular-data-table/release/material.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-data-table/release/dataTable.es6';

import config from './home.config';
import HomeController from './home.controller';

export default angular.module('app.home', [uirouter, 'data-table'])
	.config(config)
	.controller('HomeController', HomeController)
	.name;
