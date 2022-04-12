const session = require('../../../src/lib/session');
const config = require('../../../src/config');

jest.mock('express-session');
jest.mock('../../../src/lib/logger');

describe('lib/session', () => {
  it('should throw if unable to find the session secret', () => {
    expect(() => session()).toThrow('Session secret must be set');
  });

  it('should configure with the expected config', () => {
    config.server.sessionSecret = 'a fake session secret';

    const configuredSession = session();

    expect(configuredSession.cookie).toEqual({});
    expect(configuredSession.resave).toEqual(false);
    expect(configuredSession.saveUninitialized).toEqual(true);
    expect(configuredSession.secret).toEqual(config.server.sessionSecret);
  });

  it('should configure with the expected config when useSecureSessionCookie', () => {
    config.server.sessionSecret = 'a fake session secret';
    config.server.useSecureSessionCookie = true;

    const configuredSession = session();

    expect(configuredSession.cookie.secure).toEqual(true);
    expect(configuredSession.resave).toEqual(false);
    expect(configuredSession.saveUninitialized).toEqual(true);
    expect(configuredSession.secret).toEqual(config.server.sessionSecret);
  });
});
