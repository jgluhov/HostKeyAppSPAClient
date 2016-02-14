import $ from 'jquery';

export default function select2() {

	function link(scope, element) {
		const select = $(element[0]).select2({
			theme: 'bootstrap',
			minimumResultsForSearch: Infinity
		});

		$(element[0]).on('select2:select', (e) => {
			scope.onSelect({category: scope.category, item: e.params.data});
		});

		scope.$on('onChange', () => {
			select.val('init').trigger('change');
		});
	}

	return {
		restrict: 'A',
		link,
		scope: {
			category: '@',
			onSelect: '&'
		}
	};
}
