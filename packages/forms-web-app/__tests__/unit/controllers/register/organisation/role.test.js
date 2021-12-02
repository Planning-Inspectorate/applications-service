const roleController = require('../../../../../src/controllers/register/organisation/role');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/role', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            ...mockReq(),
            session: {
                orgRegdata: {
                    'role': 'test'
                }
            },
        };
        res = mockRes();
        jest.resetAllMocks();
    });

    describe('getRole', () => {
        it('should call the correct template', () => {
            roleController.getRole(req, res);
            expect(res.render).toHaveBeenCalledWith('register/organisation/role', {"role": "test"});
        });
    });

    describe('postRole', () => {
        it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.ROLE}' if role is provided`, async () => {
            const role = 'test';
            const mockRequest = {
                ...req,
                body: {
                    'role': role,
                },
                query: {
                    'mode': ""
                }
            };
            await roleController.postRole(
                mockRequest,
                res
            );

            expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.ORGANISATION.ADDRESS}`);
        });
        it('should re-render the template with errors if there is any validation error', async () => {
            const mockRequest = {
                ...req,
                body: {
                    errorSummary: [{ text: 'There were errors here', href: '#' }],
                    errors: { a: 'b' }
                },
            };
            await roleController.postRole(
                mockRequest,
                res
            );
            expect(res.redirect).not.toHaveBeenCalled();

            expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.ORGANISATION.ROLE, {
                errorSummary: [{ text: 'There were errors here', href: '#' }],
                errors: { a: 'b' }
            });
        });
    });
});