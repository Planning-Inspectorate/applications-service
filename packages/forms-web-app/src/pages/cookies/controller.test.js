const { getCookiesController, postCookiesController } = require('./controller');
const cookieConfig = require('../../scripts/cookie/cookie-config');
const appConfig = require('../../config');
const getPreviousPagePath = require('../../lib/get-previous-page-path');
const { mockReq, mockRes } = require('../../../__tests__/unit/mocks');
const { addFlashMessage } = require('../../lib/flash-message');
const { removeUnwantedCookies } = require('../../lib/remove-unwanted-cookies');
const { toBase64 } = require('../../lib/base64');
const { getCookiesURL } = require('./_utils/get-cookies-url');
const { mockI18n } = require('../_mocks/i18n');
const cookiesTranslation_EN = require('./_translations/en.json');

const view = 'cookies/view.njk';
const cookiesUpdatedMessagePath = 'cookies/_includes/cookies-updated-successfully-message.njk';
const cookiesURL = getCookiesURL();

jest.mock('../../../src/config');
jest.mock('../../../src/lib/remove-unwanted-cookies');
jest.mock('../../../src/lib/flash-message');
jest.mock('../../../src/lib/get-previous-page-path', () => jest.fn());

const cookiesTranslations = {
	cookies: cookiesTranslation_EN
};

describe('pages/cookies/controller.js', () => {
	const FIXED_SYSTEM_TIME = '2020-11-18T00:00:00Z';
	const fakePreviousPage = '/some/previous/page';

	let req;
	let res;

	beforeEach(() => {
		jest.resetAllMocks();

		req = {
			...mockReq(),
			body: {},
			cookies: {},
			i18n: mockI18n(cookiesTranslations),
			session: { flashMessages: [] }
		};
		res = mockRes();

		// https://github.com/facebook/jest/issues/2234#issuecomment-730037781
		jest.useFakeTimers('modern');
		jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe('#getCookiesController', () => {
		beforeEach(() => {
			getPreviousPagePath.mockImplementation(() => fakePreviousPage);
		});

		it('should not throw if cannot parse req.cookies value', () => {
			req.cookies[cookieConfig.COOKIE_POLICY_KEY] = 'blurgh';

			getCookiesController(req, res);

			expect(req.log.warn).toHaveBeenCalledWith(
				new SyntaxError(`Unexpected token 'b', "blurgh" is not valid JSON`),
				'Get cookies.'
			);

			expect(res.render).toHaveBeenCalledWith(view, {
				cookiePolicy: {},
				previousPagePath: toBase64(fakePreviousPage),
				displayCookieBanner: false
			});
		});

		it('should call the correct template', () => {
			getCookiesController(req, res);

			expect(res.render).toHaveBeenCalledWith(view, {
				cookiePolicy: undefined,
				previousPagePath: toBase64(fakePreviousPage),
				displayCookieBanner: false
			});
		});
	});

	describe('#postCookiesController', () => {
		it('should redirect on the happy path - no data submitted', () => {
			postCookiesController(req, res);

			expect(res.redirect).toHaveBeenCalledWith(`/cookies`);

			expect(res.cookie).not.toHaveBeenCalled();
		});

		it('calls the correct template on error', () => {
			req = {
				...req,
				body: {
					errors: { a: 'b' }
				}
			};

			postCookiesController(req, res);

			expect(res.render).toHaveBeenCalledWith(view, {
				cookiePolicy: undefined,
				displayCookieBanner: false
			});

			expect(res.cookie).not.toHaveBeenCalled();
		});

		describe('should redirect on the happy path', () => {
			const resCookieCallTest = (usage, secure) => {
				expect(res.cookie).toHaveBeenCalledWith(
					cookieConfig.COOKIE_POLICY_KEY,
					JSON.stringify({
						...cookieConfig.DEFAULT_COOKIE_POLICY,
						usage
					}),
					{ encode: String, expires: new Date('2021-11-18T00:00:00.000Z'), secure }
				);
			};

			[
				{
					description: 'Not in production, disable usage cookies',
					before: () => {
						appConfig.isProduction = false;
					},
					setupReq: () => ({
						...req,
						body: {
							'usage-cookies': 'off',
							previous_page_path: toBase64(fakePreviousPage)
						},
						session: { flashMessages: [] }
					}),
					runExtraAssertions: () => {
						resCookieCallTest(false, false);
						expect(removeUnwantedCookies).toHaveBeenCalledWith(req, res);
					},
					expectedPreviousPagePath: fakePreviousPage
				},
				{
					description: 'Not in production, enable usage cookies',
					before: () => {
						appConfig.isProduction = false;
					},
					setupReq: () => ({
						...req,
						body: {
							'usage-cookies': 'on'
						},
						session: { flashMessages: [] }
					}),
					expectedPreviousPagePath: '/',
					runExtraAssertions: () => {
						resCookieCallTest(true, false);
						expect(removeUnwantedCookies).not.toHaveBeenCalled();
					}
				},
				{
					description: 'In production, disable usage cookies',
					before: () => {
						appConfig.isProduction = true;
					},
					setupReq: () => ({
						...req,
						body: {
							'usage-cookies': 'off'
						},
						session: { flashMessages: [] }
					}),
					expectedPreviousPagePath: '/',
					runExtraAssertions: () => {
						resCookieCallTest(false, true);
						expect(removeUnwantedCookies).toHaveBeenCalledWith(req, res);
					}
				},
				{
					description: 'In production,  enable usage cookies',
					before: () => {
						appConfig.isProduction = true;
					},
					setupReq: () => ({
						...req,
						body: {
							'usage-cookies': 'on',
							previous_page_path: toBase64(fakePreviousPage)
						},
						session: { flashMessages: [] }
					}),
					runExtraAssertions: () => {
						resCookieCallTest(true, true);
						expect(removeUnwantedCookies).not.toHaveBeenCalled();
					},
					expectedPreviousPagePath: fakePreviousPage
				}
			].forEach(
				({ description, before, setupReq, expectedPreviousPagePath, runExtraAssertions }) => {
					test(`with data submitted - ${description}`, () => {
						before();
						req = setupReq();

						postCookiesController(req, res);

						expect(addFlashMessage).toHaveBeenCalledWith(req, {
							type: 'success',
							template: {
								path: cookiesUpdatedMessagePath,
								vars: {
									previousPagePath: expectedPreviousPagePath
								},
								t: undefined
							}
						});

						expect(res.redirect).toHaveBeenCalledWith(cookiesURL);

						runExtraAssertions(req, res);
					});
				}
			);

			afterEach(() => {
				appConfig.isProduction = false;
			});
		});
	});
});
