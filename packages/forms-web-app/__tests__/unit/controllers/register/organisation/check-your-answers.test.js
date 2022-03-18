const cyaController = require('../../../../../src/controllers/register/organisation/check-your-answers');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/check-your-answers', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        orgRegdata: {
          name: 'abc',
        },
        comment: 'comment',
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getCheckYourAnswers', () => {
    it('should call the correct template', () => {
      cyaController.getCheckYourAnswers(req, res);
      expect(res.render).toHaveBeenCalledWith('register/organisation/check-your-answers', {
        data: {
          comment: 'comment',
          name: 'abc',
        },
      });
    });
  });
});
