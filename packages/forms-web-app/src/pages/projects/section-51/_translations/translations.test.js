const enTranslation = require('./en.json');
const cyTranslation = require('./cy.json');

const expectedTranslationKeys = [
	'heading',
	'anonymous',
	'dateOfMeeting',
	'dateAdviceGiven',
	'meetingWith',
	'adviceTo',
	'enquiryFrom',
	'enquiryType',
	'from',
	'readMore',
	'viewMeetingWith',
	'viewAdviceTo',
	'details'
].sort();

describe('pages/projects/section-51/_translations', () => {
	it('has the exact keys for English', () => {
		expect(Object.keys(enTranslation).sort()).toEqual(expectedTranslationKeys);
	});

	it('has the exact keys for Welsh', () => {
		expect(Object.keys(cyTranslation).sort()).toEqual(expectedTranslationKeys);
	});
});
