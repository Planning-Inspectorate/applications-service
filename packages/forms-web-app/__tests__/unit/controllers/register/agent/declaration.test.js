const declarationController = require('../../../../../src/controllers/register/agent/declaration');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/declaration', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getDeclaration', () => {
    it('should call the correct template', () => {
      declarationController.getDeclaration(req, res);
      expect(res.render).toHaveBeenCalledWith('register/agent/declaration');
    });
  });

  describe('postDeclaration', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.CONFIRMATION}'`, async () => {
      const mockRequest = {
        ...req,
        body: {
          'declaration-confirmed': 'true',
        },
      };
      await declarationController.postDeclaration(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.AGENT.CONFIRMATION}`);
    });
  });
});
