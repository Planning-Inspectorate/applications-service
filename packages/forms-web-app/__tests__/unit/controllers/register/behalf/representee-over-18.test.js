const over18Controller = require('../../../../../src/controllers/register/behalf/representee-over-18');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/behalf/representee-over-18', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          representee: {
            'over-18': 'yes',
          },
        },
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getOver18', () => {
    it('should call the correct template', () => {
      over18Controller.getOver18(req, res);
      expect(res.render).toHaveBeenCalledWith('register/behalf/representee-over-18', {
        over18: 'yes',
      });
    });
  });

  describe('postOver18', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.BEHALF.REPRESENTEE_ADDRESS}' if over-18 is provided`, async () => {
      const mockRequest = {
        ...req,
        body: {
          'over-18': 'yes',
        },
        query: {
          mode: '',
        },
      };
      await over18Controller.postOver18(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_ADDRESS}`);
    });
    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          errorSummary: [{ text: 'There were errors here', href: '#' }],
          errors: { a: 'b' },
        },
      };
      await over18Controller.postOver18(mockRequest, res);
      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.BEHALF.REPRESENTEE_OVER_18, {
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
      });
    });
  });
});
