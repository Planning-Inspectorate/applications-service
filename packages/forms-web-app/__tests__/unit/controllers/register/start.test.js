const startController = require('../../../../src/controllers/register/start');
const { VIEW } = require('../../../../src/lib/views');
const config = require('../../../../src/config');
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
        },
      };
      startController.getStart(req, res);
      expect(res.render).toHaveBeenCalledWith('register/start', {
        serviceName: config.serviceName,
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
