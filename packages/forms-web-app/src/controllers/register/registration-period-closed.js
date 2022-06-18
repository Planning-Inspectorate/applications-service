const { VIEW } = require('../../lib/views');

exports.showInfo = async (req, res) => {
	const { projectName, caseRef } = req.session;
	res.render(VIEW.REGISTER.REGISTRATION_PERIOD_CLOSED, {
		projectName,
		caseRef
	});
};
