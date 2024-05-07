const enProcessGuideTranslations = require('./en.json');

describe('pages/process-guide/_translations/en', () => {
	it('should return the English process guide page translations', () => {
		expect(enProcessGuideTranslations).toEqual({
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
			},
			preApplication: {
				subHeading: 'Pre-application',
				paragraph1:
					'This is where the applicant starts to create their application. The applicant is required to consult with people and organisations in the area. They must also create detailed documents about the impact the project could have on the environment.',
				paragraph2:
					'It is important to get involved at this stage to influence the application before the applicant sends it to the Planning Inspectorate.',
				linkText: 'Find out what you can do at this stage and check our detailed guides.'
			},
			acceptance: {
				subHeading: 'Acceptance',
				paragraph:
					'This is when the applicant sends us their application documents. We check if we can accept the application for examination. We have 28 days to make this decision.',
				linkText: 'How the acceptance stage works and what happens next.'
			},
			preExamination: {
				subHeading: 'Pre-examination',
				paragraph1:
					'The Examining Authority is appointed and is made up of one or more inspectors. Anyone who wants to have their say must be able to register at this stage.',
				paragraph2:
					'The applicant must publish that the application has been accepted by us. They include when and how parties can register to get involved. The time period for registering is set by the applicant but must be no less than 28 days.',
				paragraph3: 'The pre-examination stage usually takes about 3 months.',
				linkText: 'What happens during the pre-examination stage.'
			},
			examination: {
				subHeading: 'Examination',
				paragraph:
					'The Examining Authority will ask questions about the proposed development. The applicant and anyone who has registered to have their say can get involved and submit comments at each deadline in the timetable. You can also attend hearings that may take place. This stage takes up to 6 months.',
				linkText: 'What happens at the examination stage?'
			},
			recommendation: {
				subHeading: 'Recommendation',
				paragraph:
					'The Examining Authority writes its recommendation report. This must be completed and sent to the relevant Secretary of State within 3 months of the end of examination stage.',
				linkText: 'Making a recommendation.'
			},
			decision: {
				subHeading: 'Decision',
				paragraph:
					'The decision stage is when the relevant Secretary of State then reviews the report and makes the final decision. They have 3 months to make a decision.',
				linkText: 'Who makes the final decision.'
			},
			postDecision: {
				subHeading: 'What happens after the decision is made',
				paragraph:
					'Once the Secretary of State has made a decision, there is a 6 week period where people can challenge the decision in the high court. This is called a judicial review.',
				linkText: 'What you can do after the decision has been made.'
			}
		});
	});
});
