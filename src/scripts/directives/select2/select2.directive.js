import $ from 'jquery';

export default function select2() {

	function link(scope, element, attrs, ngModel) {
		$(element[0]).select2({
			theme: 'bootstrap',
			minimumResultsForSearch: Infinity
		});
		$(element[0]).on('select2:select', (e) => {
			ngModel.$setViewValue(e.params.data.id);
		});
	}

	return {
		restrict: 'A',
		require: '?ngModel',
		link
	};
}
