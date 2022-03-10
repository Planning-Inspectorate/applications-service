const couldNotVerifyEmailController = require('../../../../src/controllers/register/could-not-verify-email');
const { VIEW } = require('../../../../src/lib/views');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/register/could-not-verify-email', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      query: {
        token: 'abc',
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getCouldNotVerifyEmail', () => {
    it('should call the correct template', () => {
      couldNotVerifyEmailController.getCouldNotVerifyEmail(req, res);
      expect(res.render).toHaveBeenCalledWith('register/could-not-verify-email', { token: 'abc' });
    });
  });
});
