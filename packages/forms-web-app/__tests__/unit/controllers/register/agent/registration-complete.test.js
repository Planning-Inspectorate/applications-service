const confirmationController = require('../../../../../src/controllers/register/agent/registration-complete');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/registration-complete', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          email: 'anc@test.com',
        },
        projectName: 'ABC',
        caseRef: 'ABC123',
        comment: {
          comment: 'comment',
        },
      },
    };
    res = mockRes();

    postRegistration.mockImplementation(() =>
      Promise.resolve({ resp_code: 200, data: '30020010' })
    );

    putComments.mockImplementation(() => Promise.resolve({ resp_code: 200, data: {} }));
  });

  describe('getConfirmation', () => {
    it('should call the correct template', async () => {
      await confirmationController.getConfirmation(req, res);
      expect(res.render).toHaveBeenCalledWith('register/agent/registration-complete', {
        email: 'anc@test.com',
        projectName: 'ABC',
        caseRef: 'ABC123',
      });
    });
  });
});
