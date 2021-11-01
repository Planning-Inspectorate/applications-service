const startController = require('../../../../src/controllers/register/start');
const { VIEW } = require('../../../../src/lib/views');
const config = require('../../../../src/config');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/register/start', () => {
    let req;
    let res;

    beforeEach(() => {
        req = mockReq();
        res = mockRes();
        jest.resetAllMocks();
    });

    describe('getStart', () => {
        it('should call the correct template', () => {
            startController.getStart(req, res);
            expect(res.render).toHaveBeenCalledWith('register/start', {"serviceName": config.serviceName});
        });
    });
});