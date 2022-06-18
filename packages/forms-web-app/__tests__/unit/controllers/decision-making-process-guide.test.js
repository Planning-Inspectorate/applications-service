const dcoProcessGuideController = require('../../../src/controllers/decision-making-process-guide');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

describe('controllers/decision-making-process-guide', () => {
	let req;
	let res;

	beforeEach(() => {
		req = mockReq();
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getDecisionMakingProcessGuide', () => {
		it('should call the correct template', async () => {
			await dcoProcessGuideController.getDecisionMakingProcessGuide(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.DCO_PROCESS_GUIDE.DECISION_MAKINH_PROCESS_GUIDE);
		});
	});

	describe('getPreApplication', () => {
		it('should call the correct template', async () => {
			await dcoProcessGuideController.getPreApplication(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.DCO_PROCESS_GUIDE.PRE_APPLICATION);
		});
	});

	describe('getExaminationOfTheApplication', () => {
		it('should call the correct template', async () => {
			await dcoProcessGuideController.getExaminationOfTheApplication(req, res);
			expect(res.render).toHaveBeenCalledWith(
				VIEW.DCO_PROCESS_GUIDE.EXAMINATION_OF_THE_APPLICATION
			);
		});
	});

	describe('getReviewOfTheApplication', () => {
		it('should call the correct template', async () => {
			await dcoProcessGuideController.getReviewOfTheApplication(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.DCO_PROCESS_GUIDE.REVIEW_OF_THE_APPLICATION);
		});
	});

	describe('getPreExamination', () => {
		it('should call the correct template', async () => {
			await dcoProcessGuideController.getPreExamination(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.DCO_PROCESS_GUIDE.PRE_EXAMINATION);
		});
	});

	describe('getRecommendationAndDecision', () => {
		it('should call the correct template', async () => {
			await dcoProcessGuideController.getRecommendationAndDecision(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.DCO_PROCESS_GUIDE.RECOMMENDATION_AND_DECISION);
		});
	});

	describe('getWhatHappensAfterTheDecisionIsMade', () => {
		it('should call the correct template', async () => {
			await dcoProcessGuideController.getWhatHappensAfterTheDecisionIsMade(req, res);
			expect(res.render).toHaveBeenCalledWith(
				VIEW.DCO_PROCESS_GUIDE.WHAT_HAPPENS_AFTER_THE_DECISION_IS_MADE
			);
		});
	});
});
