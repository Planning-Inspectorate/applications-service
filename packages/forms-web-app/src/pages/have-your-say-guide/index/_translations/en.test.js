const enIndexTranslations = require('./en.json');

describe('pages/have-your-say-guide/index/_translations/en', () => {
	it('should return the english have your say guide index translations', () => {
		expect(enIndexTranslations).toEqual({
			linkText1: 'Find a project and have your say',
			listItem1: 'offshore wind farms',
			listItem2: 'power stations and electric lines',
			listItem3: 'motorways and other major roads',
			listItem4: 'railways',
			listItem5: 'gas pipelines',
			paragraph1:
				'This guide is for individuals and organisations who want to have their say about a project.',
			paragraph2:
				'National infrastructure projects are also called Nationally Significant Infrastructure Projects (NSIP). These are large scale developments like:',
			paragraph3:
				'The process for national infrastructure projects is to decide if a Development Consent Order (DCO) can be granted. A DCO is a legal document that allows an applicant to build their proposed project. The applicant submits an application for a proposed development to the Planning Inspectorate. A panel of independent inspectors called the Examining Authority look at the project and start the examination of the application. They make a recommendation to the relevant Secretary of State about whether the project should go ahead.',
			paragraph4:
				'As part of this process, anyone can have their say about the project and tell us why they think it should or should not go ahead.'
		});
	});
});
