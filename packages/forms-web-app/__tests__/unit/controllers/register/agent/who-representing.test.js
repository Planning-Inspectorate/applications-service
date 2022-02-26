const representingForController = require('../../../../../src/controllers/register/agent/who-representing');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/who-representing', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          representing: 'family',
        },
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getRepresentingFor', () => {
    it('should call the correct template', () => {
      representingForController.getRepresentingFor(req, res);
      expect(res.render).toHaveBeenCalledWith('register/agent/who-representing', {
        representing: 'family',
      });
    });
  });

  describe('postRepresentingFor', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME}' if representing-for is provided`, async () => {
      const mockRequest = {
        ...req,
        body: {
          representing: 'family',
        },
        query: {
          mode: '',
        },
      };
      await representingForController.postRepresentingFor(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME}`);
    });
    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          errorSummary: [{ text: 'There were errors here', href: '#' }],
          errors: { a: 'b' },
        },
      };
      await representingForController.postRepresentingFor(mockRequest, res);
      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.AGENT.REPRESENTING_FOR, {
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
      });
    });
  });
});
