const enTranslation = require('./en.json');
const cyTranslation = require('./cy.json');

const expectedTranslationKeys = [
	'heading1',
	'paragraph1',
	'paragraph2',
	'linkText1',
	'paragraph3',
	'sortByLinks'
].sort();

const expectedTranslationSortByLinksKeys = [
	'projectName',
	'location',
	'applicant',
	'dateOfApplication',
	'dateOfDecision',
	'stage'
].sort();

describe('pages/register-of-applications/_translations', () => {
	it('has the exact keys for English', () => {
		expect(Object.keys(enTranslation).sort()).toEqual(expectedTranslationKeys);
		expect(Object.keys(enTranslation.sortByLinks).sort()).toEqual(
			expectedTranslationSortByLinksKeys
		);
	});

	it('has the exact keys for Welsh', () => {
		expect(Object.keys(cyTranslation).sort()).toEqual(expectedTranslationKeys);
		expect(Object.keys(cyTranslation.sortByLinks).sort()).toEqual(
			expectedTranslationSortByLinksKeys
		);
	});
});
