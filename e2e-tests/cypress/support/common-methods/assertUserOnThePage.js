module.exports = (pageName) => {
	switch (pageName.toLowerCase()) {
		case 'who are you registering for?':
			cy.title().should(
				'eq',
				'Who are you registering for - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Who are you registering for?');
				});
			cy.url().should('include', 'who-registering-for');
			break;
		case 'what is your full name? organisation':
			cy.title().should(
				'eq',
				'What is your full name? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your full name?');
				});
			cy.url().should('include', '/full-name');
			break;
		case 'what is your full name? agent':
			cy.title().should(
				'eq',
				'What is your full name? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your full name?');
				});
			cy.url().should('include', '/full-name');
			break;
		case 'what is your full name?':
			cy.title().should(
				'eq',
				'What is your full name? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your full name?');
				});
			cy.url().should('include', '/full-name');
			break;
		case 'register to have your say':
			cy.title().should(
				'eq',
				'Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain(
						'Register to have your say about a national infrastructure project'
					);
				});
			cy.url().should('include', '/register-have-your-say');
			break;
		case 'north lincolnshire green energy park project information':
			cy.title().should(
				'eq',
				'North Lincolnshire Green Energy Park [e2e test case] - Project information'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Project information');
				});
			cy.url().should('include', '/projects/EN010116');
			break;
		case 'north lincolnshire green energy park':
			cy.title().should(
				'eq',
				'North Lincolnshire Green Energy Park | National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('National Infrastructure Planning');
				});
			break;
		case 'having your say about a national infrastructure project':
			cy.title().should(
				'eq',
				'Have your say guide - Have your say about a national infrastructure project'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Have your say about a national infrastructure project');
				});
			cy.url().should('include', '/having-your-say-guide');
			break;
		case 'the planning inspectorate':
			cy.url().should('include', '/planning-inspectorate');
			cy.title().should('eq', 'Planning Inspectorate - GOV.UK');
			break;
		case 'crown copyright':
			cy.url().should(
				'include',
				'information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
			);
			cy.title().should('eq', 'Crown copyright - Re-using PSI');
			break;
		case 'feedback':
			cy.url().should(
				'include',
				'/Pages/ResponsePage.aspx?id=mN94WIhvq0iTIpmM5VcIjVqzqAxXAi1LghAWTH6Y3OJUMTNIVDdHTTdWRFU5MlRQRFczNzdPNDRHQS4u'
			);
			cy.title().should('eq', 'Applications | Help us to improve our service');
			break;
		case 'having your say at the pre-application stage':
			cy.title().should('eq', 'Having your say at the pre-application stage');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Having your say at the pre-application stage');
				});
			cy.url().should('include', '/interested-party-guide/have-say-pre-application');
			break;
		case 'taking part at the pre-application stage':
			cy.title().should('eq', 'Have your say guide - Taking part at the pre-application stage');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Taking part at the pre-application stage');
				});
			cy.url().should('include', '/having-your-say-guide/taking-part-pre-application');
			break;
		case 'registering to have your say about a national infrastructure project':
			cy.title().should(
				'eq',
				'Have your say guide - Registering to have your say about a national infrastructure project'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain(
						'Registering to have your say about a national infrastructure project'
					);
				});
			cy.url().should('include', '/having-your-say-guide/registering-have-your-say');
			break;
		case 'get involved in the preliminary meeting':
			cy.title().should('eq', 'Have your say guide - Get involved in the preliminary meeting');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Get involved in the preliminary meeting');
				});
			cy.url().should('include', '/having-your-say-guide/get-involved-preliminary-meeting');
			break;
		case 'have your say during the examination of the project':
			cy.title().should(
				'eq',
				'Have your say guide - Have your say during the examination of the application'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Have your say during the examination of the application');
				});
			cy.url().should('include', '/having-your-say-guide/have-your-say-examination');
			break;
		case 'what you can do after the decision has been made':
			cy.title().should(
				'eq',
				'Have your say guide - What you can do after the decision has been made'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What you can do after the decision has been made');
				});
			cy.url().should('include', '/having-your-say-guide/what-happens-after-decision');
			break;
		case 'a404 dewsbury':
			cy.title().should('eq', 'A303 Dewsbury project overview');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('A404 Dewsbury');
				});
			cy.url().should('include', '/document-library/EN010116/1');
			break;
		case 'are you 18 or over?':
			cy.title().should(
				'eq',
				'Are you 18 or over? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Are you 18 or over?');
				});
			cy.url().should('include', '/are-you-18-over');
			break;
		case 'are you 18 or over? organisation':
			cy.title().should(
				'eq',
				'Are you 18 or over? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Are you 18 or over?');
				});
			cy.url().should('include', '/are-you-18-over');
			break;
		case 'uk address details':
			cy.title().should('eq', 'UK address details - Register to have your say');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('UK address details');
				});
			cy.url().should('include', '/address');
			break;
		case 'what is your address? organisation':
			cy.title().should(
				'eq',
				'What is your address? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your address?');
				});
			cy.url().should('include', '/address');
			break;
		case 'what is your address? agent':
			cy.title().should(
				'eq',
				'What is your address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your address');
				});
			cy.url().should('include', '/address');
			break;
		case 'what is your address?':
			cy.title().should(
				'eq',
				'What is your address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your address?');
				});
			cy.url().should('include', '/address');
			break;
		case 'what is your email address?':
			cy.title().should(
				'eq',
				'What is your email address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your email address?');
				});
			cy.url().should('include', '/email-address');
			break;
		case 'what is your email address? organisation':
			cy.title().should(
				'eq',
				'What is your email address? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your email address?');
				});
			cy.url().should('include', '/email');
			break;
		case 'what is your email address? agent':
			cy.title().should(
				'eq',
				'What is your email address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your email address?');
				});
			cy.url().should('include', '/email');
			break;
		case 'what is your telephone number? organisation':
			cy.title().should(
				'eq',
				'What is your telephone number? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your telephone number?');
				});
			cy.url().should('include', '/telephone');
			break;
		case 'what is your telephone number? agent':
			cy.title().should(
				'eq',
				'What is your telephone number? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your telephone number?');
				});
			cy.url().should('include', '/telephone');
			break;
		case 'what is your telephone number?':
			cy.title().should(
				'eq',
				'What is your telephone number? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your telephone number?');
				});
			cy.url().should('include', '/telephone');
			break;
		case 'what do you want to tell us about this proposed project? organisation':
			cy.title().should(
				'eq',
				'What do you want to tell us about this proposed project? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What do you want to tell us about this proposed project?');
				});
			cy.url().should('include', '/tell-us-about-project');
			break;
		case 'what do you want to tell us about this proposed project? agent':
			cy.title().should(
				'eq',
				'What do you want to tell us about this proposed project? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What do you want to tell us about this proposed project?');
				});
			cy.url().should('include', '/tell-us-about-project');
			break;
		case 'what do you want to tell us about this proposed project?':
			cy.title().should(
				'include',
				'What do you want to tell us about this proposed project? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What do you want to tell us about this proposed project?');
				});
			cy.url().should('include', '/tell-us-about-project');
			break;
		case 'check your answers before registering organisation':
			cy.title().should(
				'include',
				'Check your answers before registering - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Check your answers before registering');
				});
			cy.url().should('include', '/check-answers');
			break;
		case 'check your answers before registering on behalf of someone else':
			cy.title().should(
				'eq',
				'Check your answers before registering - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Check your answers before registering');
				});
			cy.url().should('include', '/check-answers');
			break;
		case 'check your answers before registering':
			cy.title().should(
				'eq',
				'Check your answers before registering - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Check your answers before registering');
				});
			cy.url().should('include', '/check-answers');
			break;
		case 'declaration organisation':
			cy.title().should(
				'eq',
				'Declaration - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Declaration');
				});
			cy.url().should('include', '/declaration');
			break;
		case 'declaration registering on behalf of someone else':
			cy.title().should(
				'eq',
				'Declaration - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Declaration');
				});
			cy.url().should('include', '/declaration');
			break;
		case 'declaration':
			cy.title().should(
				'eq',
				'Declaration - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Declaration');
				});
			cy.url().should('include', '/declaration');
			break;
		case 'registration complete organisation':
			cy.title().should(
				'eq',
				'Registration complete - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Registration complete');
				});
			cy.url().should('include', '/organisation/registration-complete');
			break;
		case 'registration complete registering on behalf of someone else':
			cy.title().should(
				'eq',
				'Registration complete - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Registration complete');
				});
			cy.url().should('include', '/registration-complete');
			break;
		case 'registration complete':
			cy.title().should(
				'eq',
				'Registration complete - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Registration complete');
				});
			cy.url().should('include', '/registration-complete');
			break;
		case 'what is the name of your organisation or charity?':
			cy.title().should(
				'eq',
				'What is the name of your organisation or charity? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is the name of your organisation or charity?');
				});
			cy.url().should('include', '/register/organisation/name-of-organisation-or-charity');
			break;
		case 'what is your job title or volunteer role?':
			cy.title().should(
				'eq',
				'What is your job title or volunteer role? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is your job title or volunteer role?');
				});
			cy.url().should('include', '/register/organisation/what-job-title-or-role');
			break;
		case 'are you sure you want to remove this comment?':
			cy.title().should('eq', 'Remove comment - Register to have your say');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Are you sure you want to remove this comment?');
				});
			cy.url().should('include', '/register/organisation/remove-comment');
			break;
		case 'do you want to add another comment?':
			cy.title().should('eq', 'Add another comment - Register to have your say');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Do you want to add another comment?');
				});
			cy.url().should('include', '/add-another-comment');
			break;
		case 'do you want to add another registration comment?':
			cy.title().should('eq', 'Add another comment - Register to have your say');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Do you want to add another registration comment?');
				});
			cy.url().should('include', '/add-another-comment');
			break;
		case 'who are you representing?':
			cy.title().should(
				'eq',
				'Who are you representing? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Who are you representing?');
				});
			cy.url().should('include', '/agent/who-representing');
			break;
		case 'what is the full name of the person you are representing?':
			cy.title().should(
				'eq',
				'What is the full name of the person you are representing? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is the full name of the person you are representing?');
				});
			cy.url().should('include', '/name-person-representing');
			break;
		case 'what is the full name of the organisation or charity that you are representing?':
			cy.title().should(
				'eq',
				'What is the full name of the organisation or charity that you are representing? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain(
						'What is the full name of the organisation or charity that you are representing?'
					);
				});
			cy.url().should('include', '/name-organisation-representing');
			break;
		case 'what is the name of the household you are representing?':
			cy.title().should(
				'eq',
				'What is the name of the household you are representing? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is the name of the household you are representing?');
				});
			cy.url().should('include', '/name-household-representing');
			break;
		case 'your comments are saved':
			cy.title().should(
				'eq',
				'Your registration has been saved - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Your registration has been saved');
				});
			cy.url().should('include', '/registration-saved');
			break;
		case 'your comments are saved organisation':
			cy.title().should(
				'eq',
				'Your registration has been saved - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Your registration has been saved');
				});
			cy.url().should('include', '/registration-saved');
			break;
		case 'your comments are saved agent':
			cy.title().should(
				'eq',
				'Your registration has been saved - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Your registration has been saved');
				});
			cy.url().should('include', '/registration-saved');
			break;
		case 'sitemap':
			cy.title().should(
				'eq',
				'GOV.UK - The best place to find government services and information'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Sitemap');
				});
			cy.url().should('include', '/sitemap');
			break;
		case 'terms and conditions':
			cy.title().should('eq', 'Terms and conditions');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Terms and conditions');
				});
			cy.url().should('include', '/terms-and-conditions');
			break;
		case 'accessibility':
			cy.title().should('eq', 'Accessibility statement for national infrastructure projects');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Accessibility statement for national infrastructure projects');
				});
			cy.url().should('include', '/accessibility-statement');
			break;
		case 'privacy notice':
			cy.title().should('eq', 'Customer Privacy Notice - GOV.UK');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Customer Privacy Notice');
				});
			cy.url().should('include', '/customer-privacy-notice');
			break;
		case 'what is the name of the organisation you work for?':
			cy.title().should(
				'eq',
				'What is the name of the organisation you work for? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is the name of the organisation you work for?');
				});
			cy.url().should('include', '/name-of-organisation');
			break;
		case 'the decision-making process for national infrastructure projects':
			cy.title().should(
				'eq',
				'Process guide - The process for Nationally Significant Infrastructure Projects (NSIPs)'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain(
						'The process for Nationally Significant Infrastructure Projects (NSIPs)'
					);
				});
			cy.url().should('include', '/decision-making-process-guide');
			break;
		case 'pre-application':
			cy.title().should('eq', 'Process guide - Pre-application');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Pre-application');
				});
			cy.url().should('include', '/pre-application');
			break;
		case 'acceptance':
			cy.title().should('eq', 'Process guide - Acceptance');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Acceptance');
				});
			cy.url().should('include', '/review-of-the-application');
			break;
		case 'pre-examination':
			cy.title().should('eq', 'Process guide - Pre-examination');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Pre-examination');
				});
			cy.url().should('include', '/pre-examination');
			break;
		case 'examination':
			cy.title().should('eq', 'Process guide - Examination');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Examination');
				});
			cy.url().should('include', '/examination-of-the-application');
			break;
		case 'recommendation':
			cy.title().should('eq', 'Process guide - Recommendation');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Recommendation');
				});
			cy.url().should('include', '/recommendation');
			break;
		case 'decision':
			cy.title().should('eq', 'Process guide - Decision');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Decision');
				});
			cy.url().should('include', '/decision');
			break;
		case 'what happens after the decision is made':
			cy.title().should('eq', 'Process guide - What happens after the decision is made');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What happens after the decision is made');
				});
			cy.url().should('include', '/what-happens-after-the-decision-is-made');
			break;
		case 'cookies settings':
			cy.title().should('eq', 'Cookies on the Find a National Infrastructure Project service');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Cookies');
				});
			cy.url().should('include', '/cookies');
			break;
		case 'are they 18 or over?':
			cy.title().should(
				'eq',
				'Are they 18 or over? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('Are they 18 or over?');
				});
			cy.url().should('include', '/are-they-18-over');
			break;
		case 'what is their address?':
			cy.title().should(
				'eq',
				'What is their address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is their address?');
				});
			cy.url().should('include', '/their-postal-address');
			break;
		case 'what is their email address?':
			cy.title().should(
				'eq',
				'What is their email address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is their email address?');
				});
			cy.url().should('include', '/their-email-address');
			break;
		case 'what is their telephone number?':
			cy.title().should(
				'eq',
				'What is their telephone number? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
			);
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('What is their telephone number?');
				});
			cy.url().should('include', '/their-telephone-number');
			break;
		case 'project search':
			cy.title().should('eq', 'Project search');
			cy.get('h1')
				.invoke('text')
				.then((text) => {
					expect(text).to.contain('All Projects');
				});
			cy.url().should('include', '/project-search');
			break;
		default:
			throw new Error('uanble to find specified page name: ' + pageName);
	}
	cy.wait(Cypress.env('demoDelay'));

	// cy.checkPageA11y({
	// });
};
