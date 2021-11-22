const confirmationController = require('../../../../../src/controllers/register/myself/confirmation');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/confirmation', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            ...mockReq(),
            session: {
                mySelfRegdata: {
                    'email': 'anc@test.com'
                },
                projectName: 'ABC',
                claimRef: 'ABC123'
            },
        };
        res = mockRes();
        jest.resetAllMocks();
    });

    describe('getConfirmation', () => {
        it('should call the correct template', () => {
            confirmationController.getConfirmation(req, res);
            expect(res.render).toHaveBeenCalledWith('register/myself/confirmation', {email: 'anc@test.com', claimRef: 'ABC123', projectName: 'ABC'});
        });
    });
});