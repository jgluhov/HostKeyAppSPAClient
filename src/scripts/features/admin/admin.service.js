/**
 * Created by jgluhov on 09/02/16.
 */
/*global Rx*/
import EventEmitter from 'events';
import 'rxjs';
import 'rx-dom';

export default class AdminService {
	constructor() {
		this.eventEmitter = new EventEmitter.EventEmitter();
	}

	loadData() {
		let form = null;
		return Rx.Observable.fromEvent(this.eventEmitter, 'loadData', (...args) => {
			form = args[0];
			return {url: args[1]};
		}).flatMapObserver(args => Rx.DOM.ajax({
			method: 'GET',
			url: args.url,
			responseType: 'json'
		}))
		.map(r => {
			return {response: r.response, form};
		});
	}

	createData() {
		let form = null;
		return Rx.Observable.fromEvent(this.eventEmitter, 'createData', (...args) => {
			form = args[0];
			return {url: args[1], body: {data: args[2]}};
		})
		.debounce(500)
		.distinctUntilChanged()
		.flatMapLatest(args => Rx.DOM.ajax({
			method: 'POST',
			url: args.url,
			body: JSON.stringify(args.body),
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json'
			}
		}))
		.map(r => {
			return {response: r.response, form};
		});
	}
}
