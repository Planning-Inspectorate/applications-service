const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');
const {
	getRegisterAgentOrgNameController,
	postRegisterAgentOrgNameController
} = require('./organisation-name/controller');
const {
	getRegisterEmailController,
	postRegisterEmailController
} = require('../_common/email/controller');
const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterAgentRepresentingWhoController,
	postRegisterAgentRepresentingWhoController
} = require('./representing-who/controller');
const {
	getRegisterAgentRepresentingNameController,
	postRegisterAgentRepresentingNameController
} = require('./_common/representing-name/controller');
const {
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterAreThey18Controller,
	postRegisterAreThey18Controller
} = require('./are-they-18/controller');
const {
	getRegisterAgentTheirAddressController,
	postRegisterAgentTheirAddressController
} = require('./their-address/controller');
const {
	getRegisterAgentTheirEmailController,
	postRegisterAgentTheirEmailController
} = require('./their-email/controller');
const {
	getRegisterAgentAboutProjectController,
	postRegisterAgentAboutProjectController
} = require('./about-project/controller');
const {
	getRegisterAgentTheirTelephoneController,
	postRegisterAgentTheirTelephoneController
} = require('./their-telephone/controller');
const { getRegisterAgentCheckAnswersController } = require('./check-answers/controller');
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
const {
	rules: organisationNameValidationRules
} = require('../../../../validators/register/agent/name-of-organisation');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/shared/address');
const {
	rules: representingWhoValidationRules
} = require('../../../../validators/register/agent/who-representing');
const {
	rules: representingNameValidationRules
} = require('../../../../validators/register/agent/name-representing');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/shared/telephone-number');
const {
	rules: areThey18ValidationRules
} = require('../../../../validators/register/agent/are-they-18-over');
const {
	rules: theirEmailValidationRules
} = require('../../../../validators/register/agent/their-email-address');
const {
	validate: aboutProjectValidationRules
} = require('../../../../validators/register/tell-us-about-project');
const {
	rules: theirTelephoneValidationRules
} = require('../../../../validators/register/agent/their-telephone-number');

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
jest.mock('../../../../validators/register/agent/name-of-organisation', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/email-address', () => {
	return {
		emailValidationRules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/agent/who-representing', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/agent/name-representing', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/telephone-number', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/agent/are-they-18-over', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/agent/their-email-address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/tell-us-about-project', () => {
	return {
		validate: jest.fn()
	};
});
jest.mock('../../../../validators/register/agent/their-telephone-number', () => {
	return {
		rules: jest.fn()
	};
});

describe('pages/projects/register/agent/router', () => {
	describe('#registerAgentRouter', () => {
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

		it('should call the register agent routes and controllers', () => {
			expect(decodeUri).toHaveBeenCalledWith('body', ['full-name']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/full-name',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/full-name',
				registerStartRedirectMiddleware,
				registerMiddleware,
				decodeUri(),
				fullNameValidationRules(),
				validationErrorHandler,
				postRegisterNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-of-organisation',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentOrgNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-of-organisation',
				registerStartRedirectMiddleware,
				registerMiddleware,
				organisationNameValidationRules(),
				validationErrorHandler,
				postRegisterAgentOrgNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/email-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterEmailController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/email-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				emailValidationRules(),
				validationErrorHandler,
				postRegisterEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAddressController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				addressValidationRules(),
				validationErrorHandler,
				postRegisterAddressController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/who-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentRepresentingWhoController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/who-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				representingWhoValidationRules(),
				validationErrorHandler,
				postRegisterAgentRepresentingWhoController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-person-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentRepresentingNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-person-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				representingNameValidationRules(),
				validationErrorHandler,
				postRegisterAgentRepresentingNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-organisation-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentRepresentingNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-organisation-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				representingNameValidationRules(),
				validationErrorHandler,
				postRegisterAgentRepresentingNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-household-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentRepresentingNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-household-representing',
				registerStartRedirectMiddleware,
				registerMiddleware,
				representingNameValidationRules(),
				validationErrorHandler,
				postRegisterAgentRepresentingNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/telephone-number',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterNumberController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/telephone-number',
				registerStartRedirectMiddleware,
				registerMiddleware,
				telephoneValidationRules(),
				validationErrorHandler,
				postRegisterNumberController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/are-they-18-over',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAreThey18Controller
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/are-they-18-over',
				registerStartRedirectMiddleware,
				registerMiddleware,
				areThey18ValidationRules(),
				validationErrorHandler,
				postRegisterAreThey18Controller
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/their-postal-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentTheirAddressController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/their-postal-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				addressValidationRules(),
				validationErrorHandler,
				postRegisterAgentTheirAddressController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/their-email-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentTheirEmailController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/their-email-address',
				registerStartRedirectMiddleware,
				registerMiddleware,
				theirEmailValidationRules(),
				validationErrorHandler,
				postRegisterAgentTheirEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/tell-us-about-project',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentAboutProjectController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/tell-us-about-project',
				registerStartRedirectMiddleware,
				registerMiddleware,
				decodeUri(),
				aboutProjectValidationRules(),
				validationErrorHandler,
				postRegisterAgentAboutProjectController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['comment']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/their-telephone-number',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentTheirTelephoneController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/their-telephone-number',
				registerStartRedirectMiddleware,
				registerMiddleware,
				theirTelephoneValidationRules(),
				validationErrorHandler,
				postRegisterAgentTheirTelephoneController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/check-answers',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAgentCheckAnswersController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/declaration',
				registerStartRedirectMiddleware,
				noCache,
				registerMiddleware,
				getRegisterDeclarationController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/declaration',
				registerStartRedirectMiddleware,
				registerMiddleware,
				postRegisterDeclarationController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/registration-complete',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterCompleteController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/already-registered',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisterAlreadyRegisteredController
			);

			expect(get).toBeCalledTimes(18);
			expect(post).toBeCalledTimes(15);
			expect(use).toBeCalledTimes(0);
		});
	});
});
