const enIndexTranslations = require('./en.json');

describe('pages/index/_translations/en', () => {
	it('should return the english index page translations', () => {
		expect(enIndexTranslations).toEqual({
			heading1: 'Welcome to Find a National Infrastructure Project',
			heading2: 'I am looking for a project',
			heading3: 'I want to view all projects',
			heading4: 'Information for members of the public',
			heading5: 'Information for professional users',
			heading6: 'Updates and contact information',
			linkParagraph1:
				'Here you can view the stages that an application goes through from start to finish.',
			linkParagraph2: 'Find out everything you need to know about sharing your views on a project.',
			linkParagraph3: 'Find advice notes, relevant legislation and national policy statements.',
			linkParagraph4:
				'If you want to build a new development, this is what you need to know before you start.',
			linkParagraph5: 'How to get in contact with us.',
			linkTitle1: 'See the process',
			linkTitle2: 'How to have your say on a project',
			linkTitle3: 'View detailed information',
			linkTitle4: 'See the process of submitting a project',
			linkTitle5: 'I need help',
			paragraph1:
				'Here you can find more information about Nationally Significant Infrastructure Projects (NSIPs). These are large scale projects like power stations, highways and power lines. They are treated separately from normal local authority planning because of their size and importance to wider communities.',
			paragraph2:
				'This site is managed by the Planning Inspectorate, the government agency responsible for examining applications of this size and scale in England and Wales.',
			paragraph3:
				'This is a new service. If you are visiting for information on a Welsh project, visit our {{-link}}.',
			paragraph3LinkText: 'old website',
			paragraph4: 'Search by project name or applicant',
			paragraph5: 'See a {{-link}}',
			paragraph5LinkText: 'complete list of all projects',
			linkTitle6: 'See the latest news',
			linkParagraph6: 'See the latest NSIP news.'
		});
	});
});
