const mockQueryFixture = {
	'filter group 1': 'filter-group-1-item-1',
	'filter group 2': ['filter-group-2-item-1', 'filter-group-2-item-2'],
	searchTerm: ''
};

const filterGroup1 = {
	name: 'filter group 1',
	idPrefix: 'filter group 1',
	title: 'filter group 1  (4)',
	label: 'label 1',
	items: [
		{
			text: 'filter-group-1-item-1 (3)',
			value: 'filter-group-1-item-1',
			checked: false
		},
		{ text: 'filter-group-1-item-2 (1)', value: 'filter-group-1-item-2', checked: false }
	]
};

const filterGroup2 = {
	name: 'filter group 2',
	idPrefix: 'filter group 2',
	title: 'filter group 2  (7)',
	label: 'label 2',
	items: [
		{ text: 'filter-group-2-item-1 (6)', value: 'filter-group-2-item-1', checked: false },
		{
			text: 'filter-group-2-item-2 (1)',
			value: 'filter-group-2-item-2',
			checked: false
		}
	]
};

const mockFilterFixture = [filterGroup1, filterGroup2];

module.exports = {
	mockFilterFixture,
	mockQueryFixture,
	filterGroup1,
	filterGroup2
};
