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
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterAreThey18Controller,
	postRegisterAreThey18Controller
} = require('./are-they-18/controller');
const {
	getRegisterAgentAboutProjectController,
	postRegisterAgentAboutProjectController
} = require('./about-project/controller');
const { getRegisterAgentCheckAnswersController } = require('./check-answers/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');
const { getRegisterCompleteController } = require('../_common/complete/controller');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const {
	rules: organisationNameValidationRules
} = require('../../../../validators/register/agent/name-of-organisation');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: representingWhoValidationRules
} = require('../../../../validators/register/agent/who-representing');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/register/myself/telephone');
const {
	rules: areThey18ValidationRules
} = require('../../../../validators/register/agent/are-they-18-over');
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
jest.mock('../../../../validators/register/myself/address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/agent/who-representing', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/myself/telephone', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/agent/are-they-18-over', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/tell-us-about-project', () => {
	return {
		validate: jest.fn()
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
				registerMiddleware,
				getRegisterNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/full-name',
				registerMiddleware,
				decodeUri(),
				fullNameValidationRules(),
				validationErrorHandler,
				postRegisterNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-of-organisation',
				registerMiddleware,
				getRegisterAgentOrgNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/name-of-organisation',
				registerMiddleware,
				organisationNameValidationRules(),
				validationErrorHandler,
				postRegisterAgentOrgNameController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/email-address',
				registerMiddleware,
				getRegisterEmailController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/email-address',
				registerMiddleware,
				emailValidationRules(),
				validationErrorHandler,
				postRegisterEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/address',
				registerMiddleware,
				getRegisterAddressController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/address',
				registerMiddleware,
				addressValidationRules(),
				validationErrorHandler,
				postRegisterAddressController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/who-representing',
				registerMiddleware,
				getRegisterAgentRepresentingWhoController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/who-representing',
				registerMiddleware,
				representingWhoValidationRules(),
				validationErrorHandler,
				postRegisterAgentRepresentingWhoController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/telephone-number',
				registerMiddleware,
				getRegisterNumberController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/telephone-number',
				registerMiddleware,
				telephoneValidationRules(),
				validationErrorHandler,
				postRegisterNumberController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/are-they-18-over',
				registerMiddleware,
				getRegisterAreThey18Controller
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/are-they-18-over',
				registerMiddleware,
				areThey18ValidationRules(),
				validationErrorHandler,
				postRegisterAreThey18Controller
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/tell-us-about-project',
				registerMiddleware,
				getRegisterAgentAboutProjectController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/tell-us-about-project',
				registerMiddleware,
				decodeUri(),
				aboutProjectValidationRules(),
				validationErrorHandler,
				postRegisterAgentAboutProjectController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['comment']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/check-answers',
				registerMiddleware,
				getRegisterAgentCheckAnswersController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/declaration',
				registerMiddleware,
				getRegisterDeclarationController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/declaration',
				registerMiddleware,
				postRegisterDeclarationController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/agent/registration-complete',
				registerMiddleware,
				getRegisterCompleteController
			);

			expect(get).toBeCalledTimes(11);
			expect(post).toBeCalledTimes(9);
			expect(use).toBeCalledTimes(0);
		});
	});
});
