const enIndexTranslations = require('./en.json');

describe('pages/process-guide/index/_translations/en', () => {
	it('should return the English process guide index translations', () => {
		expect(enIndexTranslations).toEqual({
			index: {
				heading1: 'The process for Nationally Significant Infrastructure Projects (NSIPs)',
				paragraph1:
					'Nationally Significant Infrastructure Projects are submitted to the Planning Inspectorate. We are the government agency who examine the proposal.',
				paragraph2: 'Anyone can get involved including:',
				listItem1: 'applicants',
				listItem2: 'members of the public',
				listItem3: 'statutory bodies',
				listItem4: 'charities',
				listItem5: 'local authorities',
				paragraph3:
					'An applicant submits an application for a development consent order to the Planning Inspectorate. These can be developments like:',
				listItem6: 'offshore wind farms',
				listItem7: 'power stations and electric lines',
				listItem8: 'motorways and other major roads',
				listItem9: 'railways',
				listItem10: 'gas pipelines',
				paragraph4:
					'We appoint independent inspectors to examine application and make recommendations to the relevant Secretary of State about whether permission for development should be given.',
				paragraph5: 'The relevant Secretary of State makes the final decision.',
				paragraph6:
					'There are several stages in the process for considering whether a national infrastructure project should be given consent. The whole process can take around 18 months.',
				heading2: 'Guide for people or organisations who want to have their say',
				paragraph7:
					'Members of the public can get involved in early consultations before an application has been submitted by contacting the applicant directly.',
				paragraph8:
					'Alternatively you can register to have your say on this website during the pre-examination stage.',
				paragraph9:
					'There is a {{-link}} with information for people or organisations who want to have their say about a national infrastructure project.',
				paragraph9LinkText: 'guide'
			}
		});
	});
});
