const enRepresentationsIndexTranslations = require('./en.json');

describe('pages/projects/representations/index/_translations/en.json', () => {
	it('should return the English representations index page translations', () => {
		expect(enRepresentationsIndexTranslations).toEqual({
			pageTitle1: 'Relevant Representations',
			heading1: 'Relevant representations (registration comments)',
			paragraph1:
				'Search by the person or group making the submission or the content of the submission.',
			phrase1: 'Showing',
			phrase2: 'to',
			phrase3: 'of',
			phrase4: 'representations, newest first.',
			paragraph5:
				'The relevant representations for this project have been archived and are no longer available on this site.'
		});
	});
});
