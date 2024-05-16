const enRegisteringTranslations = require('./en.json');

describe('pages/have-your-say-guide/registering/_translations/en', () => {
	it('should return the english have your say guide registering translations', () => {
		expect(enRegisteringTranslations).toEqual({
			heading2: 'Who can register',
			paragraph1: 'Anyone can register to have their say, including:',
			listItem1: 'members of the public from the local area or anywhere in the UK',
			listItem2: 'members of the public from other countries',
			listItem3:
				'organisations such as local authorities, parish councils, local bodies and authorities such as Natural England and the Environment Agency',
			listItem4: 'charities, local action groups and businesses',
			heading3: 'When to register',
			paragraph2:
				'Registration will be open for at least 30 days for each project, during the pre-examination stage. This is the preparation stage for the examination of the application. You must register during this time to get your interested party reference number and make sure your comments are taken into account.',
			paragraph3:
				'The developer will advertise when the project has been accepted for examination. They must also give details about when registration opens and closes for the project and how you can register.',
			heading4: 'What you need to register',
			paragraph4: 'To register, you will need to give us your:',
			listItem5: 'full name',
			listItem6: 'address, email and telephone number',
			listItem7: 'your comments about the project',
			paragraph5:
				'After you register, you will be given a reference number. This reference number will become your interested party reference number. Your name and comments will be published on our website. Your address, email address and phone number will be kept private. {{-link}}.',
			paragraph5LinkText: 'You can view our privacy notice for more information (opens a new tab)',
			paragraph6:
				'You must include comments with your registration. Your comments must be about what you consider to be the main issues and impacts. You should include as much detail as possible and cover anything that may affect your day-to-day life.',
			heading5: 'After you have registered',
			paragraph7:
				'Once you have registered to have your say, your name and comments will be published on the project information page for each project. Once the registration period closes, you can see all of the other registration comments (also known as relevant representations) from other people.',
			paragraph8:
				'Once the examination of the application starts, you will be able to submit more information at the deadlines in the timetable. You can do this using the online submission form in the specific project section of this website.',
			heading6: 'Register to have your say',
			paragraph9:
				"The deadline for registering will be in the developer's advert, or you can check the project page.",
			heading7: 'More detailed advice',
			paragraph10:
				'If you need more detailed advice, you can check our advice notes for more information.',
			linkText1: 'Read the full set of advice notes (opens in a new tab)'
		});
	});
});
