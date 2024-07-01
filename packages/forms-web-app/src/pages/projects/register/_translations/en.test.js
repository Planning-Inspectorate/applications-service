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
				pageTitle:
					'Who are you registering for - Register to have your say about a national infrastructure project -  National Infrastructure Planning',
				pageHeading: 'Who are you registering for?',
				option1: 'Myself',
				option2: 'An organisation I work or volunteer for',
				option3: 'On behalf of another person, a household or an organisation I do not work for'
			},
			whoRegisteringFor: {
				myself: 'Registering for myself',
				organisation: 'Registering for an organisation',
				agent: 'Registering on behalf of someone else'
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
			},
			email: {
				pageHeading: 'What is your email address?',
				hint: 'We will use your email address to send you information about this project. We will not publish your email address.'
			},
			address: {
				pageHeading: 'What is your address?',
				line1: "Address line 1 <span class='govuk-visually-hidden'>of 3</span>",
				line2: "Address line 2 <span class='govuk-visually-hidden'>of 3</span> (Optional)",
				line3: "Town or city <span class='govuk-visually-hidden'>of 3</span> (Optional)",
				postcode: 'Postcode',
				country: 'Country'
			},
			number: {
				pageHeading: 'What is your telephone number?',
				hint: 'We will use your phone number to contact you about the project if we cannot reach you by email. We will not publish your telephone number.'
			},
			aboutProject: {
				pageHeading: 'What do you want to tell us about this proposed project?',
				paragraph1:
					'You must include comments with your registration. Your comments must be about what you consider to be the main issues and impacts. You should include as much detail as possible and cover anything that may affect your day-to-day life.',
				paragraph2: 'This information will be:',
				listItem1: 'seen by the examining authority',
				listItem2: 'published on our website',
				paragraph3:
					'You will be able to submit further comments during the examination of the application once you have registered',
				textAreaLabel: 'Registration comments',
				details: {
					summaryText: 'Do not include these details.',
					heading1: 'Use of language, hyperlinks and sensitive information',
					paragraph1:
						'You should not use racist, inflammatory or abusive language, or include sensitive information (also called special category information) about yourself or others in your comments.',
					paragraph2:
						'Do not include links to third party websites. You can include links to either GOV.UK or websites for chartered professional institutes like IEMA.',
					heading2: 'Examples of sensitive information',
					paragraph3: 'Sensitive information refers to:',
					listItem1: 'comments from children',
					listItem2: 'information relating to children',
					listItem3: 'information relating to health',
					listItem4: 'information relating to crime',
					paragraph4: 'It also means any information relating to an individual&#39;s:',
					listItem5: 'race',
					listItem6: 'ethnic origin',
					listItem7: 'politics',
					listItem8: 'religion',
					listItem9: 'trade union membership',
					listItem10: 'genetics',
					listItem11: 'physical characteristics',
					listItem12: 'sex life',
					listItem13: 'sexual orientation'
				}
			},
			checkYourAnswers: {
				pageHeading: 'Check your answers before registering',
				heading1: 'Personal details',
				registeringFor: 'Who are you registering for?',
				changeRegisteringForHiddenText: 'who are you registering for',
				myself: 'Myself',
				name: 'Full name',
				changeNameHiddenText: 'your full name',
				areYou18: 'Are you 18 or over?',
				changeAreYou18HiddenText: 'if you are over 18',
				email: 'Email address',
				changeEmailHiddenText: 'your email address',
				address: 'Address',
				changeAddressHiddenText: 'your address',
				number: 'Telephone number',
				changeNumberHiddenText: 'your telephone number',
				comments: 'Registration comments',
				changeCommentsHiddenText: 'registration comments'
			},
			declaration: {
				pageHeading: 'Declaration',
				paragraph1:
					'By submitting this form, you are registering to have your say and telling us your registration comments.',
				paragraph2:
					'The Examining Authority must consider your views when they recommend if the project should go ahead. We will contact you if we need more information about the comments you provided in the registration form.',
				paragraph3: 'You are agreeing that we will use your details to:',
				listItem1: 'contact you about the project or if we need more information',
				listItem2: 'let you know when you can submit more information',
				paragraph4:
					'You are also agreeing that all comments you submit, along with your name, will be published on this website. No contact details will be made public.',
				paragraph5:
					'Once we publish your comments, they cannot be removed from the website. You can withdraw your registration comments from the examination of the project and they will no longer be taken into account.'
			},
			complete: {
				pageHeading: 'Registration complete',
				panel1: 'Your reference number',
				paragraph1: 'We have sent a confirmation to: {{-email}}',
				paragraph2:
					'We will contact you if we need more information about the comments you provided in the registration form.',
				heading1: 'Getting involved in the preliminary meeting',
				paragraph3:
					'After the registration period has closed, you will be sent a letter called the rule 6 letter, telling you when and where the preliminary meeting will be held. This is to talk about how the application will be examined. It will also include a draft timetable for the examination of the application.',
				heading2: 'How and when to submit more information',
				paragraph4: 'We will let you know when the examination of this application starts.',
				paragraph5:
					'You can submit more information by completing the form on the project page. You will need your interested party reference number to make sure your comments are included in the examination of the application.',
				paragraph6: 'You can check our guide to {{-link}}',
				paragraph6LinkText:
					'find out more about having your say during the examination of the application (opens in new tab)',
				paragraph7LinkText: 'Go back to the project page',
				paragraph8: '{{-link}} by completing a short survey.',
				paragraph8LinkText: 'Tell us what you thought about this service'
			}
		});
	});
});
