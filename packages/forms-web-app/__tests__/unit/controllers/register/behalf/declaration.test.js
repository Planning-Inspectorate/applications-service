const declarationController = require('../../../../../src/controllers/register/behalf/declaration');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/behalf/declaration', () => {
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
      expect(res.render).toHaveBeenCalledWith('register/behalf/declaration');
    });
  });

  describe('postDeclaration', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.BEHALF.CONFIRMATION}'`, async () => {
      const mockRequest = {
        ...req,
        body: {
          'declaration-confirmed': 'true',
        },
      };
      await declarationController.postDeclaration(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.BEHALF.CONFIRMATION}`);
    });
  });
});
