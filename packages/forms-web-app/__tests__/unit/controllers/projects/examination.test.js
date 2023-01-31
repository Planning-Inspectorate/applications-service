const examinationController = require('../../../../src/controllers/projects/examination');
const { getProjectData } = require('../../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

jest.mock('../../../../src/lib/application-api-wrapper');
jest.mock('../../../../src/config.js', () => ({
	logger: {
		level: 'info'
	},
	featureFlag: {
		showAffectedAreaSection: false
	}
}));

describe('controllers/projects/examination', () => {
	let req;
	let res;

	const mockConfig = {
		logger: {
			level: 'info'
		},
		featureFlag: {
			showAffectedAreaSection: false
		}
	};

	beforeEach(() => {
		req = mockReq();
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getExamination', () => {
		it('should call the correct template', async () => {
			getProjectData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: { DateOfRelevantRepresentationClose: '2020-02-02' }
				})
			);
			await examinationController.getExamination(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.PROJECT, {
				appData: { DateOfRelevantRepresentationClose: '2020-02-02' },
				caseRef: undefined,
				dateOfClosure: '2 February 2020',
				hasContactSupport: undefined,
				periodOpen: false,
				projectAcceptsComments: false,
				projectName: undefined,
				stage: undefined,
				stagePosition: undefined,
				stageTotal: 8,
				config: mockConfig
			});
		});
		it('should redirect to not found route if Project caseRef does not exist', async () => {
			getProjectData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 503,
					data: { DateOfRelevantRepresentationClose: '2020-02-02' }
				})
			);
			await examinationController.getExamination(req, res);
			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});
	});
});
