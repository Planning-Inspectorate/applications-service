const controller = require('../../../src/controllers/recommendations');
const { getProjectData } = require('../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

jest.mock('../../../src/lib/application-api-wrapper');

describe('controllers/recommendations', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getRecommendations', () => {
    it('should call the correct template', async () => {
      getProjectData.mockImplementation(() =>
        Promise.resolve({
          resp_code: 200,
          data: {
            ProjectName: 'St James Barton Giant Wind Turbine',
            CaseReference: 'EN010009',
          },
        })
      );
      await controller.getRecommendations(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.RECOMMENDATIONS, {
        projectName: 'St James Barton Giant Wind Turbine',
        caseRef: 'EN010009',
      });
    });
  });
});
