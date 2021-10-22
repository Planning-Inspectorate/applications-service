const fullNameController = require('../../../../src/controllers/register/full-name');
const { VIEW } = require('../../../../src/lib/views');
const logger = require('../../../../src/lib/logger');
const { APPLICATION_DOCUMENT } = require('../../../../src/lib/empty-application');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/register/full-name', () => {
    let req;
    let res;

    beforeEach(() => {
        req = mockReq();
        res = mockRes();

        ({ empty: application } = APPLICATION_DOCUMENT);

        jest.resetAllMocks();
    });

    describe('getFullName', () => {
        it('should call the correct template', () => {
            fullNameController.getFullName(req, res);
            expect(res.render).toHaveBeenCalledWith('register/full-name');
        });
    });

    describe('postFullName', () => {
        it(`'should post data and redirect to '/${VIEW.REGISTER.TEST2}' if name is provided`, async () => {
            const fullName = 'test';
            const mockRequest = {
                ...req,
                body: {
                    'full-name': fullName,
                },
            };
            await fullNameController.postFullName(
                mockRequest,
                res
            );

            expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.TEST2}`);
        });
        it('should re-render the template with errors if there is any validation error', async () => {
            const mockRequest = {
                ...req,
                body: {
                    errorSummary: [{ text: 'There were errors here', href: '#' }],
                    errors: { a: 'b' }
                },
            };
            await fullNameController.postFullName(
                mockRequest,
                res
            );
            expect(res.redirect).not.toHaveBeenCalled();

            expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.FULL_NAME, {
                errorSummary: [{ text: 'There were errors here', href: '#' }],
                errors: { a: 'b' }
            });
        });
    });
});