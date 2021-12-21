const telephoneController = require('../../../../../src/controllers/register/behalf/representee-telephone');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/behalf/representee-telephone', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          representee: {
            telephone: '06876767',
          },
        },
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getTelephone', () => {
    it('should call the correct template', () => {
      telephoneController.getTelephone(req, res);
      expect(res.render).toHaveBeenCalledWith('register/behalf/representee-telephone', {
        telephone: '06876767',
      });
    });
  });

  describe('postTelephone', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}' if telephone is provided`, async () => {
      const mockRequest = {
        ...req,
        body: {
          telephone: '676876876',
        },
        query: {
          mode: '',
        },
      };
      await telephoneController.postTelephone(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.BEHALF.COMMENTS}`);
    });
    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          errorSummary: [{ text: 'There were errors here', href: '#' }],
          errors: { a: 'b' },
        },
      };
      await telephoneController.postTelephone(mockRequest, res);
      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.BEHALF.REPRESENTEE_TELEPHONE, {
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
      });
    });
  });
});
