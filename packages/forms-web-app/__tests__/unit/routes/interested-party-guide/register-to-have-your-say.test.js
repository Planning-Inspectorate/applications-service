const { get, post } = require('../router-mock');
const registerToHaveYourSayController = require('../../../../src/controllers/interested-party-guide/register-to-have-your-say');


describe('routes/interested-party-guide/register-to-have-your-say', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/interested-party-guide/register-to-have-your-say');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      '/register-to-have-your-say',
      registerToHaveYourSayController.getRegisterToHaveYourSay
    );

    expect(get.mock.calls.length).toBe(1);

  });
});
