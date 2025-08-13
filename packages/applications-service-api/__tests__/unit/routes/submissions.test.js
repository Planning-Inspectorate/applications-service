const { post } = require('./router-mock');
const fileUpload = require('express-fileupload');
const submissionsController = require('../../../src/controllers/submissions');
const config = require('../../../src/lib/config');
const { validateCreateSubmissionRequest } = require('../../../src/middleware/validator/submission');
const { normaliseRequestFileData } = require('../../../src/middleware/normaliseRequestFileData');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');

jest.mock('express-fileupload');
jest.mock('../../../src/middleware/fileUploadLimitHandler');
jest.mock('../../../src/middleware/parseFormDataProperties');
jest.mock('@pins/common/src/utils/async-route');

const fileUploadLimitHandlerMock =
	require('../../../src/middleware/fileUploadLimitHandler').fileUploadLimitHandler;
const fileUploadMockValue = jest.fn();

const parseFormDataPropertiesMock =
	require('../../../src/middleware/parseFormDataProperties').parseFormDataProperties;
const parseFormDataPropertiesMockValue = jest.fn();

const asyncRouteMock = require('@pins/common/src/utils/async-route').asyncRoute;
const asyncRouteMockValue = jest.fn();

describe('routes/submissions', () => {
	fileUpload.mockImplementation(() => fileUploadMockValue);
	parseFormDataPropertiesMock.mockImplementation(() => parseFormDataPropertiesMockValue);
	asyncRouteMock.mockImplementation((fn) => asyncRouteMockValue(fn));

	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/submissions');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(fileUpload).toBeCalledWith({
			limits: { fileSize: config.uploads.fileSizeLimit },
			abortOnLimit: true,
			limitHandler: fileUploadLimitHandlerMock,
			defCharset: 'utf8',
			defParamCharset: 'utf8'
		});

		expect(parseFormDataPropertiesMock).toBeCalledWith([
			'interestedParty',
			'sensitiveData',
			'lateSubmission'
		]);

		expect(post).toHaveBeenCalledWith(
			'/:caseReference',
			fileUploadMockValue,
			normaliseRequestFileData,
			parseFormDataPropertiesMockValue,
			validateCreateSubmissionRequest,
			asyncRouteMock(submissionsController.createSubmission)
		);
		expect(asyncRouteMockValue).toHaveBeenCalledWith(submissionsController.createSubmission);

		expect(post).toHaveBeenCalledWith(
			'/:submissionId/complete',
			validateRequestWithOpenAPI,
			asyncRouteMock(submissionsController.completeSubmission)
		);
		expect(asyncRouteMockValue).toHaveBeenCalledWith(submissionsController.completeSubmission);
	});
});
