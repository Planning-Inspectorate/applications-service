/* eslint-disable camelcase */
const { VIEW } = require('../../lib/views');

exports.getCouldNotVerifyEmail = async (req, res) => {
	const { token } = req.query;
	res.render(VIEW.REGISTER.TOKEN_EMAIL_NOT_VERIFIED, { token });
};
