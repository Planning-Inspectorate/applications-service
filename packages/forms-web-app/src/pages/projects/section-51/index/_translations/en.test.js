const enSection51IndexTranslations = require('./en.json');

describe('pages/projects/section-51/index/_translations/en.json', () => {
	it('should return the English section 51 index page translations', () => {
		expect(enSection51IndexTranslations).toEqual({
			paragraph1: 'The list below includes a record of advice we have provided for this project.',
			paragraph2:
				'There is a statutory duty, under {{-link}}, around an application or potential application. This includes recording the name of the person who requested advice and the advice given. This information has to be made publicly available.',
			paragraph2LinkText1: 'section 51 of the Planning Act 2008',
			heading2: 'Search advice',
			paragraph3:
				'Search by key words for example, Applicant advice log, or the name of person the advice was given to.',
			phrase1: 'Showing',
			phrase2: 'to',
			phrase3: 'of',
			phrase4: 'documents, newest first.',
			paragraph4: 'No advice was found matching your search term.',
			paragraph5: 'Would you like to clear your search to view all available advice instead?',
			paragraph6: 'There is no advice to show for this project'
		});
	});
});
