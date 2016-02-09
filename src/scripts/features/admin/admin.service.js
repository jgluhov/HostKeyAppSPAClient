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

	observer() {
		const observer = Rx.Observable.fromEvent(this.eventEmitter, 'submitForm', (...args) => {
			return {url: args[0], data: args[1]};
		}).map(args => {
			return args;
		}).flatMapLatest(args => Rx.DOM.ajax({
			method: 'POST',
			url: args.url,
			data: args.data
		}))
		.map(r => r.response);

		return observer;
	}
}
