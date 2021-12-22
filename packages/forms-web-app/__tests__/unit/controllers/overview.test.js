const overviewController = require('../../../src/controllers/overview');
const { getProjectData } = require('../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

jest.mock('../../../src/lib/application-api-wrapper');

describe('controllers/overview', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getOverview', () => {
    it('should call the correct template', async () => {
      getProjectData.mockImplementation(() => Promise.resolve({ resp_code: 200, data: {} }));
      await overviewController.getOverview(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.OVERVIEW, {
        appData: {},
        stage: undefined,
        dateOfClosure: '',
      });
    });
  });
});
