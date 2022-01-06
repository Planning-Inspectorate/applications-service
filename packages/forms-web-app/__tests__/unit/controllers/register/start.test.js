const startController = require('../../../../src/controllers/register/start');
const { VIEW } = require('../../../../src/lib/views');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/register/start', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getStart', () => {
    it('should call the correct template if caseRef is provided', () => {
      req = {
        ...mockReq(),
        session: {
          caseRef: 'ABC123',
          projectName: 'St James Barton Giant Wind Turbine',
          appData: {
            DateOfRelevantRepresentationClose: '2024-09-01',
          },
        },
      };
      startController.getStart(req, res);
      expect(res.render).toHaveBeenCalledWith('register/start', {
        projectName: 'St James Barton Giant Wind Turbine',
        closeDate: '2024-09-01',
      });
    });
    it('should redirect to correct route if caseRef not provided', () => {
      req = {
        ...mockReq(),
        session: {},
      };
      startController.getStart(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.PROJECT_SEARCH}`);
    });
  });
});
