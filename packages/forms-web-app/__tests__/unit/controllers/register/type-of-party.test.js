const typeOfPartyController = require('../../../../src/controllers/register/type-of-party');
const { VIEW } = require('../../../../src/lib/views');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/register/type-of-party', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            ...mockReq(),
            session: {
                registrationData: {
                    'type-of-party': 'me'
                }
            },
        };
        res = mockRes();

        jest.resetAllMocks();
    });

    describe('getTypeOfParty', () => {
        it('should call the correct template', () => {
            typeOfPartyController.getTypeOfParty(req, res);
            expect(res.render).toHaveBeenCalledWith('register/type-of-party', {"type": "me"});
        });
    });

    describe('forwardPage', () => {
        it(`should return '/${VIEW.REGISTER.MYSELF.FULL_NAME}' if 1st option selected`, async () => {
            const pageRedirect = typeOfPartyController.forwardPage('me');

            expect(pageRedirect).toEqual(VIEW.REGISTER.MYSELF.FULL_NAME);
        });

        it(`should return '/${VIEW.REGISTER.TEST2}' if 2nd option selected`, async () => {
            const pageRedirect = typeOfPartyController.forwardPage('organisation');

            expect(pageRedirect).toEqual(VIEW.REGISTER.TEST2);
        });

        it(`should return '/${VIEW.REGISTER.TEST3}' if 3rd option selected`, async () => {
            const pageRedirect = typeOfPartyController.forwardPage('behalfOfOrganisation');

            expect(pageRedirect).toEqual(VIEW.REGISTER.TEST3);
        });

        it(`should return '/${VIEW.REGISTER.TYPE_OF_PARTY}' if it is 'default'`, async () => {
            const pageRedirect = typeOfPartyController.forwardPage('default');

            expect(pageRedirect).toEqual(VIEW.REGISTER.TYPE_OF_PARTY);
        });

    });

    describe('postTypeOfParty', () => {
        it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.FULL_NAME}' if 1st option is selected`, async () => {
            const typeOfParty = 'me';
            const mockRequest = {
                ...req,
                body: {
                    'type-of-party': typeOfParty,
                },
            };
            await typeOfPartyController.postTypeOfParty(
                mockRequest,
                res
            );

            expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.FULL_NAME}`);
        });
        it('should re-render the template with errors if there is any validation error', async () => {
            const mockRequest = {
                ...req,
                body: {
                    'type-of-party': null,
                    errors: { a: 'b' },
                    errorSummary: [{ text: 'There were errors here', href: '#' }],
                },
            };
            await typeOfPartyController.postTypeOfParty(
                mockRequest,
                res
            );

            expect(res.redirect).not.toHaveBeenCalled();

            expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.TYPE_OF_PARTY, {
                errorSummary: [{ text: 'There were errors here', href: '#' }],
                errors: { a: 'b' },
                type: null
            });
        });
    });
});