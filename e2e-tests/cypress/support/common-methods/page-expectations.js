const REGISTER_SERVICE =
	'Register to have your say about a national infrastructure project - National Infrastructure Planning';

const AUDIENCE = Object.freeze({
	myself: 'myself',
	organisation: 'organisation',
	agent: 'agent'
});

const AUDIENCES = Object.keys(AUDIENCE);

const AUDIENCE_CONFIG = Object.freeze({
	[AUDIENCE.myself]: {
		journey: 'Registering for myself',
		keySuffix: ''
	},
	[AUDIENCE.organisation]: {
		journey: 'Registering for an organisation',
		keySuffix: ' organisation'
	},
	[AUDIENCE.agent]: {
		journey: 'Registering on behalf of someone else',
		keySuffix: ' agent'
	}
});

class AudiencePageExpectationBuilder {
	static getAudienceConfig(audience) {
		return AUDIENCE_CONFIG[audience] ?? {};
	}

	static getAudienceKey(baseKey, audience) {
		return `${baseKey}${this.getAudienceConfig(audience).keySuffix}`;
	}

	static resolveAudienceValue(map, audience, defaultValue) {
		if (typeof map === 'object' && map !== null) {
			return map[audience] ?? map.default ?? defaultValue;
		}

		return map ?? defaultValue;
	}

	static registrationPage({ pageTitle, heading = pageTitle, url, audience, titleMatch = 'eq' }) {
		return staticPage({
			title: `${pageTitle} - ${this.getAudienceConfig(audience).journey} - ${REGISTER_SERVICE}`,
			heading,
			url,
			titleMatch
		});
	}

	static buildAudienceVariants(baseKey, pageTitle, urls, options = {}) {
		const { heading = pageTitle, titleMatch = 'eq' } = options;

		return AUDIENCES.reduce((result, audience) => {
			const url = urls[audience];
			if (url === undefined) {
				return result;
			}

			const audienceHeading = this.resolveAudienceValue(heading, audience, pageTitle);
			const resolvedTitleMatch = this.resolveAudienceValue(titleMatch, audience, 'eq');
			const key = this.getAudienceKey(baseKey, audience);

			result[key] = this.registrationPage({
				pageTitle,
				heading: audienceHeading,
				url,
				audience,
				titleMatch: resolvedTitleMatch
			});

			return result;
		}, {});
	}
}

const staticPage = ({ title, heading, url, titleMatch = 'eq' }) => ({
	title: title ? { value: title, match: titleMatch } : undefined,
	heading: heading ? { value: heading } : undefined,
	url
});

const registrationPage = ({ pageTitle, heading = pageTitle, url, audience, titleMatch = 'eq' }) =>
	AudiencePageExpectationBuilder.registrationPage({
		pageTitle,
		heading,
		url,
		audience,
		titleMatch
	});

const buildAudienceVariants = (...args) =>
	AudiencePageExpectationBuilder.buildAudienceVariants(...args);

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
	...buildAudienceVariants('what is your full name?', 'What is your full name?', {
		myself: '/full-name',
		organisation: '/full-name',
		agent: '/full-name'
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
		url: '/Pages/ResponsePage.aspx?id=mN94WIhvq0iTIpmM5VcIjdcJNm7Sd5hBrDlXlOtp9WFUMTNIVDdHTTdWRFU5MlRQRFczNzdPNDRHQSQlQCN0PWcu'
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
	...buildAudienceVariants('are you 18 or over?', 'Are you 18 or over?', {
		myself: '/are-you-18-over',
		organisation: '/are-you-18-over',
		agent: '/are-you-18-over'
	}),
	'uk address details': staticPage({
		title: 'UK address details - Register to have your say',
		heading: 'UK address details',
		url: '/address'
	}),
	...buildAudienceVariants(
		'what is your address?',
		'What is your address?',
		{
			myself: '/address',
			organisation: '/address',
			agent: '/address'
		},
		{
			heading: {
				default: 'What is your address?',
				myself: 'What is your address?',
				organisation: 'What is your address?',
				agent: 'What is your address'
			}
		}
	),
	...buildAudienceVariants('what is your email address?', 'What is your email address?', {
		myself: '/email-address',
		organisation: '/email',
		agent: '/email'
	}),
	...buildAudienceVariants('what is your telephone number?', 'What is your telephone number?', {
		myself: '/telephone',
		organisation: '/telephone',
		agent: '/telephone'
	}),
	...buildAudienceVariants(
		'what do you want to tell us about this proposed project?',
		'What do you want to tell us about this proposed project?',
		{
			myself: '/tell-us-about-project',
			organisation: '/tell-us-about-project',
			agent: '/tell-us-about-project'
		},
		{ titleMatch: { default: 'include', myself: 'include', organisation: 'eq', agent: 'eq' } }
	),
	...buildAudienceVariants(
		'check your answers before registering',
		'Check your answers before registering',
		{
			myself: '/check-answers',
			organisation: '/check-answers',
			agent: '/check-answers'
		},
		{ titleMatch: { default: 'include', myself: 'eq', organisation: 'include', agent: 'eq' } }
	),
	'check your answers before registering on behalf of someone else': registrationPage({
		pageTitle: 'Check your answers before registering',
		url: '/check-answers',
		audience: 'agent'
	}),
	...buildAudienceVariants('ai usage declaration', 'AI usage declaration', {
		myself: '/ai-declaration',
		organisation: '/ai-declaration',
		agent: '/ai-declaration'
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
		url: '/agent/registration-complete',
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
