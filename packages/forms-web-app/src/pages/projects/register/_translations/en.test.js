const enRegisterTranslations = require('./en.json');

describe('pages/projects/register/_translations/en', () => {
	it('should return the english register translations', () => {
		expect(enRegisterTranslations).toEqual({
			index: {
				pageTitle:
					'Register to have your say about a national infrastructure project - National Infrastructure Planning',
				pageHeading: 'Register to have your say about a national infrastructure project',
				open: {
					heading1: 'You are registering to have your say about the {{-project}}',
					paragraph1:
						'Use this service to have your say about a national infrastructure project. We need your personal details and your comments about the {{-project}}.',
					heading2: 'Writing your comments',
					paragraph2:
						'You must include comments with your registration. Your comments must be about what you consider to be the main issues and impacts. You should include as much detail as possible and cover anything that may affect your day-to-day life.',
					paragraph3: 'This information will be:',
					listItem1: 'seen by the examining authority',
					listItem2: 'published on our website',
					paragraph4:
						'You will be able to submit further comments during the examination of the application once you have registered.',
					paragraph5: 'You must submit your registration before 23:59 on {{-date}}.',
					buttonText: 'Start now',
					heading3: 'Before you start',
					heading4: 'If you are registering yourself as an individual',
					paragraph6: 'You will need your:',
					listItem3: 'full name',
					listItem4: 'address',
					listItem5: 'email address and telephone number',
					listItem6: 'registration comments about the project',
					heading5: 'If you are registering for an organisation you work or volunteer for',
					paragraph7: 'You will need:',
					listItem7: 'your full name',
					listItem8: 'the name of the charity or organisation you work for',
					listItem9: 'your work address',
					listItem10: 'email address and telephone number',
					listItem11: 'registration comments about the project',
					heading6: 'If you are registering on behalf of another person or organisation',
					paragraph8: 'You will need:',
					listItem12: 'your full name',
					listItem13: 'your address',
					listItem14: 'your email address and telephone number',
					listItem15: 'the details of the person, household or organisation you are representing',
					listItem16: 'their registration comments about the project'
				},
				closed: {
					paragraph1: 'The time period to register to have your say has closed.'
				}
			},
			registerFor: {
				validationErrorMessage: 'Select who you are registering for',
				pageTitle:
					'Who are you registering for - Register to have your say about a national infrastructure project -  National Infrastructure Planning',
				pageHeading: 'Who are you registering for?',
				option1: 'Myself',
				option2: 'An organisation I work or volunteer for',
				option3: 'On behalf of another person, a household or an organisation I do not work for'
			},
			myself: {
				pageTitleSuffix: 'Registering for myself'
			},
			organisation: {
				pageTitleSuffix: 'Registering for an organisation'
			},
			agent: {
				pageTitleSuffix: 'Registering on behalf of someone else'
			},
			name: {
				pageHeading: 'What is your full name?',
				hint: '<p>We will publish this on the website along with your comments about the project.</p><p>You must register as an individual. If your partner wants to register, they will have to fill in a separate form with their details.</p>'
			},
			areYou18: {
				pageHeading: 'Are you 18 or over?',
				hint: 'You can still register to have your say if you are under 18, but we will process your personal details in a different way.',
				yesHiddenText: "I'm 18 or older",
				noHiddenText: "I'm under 18"
			}
		});
	});
});
