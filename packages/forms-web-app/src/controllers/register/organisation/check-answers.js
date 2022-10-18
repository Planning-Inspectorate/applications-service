const { VIEW } = require('../../../lib/views');

exports.getCheckYourAnswers = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS, {
		data: {
			...req.session.orgRegdata,
			comment: req.session.comment
		}
	});
};
