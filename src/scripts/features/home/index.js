/**
 * Created by jgluhov on 09/02/16.
 */
import './home.styl';
import 'bootstrap';
import 'angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap';
import 'angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import datatables from 'angular-datatables';

import config from './home.config';
import HomeController from './home.controller';
import select2 from '../../directives/select2';
import DataService from '../../services/data';

export default angular.module('app.home', [
	uirouter, select2, datatables, 'datatables.bootstrap', DataService
])
	.config(config)
	.controller('HomeController', HomeController)
	.name;
