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
		let form = null;
		return Rx.Observable.fromEvent(this.eventEmitter, 'submitForm', (...args) => {
			form = args[0];
			return {url: args[1], data: args[2]};
		})
		.debounce(500)
		.distinctUntilChanged()
		.flatMapLatest(args => Rx.DOM.ajax({
			method: 'POST',
			url: args.url,
			data: args.data,
			responseType: 'json'
		}))
		.map(r => {
			return {response: r.response, form};
		});
	}
}
