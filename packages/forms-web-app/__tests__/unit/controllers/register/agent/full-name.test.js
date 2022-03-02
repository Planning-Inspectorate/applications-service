const fullNameController = require('../../../../../src/controllers/register/agent/full-name');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/full-name', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          representor: {
            'full-name': 'test',
          },
        },
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getFullName', () => {
    it('should call the correct template', () => {
      fullNameController.getFullName(req, res);
      expect(res.render).toHaveBeenCalledWith('register/agent/full-name', { fullName: 'test' });
    });
  });

  describe('postFullName', () => {
    it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.ORGANISATION_NAME}' if name is provided`, async () => {
      const fullName = 'test';
      const mockRequest = {
        ...req,
        body: {
          'full-name': fullName,
        },
        query: {
          mode: '',
        },
      };
      await fullNameController.postFullName(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.AGENT.ORGANISATION_NAME}`);
    });
    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          errorSummary: [{ text: 'There were errors here', href: '#' }],
          errors: { a: 'b' },
        },
      };
      await fullNameController.postFullName(mockRequest, res);
      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.AGENT.FULL_NAME, {
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
      });
    });
  });
});
