const registerTypeOfPartySessionID = 'typeOfParty';

const getRegisterTypeOfPartySession = (session) => session[registerTypeOfPartySessionID];

const setRegisterTypeOfPartySession = (session, value) =>
	(session[registerTypeOfPartySessionID] = value);

module.exports = { getRegisterTypeOfPartySession, setRegisterTypeOfPartySession };
