const enDetailedInformationTranslations = require('./en.json');

describe('pages/detailed-information/_translations/en', () => {
	it('should return the english detailed information page translations', () => {
		expect(enDetailedInformationTranslations).toEqual({
			heading1: 'Detailed information',
			linkParagraph1: 'View the stages an application goes through, from start to finish.',
			linkParagraph2: 'Find out everything you need to know about sharing your views on a project.',
			linkParagraph3:
				'Outlining the application process with resources on submitting a planning proposal.',
			linkParagraph4: 'View the 2008 Planning Act to understand our legal duties.',
			linkParagraph5:
				'View documents around submitting applications for a Nationally Significant Infrastructure project.',
			linkParagraph6:
				'The Planning Inspectorate has a series of advice notes covering a range of process details.',
			linkParagraph7:
				'Find out what National Policy Statements (NPSs) are, what they include and how they fit into the Planning Act 2008 process.',
			linkParagraph8:
				'Here you can view all advice provided by the Planning Inspectorate since 2008.',
			linkTitle1: 'See the process',
			linkTitle2: 'How to have your say on a project',
			linkTitle3: 'Guide for applicants',
			linkTitle4: 'Legislation information',
			linkTitle5: 'View guidance',
			linkTitle6: 'See advice notes',
			linkTitle7: 'National Policy Statements',
			linkTitle8: 'Register of advice',
			paragraph1:
				'Find further legislation and guidance resources. Information on this page may be useful for those applying to use the service and the general public.'
		});
	});
});
