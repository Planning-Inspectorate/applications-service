const confirmationController = require('../../../../../src/controllers/register/agent/registration-complete');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllersregister/agent/registration-complete', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          representor: {
            email: 'anc@test.com',
          },
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
      expect(req.session.comment).toBe(undefined);
      expect(req.session.typeOfParty).toBe(undefined);
      expect(req.session.orgRegdata).toBe(undefined);
      expect(res.render).toHaveBeenCalledWith('register/agent/registration-complete', {
        ipRefNo: '30020010',
        email: 'anc@test.com',
        projectName: 'ABC',
        caseRef: 'ABC123',
      });
    });
  });
});
