const {
	routesConfig: {
		examination: {
			pages: { checkYourAnswers }
		}
	}
} = require('../../routes/config');

const setData = {
	pageTitle: checkYourAnswers.name,
	title: checkYourAnswers.name
};

const getCheckYourAnswers = (req, res) => {
	res.render(checkYourAnswers.view, setData);
};

module.exports = {
	getCheckYourAnswers
};
