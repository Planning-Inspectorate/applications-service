const declarationController = require('../../../../../src/controllers/register/organisation/declaration');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/declaration', () => {
    let req;
    let res;

    beforeEach(() => {
        req = mockReq();
        res = mockRes();
        jest.resetAllMocks();
    });

    describe('getDeclaration', () => {
        it('should call the correct template', () => {
            declarationController.getDeclaration(req, res);
            expect(res.render).toHaveBeenCalledWith('register/organisation/declaration');
        });
    });

    describe('postDeclaration', () => {
        it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.CONFIRMATION}'`, async () => {
            const mockRequest = {
                ...req,
                body: {
                    'declaration-confirmed': 'true',
                }
            };
            await declarationController.postDeclaration(
                mockRequest,
                res
            );

            expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.ORGANISATION.CONFIRMATION}`);
        });
    });
});