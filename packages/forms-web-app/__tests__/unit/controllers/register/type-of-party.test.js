const typeOfPartyController = require('../../../../src/controllers/register/type-of-party');
const { VIEW } = require('../../../../src/lib/views');
const logger = require('../../../../src/lib/logger');
const { APPLICATION_DOCUMENT } = require('../../../../src/lib/empty-application');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/register/type-of-party', () => {
    let req;
    let res;

    beforeEach(() => {
        req = mockReq();
        res = mockRes();

        ({ empty: application } = APPLICATION_DOCUMENT);

        jest.resetAllMocks();
    });

    describe('getTypeOfParty', () => {
        it('should call the correct template', () => {
            typeOfPartyController.getTypeOfParty(req, res);
            expect(res.render).toHaveBeenCalledWith('register/type-of-party');
        });
    });

    describe('forwardPage', () => {
        it(`should return '/${VIEW.REGISTER.FULL_NAME}' if 1st option selected`, async () => {
            const pageRedirect = typeOfPartyController.forwardPage('mySay');

            expect(pageRedirect).toEqual(VIEW.REGISTER.FULL_NAME);
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
        it(`'should post data and redirect to '/${VIEW.REGISTER.FULL_NAME}' if 1st option is selected`, async () => {
            const typeOfParty = 'mySay';
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

            expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.FULL_NAME}`);
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