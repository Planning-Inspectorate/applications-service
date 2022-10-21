const { post } = require('./router-mock');
const fileUpload = require('express-fileupload');
const submissionsController = require('../../../src/controllers/submissions');
const config = require('../../../src/lib/config');
const { validateRequest } = require('../../../src/middleware/validator/submission');
const { normaliseRequestFileData } = require('../../../src/middleware/normaliseRequestFileData');

jest.mock('express-fileupload');
jest.mock('../../../src/middleware/fileUploadLimitHandler');
jest.mock('../../../src/middleware/parseFormDataProperties');

const fileUploadLimitHandlerMock =
	require('../../../src/middleware/fileUploadLimitHandler').fileUploadLimitHandler;
const fileUploadMockValue = jest.fn();

const parseFormDataPropertiesMock =
	require('../../../src/middleware/parseFormDataProperties').parseFormDataProperties;
const parseFormDataPropertiesMockValue = jest.fn();

describe('routes/submissions', () => {
	fileUpload.mockImplementation(() => fileUploadMockValue);
	parseFormDataPropertiesMock.mockImplementation(() => parseFormDataPropertiesMockValue);

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
			limitHandler: fileUploadLimitHandlerMock
		});

		expect(parseFormDataPropertiesMock).toBeCalledWith(
			['interestedParty', 'sensitiveData', 'lateSubmission'],
			['submissionId']
		);

		expect(post).toHaveBeenCalledWith(
			'/:caseReference',
			fileUploadMockValue,
			normaliseRequestFileData,
			parseFormDataPropertiesMockValue,
			validateRequest,
			submissionsController.createSubmission
		);
	});
});
