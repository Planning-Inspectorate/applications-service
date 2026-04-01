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
			heading4: 'Registering to have your say',
			paragraph4: 'To register, you will need to give us your:',
			listItem5: 'full name',
			listItem6: 'address, email address and phone number',
			listItem7: 'comments about the project',
			paragraph5:
				"We'll publish your name and comments on our website. We'll keep your address, email address and phone number private. {{-link}} for more information.",
			paragraph5LinkText: 'View our privacy notice',
			paragraph6:
				'Your comments must be about what you consider to be the main issues and impacts. You should include as much detail as possible and cover anything that may affect your day-to-day life.',
			heading5: 'After you have registered',
			paragraph7:
				"After the registration period closes and we've reviewed everyone's comments, we'll publish these in the registration comments (also known as relevant representations) section of the project page. This may take some time. If you've signed up for project updates, we'll notify you once all the comments are available.",
			paragraph8:
				"When you complete your registration to have your say, you'll receive a registration reference number. This will become your interested party reference number once we've reviewed your comments. As an interested party you can make further comments, attend certain meetings and receive notifications.",
			paragraph9:
				'When the examination of the application starts, you can submit more information at the deadlines in the timetable.',
			heading7: 'More detailed advice',
			paragraph10:
				'If you need more detailed advice, you can check our advice pages for more information.',
			linkText1: 'Read the full set of advice pages (opens in a new tab)'
		});
	});
});
