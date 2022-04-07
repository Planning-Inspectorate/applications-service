const cyaController = require('../../../../../src/controllers/register/agent/check-answers');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/check-answers', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
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
      expect(res.render).toHaveBeenCalledWith('register/agent/check-answers', {
        data: {
          comment: 'comment',
          name: 'abc',
        },
      });
    });
  });
});
