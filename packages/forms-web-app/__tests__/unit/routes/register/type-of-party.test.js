const { get, post } = require('../router-mock');
const typeOfPartyController = require('../../../../src/controllers/register/myself/type-of-party');
const { validationErrorHandler } = require('../../../../src/validators/validation-error-handler');
const {
  rules: typeOfPartyValidationRules,
} = require('../../../../src/validators/register/myself/type-of-party');

jest.mock('../../../../src/validators/register/myself/type-of-party');

describe('routes/register/myself/type-of-party', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/register/myself/type-of-party');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      '/type-of-party',
      typeOfPartyController.getTypeOfParty
    );
    expect(post).toHaveBeenCalledWith(
      '/type-of-party',
      typeOfPartyValidationRules(),
      validationErrorHandler,
      typeOfPartyController.postTypeOfParty
    );
    expect(get.mock.calls.length).toBe(1);
    expect(post.mock.calls.length).toBe(1);
  });
});
