const emailController = require('../../../../../src/controllers/register/agent/email-address');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/email-address', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          representor: {
            email: 'anc@test.com',
          },
        },
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getEmail', () => {
    it('should call the correct template', () => {
      emailController.getEmail(req, res);
      expect(res.render).toHaveBeenCalledWith('register/agent/email-address', {
        email: 'anc@test.com',
      });
    });
  });

  describe('postEmail', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.BEHALF.TELEPHONE}' if email is provided`, async () => {
      const mockRequest = {
        ...req,
        body: {
          email: 'anc@test.com',
        },
        query: {
          mode: '',
        },
      };
      await emailController.postEmail(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.BEHALF.TELEPHONE}`);
    });
    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          errorSummary: [{ text: 'There were errors here', href: '#' }],
          errors: { a: 'b' },
        },
      };
      await emailController.postEmail(mockRequest, res);
      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.BEHALF.EMAIL, {
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
      });
    });
  });
});
