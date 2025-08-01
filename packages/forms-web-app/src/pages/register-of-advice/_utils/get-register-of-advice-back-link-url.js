const getRegisterOfAdviceBackLinkURL = (lang) =>
	'/register-of-advice' + (lang === 'cy' ? '?lang=cy' : '');

module.exports = { getRegisterOfAdviceBackLinkURL };
