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

  describe('getReviewOfTheApplication', () => {
    it('should call the correct template', async () => {
      await dcoProcessGuideController.getReviewOfTheApplication(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.DCO_PROCESS_GUIDE.REVIEW_OF_THE_APPLICATION);
    });
  });
});
