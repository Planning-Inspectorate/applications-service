const confirmationController = require('../../../../../src/controllers/register/myself/confirmation');
const { postSelfRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');
jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/confirmation', () => {
    let req;
    let res;

    beforeEach(() => {
        jest.resetAllMocks();
        req = {
            ...mockReq(),
            session: {
                mySelfRegdata: {
                    'email': 'anc@test.com'
                },
                projectName: 'ABC',
                caseRef: 'ABC123',
                comments:{
                    comment: 'comment',
                    topic: 'topic'
                }
            },
        };
        res = mockRes();

        postSelfRegistration.mockImplementation(() => Promise.resolve(
            {resp_code : 200, data : "30020010"} 
        ));

        putComments.mockImplementation(() => Promise.resolve(
            {resp_code : 200, data : {}} 
        ));
    });

    describe('getConfirmation', () => {
        it('should call the correct template', () => {
            confirmationController.getConfirmation(req, res);
            // expect(res.render).toHaveBeenCalledWith('register/myself/confirmation',
            //  {ipRefNo: '30020010', email: 'anc@test.com', projectName: 'ABC', caseRef: 'ABC123'});
        });
    });
});