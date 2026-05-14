const REGISTER_SERVICE =
	'Register to have your say about a national infrastructure project - National Infrastructure Planning';

const registrationJourneys = {
	myself: 'Registering for myself',
	organisation: 'Registering for an organisation',
	agent: 'Registering on behalf of someone else'
};

const staticPage = ({ title, heading, url, titleMatch = 'eq' }) => ({
	title: title ? { value: title, match: titleMatch } : undefined,
	heading: heading ? { value: heading } : undefined,
	url
});

const registrationPage = ({ pageTitle, heading = pageTitle, url, audience, titleMatch = 'eq' }) =>
	staticPage({
		title: `${pageTitle} - ${registrationJourneys[audience]} - ${REGISTER_SERVICE}`,
		heading,
		url,
		titleMatch
	});

const haveYourSayGuidePage = ({ pageTitle, heading = pageTitle, url, titleMatch = 'eq' }) =>
	staticPage({
		title: `Have your say guide - ${pageTitle}`,
		heading,
		url,
		titleMatch
	});

const processGuidePage = ({ pageTitle, heading = pageTitle, url, titleMatch = 'eq' }) =>
	staticPage({
		title: `Process guide - ${pageTitle}`,
		heading,
		url,
		titleMatch
	});

module.exports = {
	'who are you registering for?': staticPage({
		title:
			'Who are you registering for - Register to have your say about a national infrastructure project - National Infrastructure Planning',
		heading: 'Who are you registering for?',
		url: 'who-registering-for'
	}),
	'what is your full name? organisation': registrationPage({
		pageTitle: 'What is your full name?',
		url: '/full-name',
		audience: 'organisation'
	}),
	'what is your full name? agent': registrationPage({
		pageTitle: 'What is your full name?',
		url: '/full-name',
		audience: 'agent'
	}),
	'what is your full name?': registrationPage({
		pageTitle: 'What is your full name?',
		url: '/full-name',
		audience: 'myself'
	}),
	'register to have your say': staticPage({
		title: REGISTER_SERVICE,
		heading: 'Register to have your say about a national infrastructure project',
		url: '/register-have-your-say'
	}),
	'north lincolnshire green energy park project information': staticPage({
		title: 'North Lincolnshire Green Energy Park [e2e test case] - Project information',
		heading: 'Project information',
		url: '/projects/EN010116'
	}),
	'north lincolnshire green energy park': staticPage({
		title: 'North Lincolnshire Green Energy Park | National Infrastructure Planning',
		heading: 'National Infrastructure Planning'
	}),
	'having your say about a national infrastructure project': haveYourSayGuidePage({
		pageTitle: 'Have your say about a national infrastructure project',
		url: '/having-your-say-guide'
	}),
	'the planning inspectorate': staticPage({
		title: 'Planning Inspectorate - GOV.UK',
		url: '/planning-inspectorate'
	}),
	'crown copyright': staticPage({
		title: 'Crown copyright - Re-using PSI',
		url: 'information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
	}),
	feedback: staticPage({
		title: 'Applications | Help us to improve our service',
		url: '/Pages/ResponsePage.aspx?id=mN94WIhvq0iTIpmM5VcIjVqzqAxXAi1LghAWTH6Y3OJUMTNIVDdHTTdWRFU5MlRQRFczNzdPNDRHQS4u'
	}),
	'having your say at the pre-application stage': staticPage({
		title: 'Having your say at the pre-application stage',
		heading: 'Having your say at the pre-application stage',
		url: '/interested-party-guide/have-say-pre-application'
	}),
	'taking part at the pre-application stage': haveYourSayGuidePage({
		pageTitle: 'Taking part at the pre-application stage',
		url: '/having-your-say-guide/taking-part-pre-application'
	}),
	'registering to have your say about a national infrastructure project': haveYourSayGuidePage({
		pageTitle: 'Registering to have your say about a national infrastructure project',
		url: '/having-your-say-guide/registering-have-your-say'
	}),
	'get involved in the preliminary meeting': haveYourSayGuidePage({
		pageTitle: 'Get involved in the preliminary meeting',
		url: '/having-your-say-guide/get-involved-preliminary-meeting'
	}),
	'have your say during the examination of the project': haveYourSayGuidePage({
		pageTitle: 'Have your say during the examination of the application',
		heading: 'Have your say during the examination of the application',
		url: '/having-your-say-guide/have-your-say-examination'
	}),
	'what you can do after the decision has been made': haveYourSayGuidePage({
		pageTitle: 'What you can do after the decision has been made',
		url: '/having-your-say-guide/what-happens-after-decision'
	}),
	'a404 dewsbury': staticPage({
		title: 'A303 Dewsbury project overview',
		heading: 'A404 Dewsbury',
		url: '/document-library/EN010116/1'
	}),
	'are you 18 or over?': registrationPage({
		pageTitle: 'Are you 18 or over?',
		url: '/are-you-18-over',
		audience: 'myself'
	}),
	'are you 18 or over? organisation': registrationPage({
		pageTitle: 'Are you 18 or over?',
		url: '/are-you-18-over',
		audience: 'organisation'
	}),
	'uk address details': staticPage({
		title: 'UK address details - Register to have your say',
		heading: 'UK address details',
		url: '/address'
	}),
	'what is your address? organisation': registrationPage({
		pageTitle: 'What is your address?',
		url: '/address',
		audience: 'organisation'
	}),
	'what is your address? agent': registrationPage({
		pageTitle: 'What is your address?',
		heading: 'What is your address',
		url: '/address',
		audience: 'agent'
	}),
	'what is your address?': registrationPage({
		pageTitle: 'What is your address?',
		url: '/address',
		audience: 'myself'
	}),
	'what is your email address?': registrationPage({
		pageTitle: 'What is your email address?',
		url: '/email-address',
		audience: 'myself'
	}),
	'what is your email address? organisation': registrationPage({
		pageTitle: 'What is your email address?',
		url: '/email',
		audience: 'organisation'
	}),
	'what is your email address? agent': registrationPage({
		pageTitle: 'What is your email address?',
		url: '/email',
		audience: 'agent'
	}),
	'what is your telephone number? organisation': registrationPage({
		pageTitle: 'What is your telephone number?',
		url: '/telephone',
		audience: 'organisation'
	}),
	'what is your telephone number? agent': registrationPage({
		pageTitle: 'What is your telephone number?',
		url: '/telephone',
		audience: 'agent'
	}),
	'what is your telephone number?': registrationPage({
		pageTitle: 'What is your telephone number?',
		url: '/telephone',
		audience: 'myself'
	}),
	'what do you want to tell us about this proposed project? organisation': registrationPage({
		pageTitle: 'What do you want to tell us about this proposed project?',
		url: '/tell-us-about-project',
		audience: 'organisation'
	}),
	'what do you want to tell us about this proposed project? agent': registrationPage({
		pageTitle: 'What do you want to tell us about this proposed project?',
		url: '/tell-us-about-project',
		audience: 'agent'
	}),
	'what do you want to tell us about this proposed project?': registrationPage({
		pageTitle: 'What do you want to tell us about this proposed project?',
		url: '/tell-us-about-project',
		audience: 'myself',
		titleMatch: 'include'
	}),
	'check your answers before registering organisation': registrationPage({
		pageTitle: 'Check your answers before registering',
		url: '/check-answers',
		audience: 'organisation',
		titleMatch: 'include'
	}),
	'check your answers before registering on behalf of someone else': registrationPage({
		pageTitle: 'Check your answers before registering',
		url: '/check-answers',
		audience: 'agent'
	}),
	'check your answers before registering': registrationPage({
		pageTitle: 'Check your answers before registering',
		url: '/check-answers',
		audience: 'myself'
	}),
	'declaration organisation': registrationPage({
		pageTitle: 'Declaration',
		url: '/declaration',
		audience: 'organisation'
	}),
	'declaration registering on behalf of someone else': registrationPage({
		pageTitle: 'Declaration',
		url: '/declaration',
		audience: 'agent'
	}),
	declaration: registrationPage({
		pageTitle: 'Declaration',
		url: '/declaration',
		audience: 'myself'
	}),
	'registration complete organisation': registrationPage({
		pageTitle: 'Registration complete',
		url: '/organisation/registration-complete',
		audience: 'organisation'
	}),
	'registration complete registering on behalf of someone else': registrationPage({
		pageTitle: 'Registration complete',
		url: '/registration-complete',
		audience: 'agent'
	}),
	'registration complete': registrationPage({
		pageTitle: 'Registration complete',
		url: '/registration-complete',
		audience: 'myself'
	}),
	'what is the name of your organisation or charity?': registrationPage({
		pageTitle: 'What is the name of your organisation or charity?',
		url: '/register/organisation/name-of-organisation-or-charity',
		audience: 'organisation'
	}),
	'what is your job title or volunteer role?': registrationPage({
		pageTitle: 'What is your job title or volunteer role?',
		url: '/register/organisation/what-job-title-or-role',
		audience: 'organisation'
	}),
	'are you sure you want to remove this comment?': staticPage({
		title: 'Remove comment - Register to have your say',
		heading: 'Are you sure you want to remove this comment?',
		url: '/register/organisation/remove-comment'
	}),
	'do you want to add another comment?': staticPage({
		title: 'Add another comment - Register to have your say',
		heading: 'Do you want to add another comment?',
		url: '/add-another-comment'
	}),
	'do you want to add another registration comment?': staticPage({
		title: 'Add another comment - Register to have your say',
		heading: 'Do you want to add another registration comment?',
		url: '/add-another-comment'
	}),
	'who are you representing?': registrationPage({
		pageTitle: 'Who are you representing?',
		url: '/agent/who-representing',
		audience: 'agent'
	}),
	'what is the full name of the person you are representing?': registrationPage({
		pageTitle: 'What is the full name of the person you are representing?',
		url: '/name-person-representing',
		audience: 'agent'
	}),
	'what is the full name of the organisation or charity that you are representing?':
		registrationPage({
			pageTitle: 'What is the full name of the organisation or charity that you are representing?',
			url: '/name-organisation-representing',
			audience: 'agent'
		}),
	'what is the name of the household you are representing?': registrationPage({
		pageTitle: 'What is the name of the household you are representing?',
		url: '/name-household-representing',
		audience: 'agent'
	}),
	'your comments are saved': registrationPage({
		pageTitle: 'Your registration has been saved',
		heading: 'Your registration has been saved',
		url: '/registration-saved',
		audience: 'myself'
	}),
	'your comments are saved organisation': registrationPage({
		pageTitle: 'Your registration has been saved',
		heading: 'Your registration has been saved',
		url: '/registration-saved',
		audience: 'organisation'
	}),
	'your comments are saved agent': registrationPage({
		pageTitle: 'Your registration has been saved',
		heading: 'Your registration has been saved',
		url: '/registration-saved',
		audience: 'agent'
	}),
	sitemap: staticPage({
		title: 'GOV.UK - The best place to find government services and information',
		heading: 'Sitemap',
		url: '/sitemap'
	}),
	'terms and conditions': staticPage({
		title: 'Terms and conditions',
		heading: 'Terms and conditions',
		url: '/terms-and-conditions'
	}),
	accessibility: staticPage({
		title: 'Accessibility statement for national infrastructure projects',
		heading: 'Accessibility statement for national infrastructure projects',
		url: '/accessibility-statement'
	}),
	'privacy notice': staticPage({
		title: 'Customer Privacy Notice - GOV.UK',
		heading: 'Customer Privacy Notice',
		url: '/customer-privacy-notice'
	}),
	'what is the name of the organisation you work for?': registrationPage({
		pageTitle: 'What is the name of the organisation you work for?',
		url: '/name-of-organisation',
		audience: 'agent'
	}),
	'the decision-making process for national infrastructure projects': processGuidePage({
		pageTitle: 'The process for Nationally Significant Infrastructure Projects (NSIPs)',
		heading: 'The process for Nationally Significant Infrastructure Projects (NSIPs)',
		url: '/decision-making-process-guide'
	}),
	'pre-application': processGuidePage({
		pageTitle: 'Pre-application',
		url: '/pre-application'
	}),
	acceptance: processGuidePage({
		pageTitle: 'Acceptance',
		url: '/review-of-the-application'
	}),
	'pre-examination': processGuidePage({
		pageTitle: 'Pre-examination',
		url: '/pre-examination'
	}),
	examination: processGuidePage({
		pageTitle: 'Examination',
		url: '/examination-of-the-application'
	}),
	recommendation: processGuidePage({
		pageTitle: 'Recommendation',
		url: '/recommendation'
	}),
	decision: processGuidePage({
		pageTitle: 'Decision',
		url: '/decision'
	}),
	'what happens after the decision is made': processGuidePage({
		pageTitle: 'What happens after the decision is made',
		url: '/what-happens-after-the-decision-is-made'
	}),
	'cookies settings': staticPage({
		title: 'Cookies',
		heading: 'Cookies',
		url: '/cookies'
	}),
	'are they 18 or over?': registrationPage({
		pageTitle: 'Are they 18 or over?',
		url: '/are-they-18-over',
		audience: 'agent'
	}),
	'what is their address?': registrationPage({
		pageTitle: 'What is their address?',
		url: '/their-postal-address',
		audience: 'agent'
	}),
	'what is their email address?': registrationPage({
		pageTitle: 'What is their email address?',
		url: '/their-email-address',
		audience: 'agent'
	}),
	'what is their telephone number?': registrationPage({
		pageTitle: 'What is their telephone number?',
		url: '/their-telephone-number',
		audience: 'agent'
	}),
	'project search': staticPage({
		title: 'Project search',
		heading: 'All Projects',
		url: '/project-search'
	})
};
