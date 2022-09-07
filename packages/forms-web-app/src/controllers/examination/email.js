const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { nameMyself, email }
		}
	}
} = require('../../routes/config');

const pageData = {
	backLinkUrl: `${examinationDirectory + nameMyself.route}`,
	id: email.id,
	pageTitle: email.name,
	title: email.name
};

const getEmail = async (req, res) => {
	res.render(email.view, pageData);
};

const postEmail = async (req, res) => {
	res.render(email.view, pageData);
};

module.exports = {
	getEmail,
	postEmail
};
