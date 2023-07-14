const {
	getProjectUpdatesEmail,
	postProjectUpdatesEmail
} = require('./project-updates-email.controller');

describe('#getProjectUpdatesEmail', () => {
	const res = {
		render: jest.fn(),
		locals: { caseRef: 'mock-case-ref' }
	};
	const req = {};

	beforeEach(() => {
		getProjectUpdatesEmail(req, res);
	});

	it('-should render the page', () => {
		expect(res.render).toHaveBeenCalledWith(
			'projects/project-updates/project-updates-email/index.njk',
			{
				pageTitle: 'What is your email address?',
				privacyNoticeUrl: 'https://www.gov.uk/help/privacy-notice',
				backLinkUrl: '/projects/mock-case-ref/get-updates/start'
			}
		);
	});
});

describe('#postProjectUpdatesEmail', () => {
	describe('When posting the email', () => {
		const res = {
			render: jest.fn(),
			redirect: jest.fn(),
			locals: { caseRef: 'mock-case-ref' }
		};
		const req = {
			body: {
				email: '',
				errors: {
					email: {
						value: '',
						msg: 'Enter your email address',
						param: 'email',
						location: 'body'
					}
				},
				errorSummary: [{ text: 'Enter your email address', href: '#email' }]
			},
			session: {}
		};

		describe('and there is an error on the page', () => {
			beforeEach(async () => {
				await postProjectUpdatesEmail(req, res);
			});

			it('should show error if no email entered', async () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/project-updates/project-updates-email/index.njk',
					{
						pageTitle: 'What is your email address?',
						privacyNoticeUrl: 'https://www.gov.uk/help/privacy-notice',
						backLinkUrl: '/projects/mock-case-ref/get-updates/start',
						errors: {
							email: {
								location: 'body',
								msg: 'Enter your email address',
								param: 'email',
								value: ''
							}
						},
						errorSummary: [{ text: 'Enter your email address', href: '#email' }]
					}
				);
			});
		});

		describe('and there is no error on the page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const req = {
				body: { email: 'test@email.com' },
				session: {}
			};

			beforeEach(async () => {
				await postProjectUpdatesEmail(req, res);
			});

			it('should redirect to next page', async () => {
				expect(res.redirect).toHaveBeenCalledWith('/projects/mock-case-ref/get-updates/how-often');
			});
		});
	});
});
