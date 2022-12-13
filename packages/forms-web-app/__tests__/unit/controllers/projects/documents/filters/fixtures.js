const mockQueryFixture = {
	'stage 1': 'Procedural Decisions',
	'stage 4': ['Deadline 2', 'Proc Decision'],
	searchTerm: ''
};

const filterOne = {
	name: 'stage 1',
	idPrefix: 'stage 1',
	title: 'stage 1  (4)',
	items: [
		{
			text: 'Procedural Decisions (3)',
			value: 'Procedural Decisions',
			checked: false
		},
		{ text: 'TEN E (1)', value: 'TEN E', checked: false }
	]
};

const filterTwo = {
	name: 'stage 4',
	idPrefix: 'stage 4',
	title: 'stage 4  (7)',
	items: [
		{ text: 'Deadline 2 (6)', value: 'Deadline 2', checked: false },
		{
			text: 'Proc Decision (1)',
			value: 'Proc Decision',
			checked: false
		}
	]
};
const mockFilterFixture = [filterOne, filterTwo];

module.exports = {
	mockFilterFixture,
	mockQueryFixture,
	filterOne,
	filterTwo
};
