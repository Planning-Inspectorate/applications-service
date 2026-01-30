const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');
const {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
} = require('../_common/are-you-18/controller');
const {
	getRegisterOrganisationOrgNameController,
	postRegisterOrganisationOrgNameController
} = require('./organisation-name/controller');
const {
	getRegisterEmailController,
	postRegisterEmailController
} = require('../_common/email/controller');
const {
	getRegisterOrganisationJobTitleController,
	postRegisterOrganisationJobTitleController
} = require('./job-title/controller');
const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterOrganisationAboutProjectController,
	postRegisterOrganisationAboutProjectController
} = require('./about-project/controller');
const { getRegisterOrganisationCheckAnswersController } = require('./check-answers/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');
const { getRegisterCompleteController } = require('../_common/complete/controller');
const {
	getRegisterAlreadyRegisteredController
} = require('../_common/already-registered/controller');

const { registerMiddleware } = require('../_middleware/register-middleware');
const { registerStartRedirectMiddleware } = require('../_middleware/start-redirect-middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');
const { noCache } = require('../_middleware/no-cache');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { rules: areYou18ValidationRules } = require('../../../../validators/shared/are-you-18-over');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const {
	rules: jobTitleValidationRules
} = require('../../../../validators/register/organisation/what-job-title-or-role');
const { rules: addressValidationRules } = require('../../../../validators/shared/address');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/shared/telephone-number');
const {
	rules: organisationOrgNameValidationRules
} = require('../../../../validators/register/organisation/name-of-organisation-or-charity');
const {
	validate: aboutProjectValidationRules
} = require('../../../../validators/register/tell-us-about-project');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

jest.mock('../../../../middleware/decode-uri', () => {
	return {
		decodeUri: jest.fn()
	};
});

jest.mock('../../../../validators/shared/full-name', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/are-you-18-over', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/organisation/name-of-organisation-or-charity', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/email-address', () => {
	return {
		emailValidationRules: jest.fn()
	};
});
jest.mock('../../../../validators/register/organisation/what-job-title-or-role', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/telephone-number', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/tell-us-about-project', () => {
	return {
		validate: jest.fn()
	};
});

describe('pages/projects/register/organisation/router', () => {
	describe('#registerOrganisationRouter', () => {
		const get = jest.fn();
		const post = jest.fn();
		const use = jest.fn();

		jest.doMock('express', () => ({
			Router: () => ({
				get,
				post,
				use
			})
		}));

		beforeEach(() => {
			require('./router');
		});

		it('should call the register organisation routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/full-name',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/full-name',
				registerStartRedirectMiddleware,
				registerMiddleware,
				decodeUri(),
				fullNameValidationRules(),
				validationErrorHandler,
				postRegisterNameController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['full-name']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/are-you-18-over',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAreYou18Controller
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/are-you-18-over',
				registerStartRedirectMiddleware,
				registerMiddleware,
				areYou18ValidationRules(),
				validationErrorHandler,
				postRegisterAreYou18Controller
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/name-of-organisation-or-charity',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterOrganisationOrgNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/name-of-organisation-or-charity',
				registerStartRedirectMiddleware,
				registerMiddleware,
				organisationOrgNameValidationRules(),
				validationErrorHandler,
				postRegisterOrganisationOrgNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/email-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterEmailController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/email-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				emailValidationRules(),
				validationErrorHandler,
				postRegisterEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/what-job-title-or-role',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterOrganisationJobTitleController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/what-job-title-or-role',
				registerStartRedirectMiddleware,
				registerMiddleware,
				decodeUri(),
				jobTitleValidationRules(),
				validationErrorHandler,
				postRegisterOrganisationJobTitleController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['role']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAddressController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				addressValidationRules(),
				validationErrorHandler,
				postRegisterAddressController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/telephone-number',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterNumberController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/telephone-number',
				registerStartRedirectMiddleware,
				registerMiddleware,
				telephoneValidationRules(),
				validationErrorHandler,
				postRegisterNumberController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/tell-us-about-project',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterOrganisationAboutProjectController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/tell-us-about-project',
				registerStartRedirectMiddleware,
				registerMiddleware,
				decodeUri(),
				aboutProjectValidationRules(),
				validationErrorHandler,
				postRegisterOrganisationAboutProjectController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['comment']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/check-answers',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterOrganisationCheckAnswersController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/declaration',
				registerStartRedirectMiddleware,
				noCache,
				registerMiddleware,
				getRegisterDeclarationController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/declaration',
				registerStartRedirectMiddleware,
				registerMiddleware,
				postRegisterDeclarationController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/registration-complete',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterCompleteController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/already-registered',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAlreadyRegisteredController
			);

			expect(get).toBeCalledTimes(12);
			expect(post).toBeCalledTimes(9);
			expect(use).toBeCalledTimes(0);
		});
	});
});
