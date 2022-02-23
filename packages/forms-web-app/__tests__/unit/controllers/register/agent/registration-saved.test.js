const registrationSavedController = require('../../../../../src/controllers/register/agent/registration-saved');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/registration-saved', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        behalfRegdata: {
          email: 'test@test.com',
        },
        ipRefNo: '10',
        typeOfParty: 'org',
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getRegistrationSaved', () => {
    it('should call the correct template', () => {
      registrationSavedController.getRegistrationSaved(req, res);
      expect(res.render).toHaveBeenCalledWith('register/agent/registration-saved', {
        email: 'test@test.com',
        ipRefNo: '10',
      });
    });
  });
});
