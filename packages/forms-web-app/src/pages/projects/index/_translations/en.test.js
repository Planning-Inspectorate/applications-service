const enProjectsIndexTranslations = require('./en.json');

describe('pages/projects/index/_translations/en', () => {
	it('should return the english projects index translations', () => {
		expect(enProjectsIndexTranslations).toEqual({
			latestUpdateBanner: {
				latestUpdate: 'Latest update',
				viewAllUpdates: 'View all updates'
			},
			aboutProject: {
				heading1: 'About the project',
				linkText1: "View the developer's website",
				paragraph1: 'Type of application:',
				paragraph2: 'Name of applicant:'
			},
			contact: {
				heading1: 'Contact us',
				heading2: 'Telephone',
				heading3: 'Email',
				heading4: 'Alternative formats',
				paragraph1: 'If you have an interested party number, have it with you when you call.',
				paragraph2: 'Telephone:',
				paragraph3: 'When writing an email, quote the name of the project in the subject line.',
				paragraph4: 'We aim to respond within 10 working days.',
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
				heading1: 'Project stage',
				paragraph1: 'This project is at the {{-stage}} stage.'
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
				WA01: 'Dams and Reservoirs',
				WA02: 'Transfer of Water Resources',
				WS01: 'Hazardous Waste Facilities',
				WW01: 'Waste Water treatment Plants'
			}
		});
	});
});
