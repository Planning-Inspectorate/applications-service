const { VIEW } = require('../../../lib/views');

exports.getCheckYourAnswers = (req, res) => {
	res.render(VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS, {
		data: {
			...req.session.mySelfRegdata,
			comment: req.session.comment
		}
	});
};
