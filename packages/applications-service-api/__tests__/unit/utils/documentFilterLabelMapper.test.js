const { mapDocumentFilterLabel } = require('../../../src/utils/documentFilterLabelMapper');

describe('mapDocumentFilterLabel', () => {
	it.each([
		['stage', 1, 'Pre-application'],
		['stage', 2, 'Acceptance'],
		['stage', 3, 'Pre-examination'],
		['stage', 4, 'Examination'],
		['stage', 5, 'Recommendation'],
		['stage', 6, 'Decision'],
		['stage', 7, 'Post-decision'],
		['category', "Developer's Application", "Developer's Application"],
		['non-existent-filter', 'someValue', 'someValue'],
		['stage', 99999, undefined]
	])(
		'given filter name %s and value %s, returns label %s',
		(filterName, filterValue, expectedLabel) => {
			expect(mapDocumentFilterLabel(filterName, filterValue)).toEqual(expectedLabel);
		}
	);
});
