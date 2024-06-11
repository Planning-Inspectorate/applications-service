const enProjectsIndexTranslations = require('./en.json');

describe('pages/projects/index/_translations/en', () => {
	it('should return the english projects index translations', () => {
		expect(enProjectsIndexTranslations).toEqual({
			heading1: 'Project information',
			latestUpdateBanner: {
				latestUpdate: 'Latest update',
				viewAllUpdates: 'View all updates'
			},
			aboutProject: {
				heading1: 'About the project',
				paragraph1: 'Type of application:',
				paragraph2: 'Name of applicant:',
				linkText1: "View the developer's website"
			},
			projectStage: {
				heading1: 'Project stage',
				paragraph1: 'This project is at the {{-stage}} stage.'
			},
			projectLocation: {
				heading1: 'Project location'
			},
			getUpdates: {
				heading1: 'Get updates',
				paragraph1: 'Enter your email address to receive:',
				listItem1: 'updates on project progress',
				listItem2: 'information on how to have your say',
				listItem3: 'notifications when key documents are published',
				paragraph2: 'Read the {{-link}} to see how we handle your information.',
				paragraph2LinkText: 'privacy notice'
			},
			contact: {
				heading1: 'Contact us',
				heading2: 'Telephone',
				paragraph1: 'If you have an interested party number, have it with you when you call.',
				paragraph2: 'Telephone:',
				heading3: 'Email',
				paragraph3: 'When writing an email, quote the name of the project in the subject line.',
				paragraph4: 'We aim to respond within 10 working days.',
				heading4: 'Alternative formats',
				paragraph5:
					'Call or email to ask for project documents in alternative formats such as PDF, large print, easy read, audio recording or braille.'
			},
			getUpdates: {
				heading1: 'Get updates',
				listItem1: 'updates on project progress',
				listItem2: 'information on how to have your say',
				listItem3: 'notifications when key documents are published',
				paragraph1: 'Enter your email address to receive:',
				paragraph2: 'Read the {{-link}} to see how we handle your information.',
				paragraph2LinkText: 'privacy notice'
			},
			heading1: 'Project information',
			projectLocation: { heading1: 'Project location' },
			projectStage: {
				stage1name: 'Pre-application',
				stage2name: 'Acceptance',
				stage3name: 'Pre-examination',
				stage4name: 'Examination',
				stage5name: 'Recommendation',
				stage6name: 'Decision',
				stage7name: 'Post-decision',
				heading1: 'Project stage',
				paragraph1: 'This project is at the {{-stage}} stage.',
				preapplication: {
					paragraph1: 'The application is expected to be submitted {{-date}}.',
					paragraph2:
						'When we receive the application, we have 28 days to decide whether to accept it for examination.',
					paragraph3:
						'If we accept the application, you will then be able to register to have your say and view all the application documents.'
				},
				acceptance: {
					paragraph1:
						'The decision whether to accept the application for examination will be made by {{-date}}.',
					paragraph2: 'If the application is accepted, we will publish:',
					listItem1: 'the acceptance decision',
					listItem2: 'the consultation representations received from the local councils',
					paragraph3: 'If the application is not accepted, we will:',
					listItem3: 'publish the reasons why it was not accepted',
					listItem4: 'remove any documentation that has been published from this project page',
					paragraph4: 'There is no opportunity to make comments on the application at this stage.'
				},
				preexamination: {
					preReps: {
						paragraph1:
							'At this stage you can {{-link}} about the proposed project. This page will be updated when the registration period opens. You can view the project application documents to find out more about the application.',
						linkText1: 'register to have your say',
						linkText2: 'Find out more about registering to have your say.'
					},
					repsOpen: {
						paragraph1: 'If you want to comment on this proposed project, you can now {{-link}}',
						linkText1: 'register to have your say',
						paragraph2: ' Registration closes on {{-date}} at 23:59.',
						buttonText1: 'Register to have your say'
					},
					repsClosed: {
						paragraph1:
							'The registration period to have your say about this project has closed. If you are not registered and you submit information during the examination stage, this may not be included.',
						paragraph2:
							'Contact the project case team to find out more about how to get involved if you are not registered.'
					},
					repsPublished: {
						paragraph1: 'We have now published all registration comments.',
						paragraph2: 'You can {{-link}}.',
						linkText1: 'view comments from other people who registered'
					},
					prelim: {
						paragraph1: 'The preliminary meeting for this project is on: {{-date}}',
						paragraph2: 'You can check the {{-link}} to find out how to get involved.',
						linkText1: 'rule 6 letter',
						paragraph3:
							'In this meeting, the Examining Authority sets out how they examine the application. This includes the examination timetable and the issues they will focus on during examination.',
						linkText2: 'Find out more about getting involved in the preliminary meeting'
					}
				},
				examination: {
					paragraph1:
						'During the examination stage, anyone who has registered to have their say can submit comments at the {{-link}}. You may also attend hearings, if hearings are held.',
					linkText1: 'deadlines set out in the examination timetable',
					paragraph2:
						'You can also {{-link}} to find out more about what you can do during the examination stage.',
					linkText2: 'view the rule 8 letter',
					linkText3: 'Find out more about the examination of the application',
					paragraph3: '{{-link}} stage.'
				},
				recommendation: {
					paragraph1: 'The date set for this to be completed is {{-date}}'
				},
				decision: {
					paragraph1: 'The date set for this to be completed is {{-date}}'
				},
				postDecision: {
					paragraph1: 'This application was {{-decision}} on {{-date}}.',
					granted: 'granted',
					refused: 'refused'
				}
			},
			emailRequest: {
				paragraph1:
					'You may have recently gained an interest in land affected by a development. If the developer did not tell you the application was accepted or you did not register to have your say you can still request to be an interested party.',
				paragraph2:
					'You need to contact the project team, they will ask the Examining Authority if you can be an interested party and have your say.',
				paragraph3: 'Email {{-link}} with your request to become an interested party.'
			},
			subsectors: {
				BC01: 'Office use',
				BC02: 'Research and Development of Products or Processes',
				BC03: 'An Industrial Process or Processes',
				BC04: 'Storage or Distribution of Goods',
				BC05: 'Conferences',
				BC06: 'Exhibitions',
				BC07: 'Sport',
				BC08: 'Leisure',
				BC09: 'Tourism',
				EN01: 'Generating Stations',
				EN02: 'Electric Lines',
				EN03: 'Underground Gas Storage Facilities',
				EN04: 'LNG Facilities',
				EN05: 'Gas Reception Facilities',
				EN06: 'Gas Transporter Pipe-lines',
				EN07: 'Other Pipe-lines',
				TR01: 'Highways',
				TR02: 'Airports',
				TR03: 'Harbour Facilities',
				TR04: 'Railways',
				TR05: 'Rail Freight Interchanges',
				WS01: 'Hazardous Waste Facilities',
				WW01: 'Waste Water treatment Plants',
				WA01: 'Dams and Reservoirs',
				WA02: 'Transfer of Water Resources'
			},
			stageProgress: {
				notStarted: 'not started',
				inProgress: 'in progress',
				completed: 'completed'
			}
		});
	});
});
