/*global Rx*/

import EventEmitter from 'events';
import 'rxjs';
import 'rx-dom';

export default class AdminService {
	constructor() {
		this.eventEmitter = new EventEmitter.EventEmitter();
	}

	loadItems() {
		return Rx.Observable.fromEvent(this.eventEmitter, 'loadItems', (...args) => {
			return {category: args[0], url: args[1]};
		})
		.flatMap(args => Rx.DOM.ajax({
			method: 'GET',
			url: args.url,
			responseType: 'json'
		}))
		.map(r => r.response);
	}

	createItem() {
		return Rx.Observable.fromEvent(this.eventEmitter, 'createItem', (...args) => {
			return {url: args[0], body: {name: args[1]}};
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
		.map(r => r.response);
	}

	deleteItem() {
		return Rx.Observable.fromEvent(this.eventEmitter, 'deleteItem', (...args) => {
			return {url: args[0], query: {id: args[1]._id}};
		})
		.debounce(500)
		.distinctUntilChanged()
		.flatMapLatest(args => Rx.DOM.ajax({
			method: 'DELETE',
			url: `${args.url}/${args.query.id}`,
			responseType: 'json'
		}))
		.map(r => {
			return {response: r.response};
		});
	}
}
