const controller = require('../../../src/controllers/representations');
const { getProjectData } = require('../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

jest.mock('../../../src/lib/application-api-wrapper');

describe('controllers/representations', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getRepresentations', () => {
    it('should call the correct template', async () => {
      getProjectData.mockImplementation(() =>
        Promise.resolve({
          resp_code: 200,
          data: { ProjectName: 'St James Barton Giant Wind Turbine' },
        })
      );
      await controller.getRepresentations(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.REPRESENTATIONS, {
        appData: { ProjectName: 'St James Barton Giant Wind Turbine' },
      });
    });
  });
});
