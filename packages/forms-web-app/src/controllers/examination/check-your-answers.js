const {
	routesConfig: {
		examination: {
			pages: { checkYourAnswers }
		}
	}
} = require('../../routes/config');

const pageData = {
	pageTitle: checkYourAnswers.name,
	title: checkYourAnswers.name
};

const getCheckYourAnswers = (req, res) => {
	res.render(checkYourAnswers.view, pageData);
};

module.exports = {
	getCheckYourAnswers
};
