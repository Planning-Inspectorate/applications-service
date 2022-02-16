const confirmationController = require('../../../../../src/controllers/register/organisation/confirmation');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');
jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/confirmation', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      session: {
        orgRegdata: {
          email: 'anc@test.com',
        },
        projectName: 'ABC',
        caseRef: 'ABC123',
        comments: {
          comment: 'comment',
          topic: 'topic',
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
      expect(res.render).toHaveBeenCalledWith('register/organisation/confirmation', {
        ipRefNo: '30020010',
        email: 'anc@test.com',
        projectName: 'ABC',
        caseRef: 'ABC123',
      });
    });
  });
});
