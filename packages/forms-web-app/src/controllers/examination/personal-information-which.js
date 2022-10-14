const {
	routesConfig: {
		examination: {
			pages: { personalInformationWhich, personalInformationWhichCommentFiles }
		}
	}
} = require('../../routes/config');

const pageData = {
	id: personalInformationWhichCommentFiles.id,
	pageTitle: personalInformationWhichCommentFiles.name,
	title: personalInformationWhichCommentFiles.name
};

const getPersonalInformationWhich = (req, res) => {
	res.render(personalInformationWhich.view, pageData);
};

const postPersonalInformationWhich = (req, res) => {
	res.render(personalInformationWhich.view, pageData);
};

module.exports = {
	getPersonalInformationWhich,
	postPersonalInformationWhich
};
