/*global Rx*/

import EventEmitter from 'events';
import 'rxjs';
import 'rx-dom';
import moment from 'moment';

export default class DataService {
	constructor() {
		this.eventEmitter = new EventEmitter.EventEmitter();
	}

	loadItems() {
		return Rx.Observable.fromEvent(this.eventEmitter, 'loadItems', (...args) => {
			let query = '';
			// Generate filters query
			if (args[2]) {
				query = Object.keys(args[2])
					.map(key => key + '=' + args[2][key].map(elem => elem._id).join(','))
					.join('&');
			}
			return {category: args[0], url: args[1], query};
		})
		.flatMap(args => Rx.DOM.ajax({
			method: 'GET',
			url: `${args.url}${args.query ? '?' + args.query : ''}`,
			responseType: 'json'
		}))
		.doOnError(error => {
			console.log(error);
		})
		.retry()
		.map(r => {
			moment.locale('ru');
			r.response[Object.keys(r.response)[0]].forEach((elem) => {
				elem.created = moment(elem.created).format('LLL');
			});
			return r.response;
		});
	}

	createItem() {
		return Rx.Observable.fromEvent(this.eventEmitter, 'createItem', (...args) => {
			return {url: args[0], body: {item: args[1]}};
		})
		.debounce(500)
		.distinctUntilChanged()
		.flatMapLatest(args => Rx.DOM.ajax({
			method: 'POST',
			url: args.url,
			body: JSON.stringify(args.body),
			responseType: 'json',
			headers: {'Content-Type': 'application/json'}
		}))
		.doOnError(error => {
			console.log(error);
		})
		.retry()
		.map(r => {
			moment.locale('ru');
			// Format data in response object (created prop)
			const obj = r.response[Object.keys(r.response)[0]];
			Object.defineProperty(obj, 'created', {value: moment(obj.created).format('LLL')});
			return r.response;
		});
	}

	deleteItem() {
		return Rx.Observable.fromEvent(this.eventEmitter, 'deleteItem', (...args) => {
			return {url: args[0], query: {id: args[1]._id}};
		})
		.flatMap(args => Rx.DOM.ajax({
			method: 'DELETE',
			url: `${args.url}/${args.query.id}`,
			responseType: 'json'
		}))
		.doOnError(error => {
			console.log(error);
		})
		.retry()
		.map(r => r.response);
	}
}
