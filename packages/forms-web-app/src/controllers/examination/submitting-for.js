const {
	routesConfig: {
		examination: {
			pages: {
				submittingFor: { view: examinationSubmittingForView }
			}
		}
	}
} = require('../../routes/config');

const setData = {
	backLinkUrl: '#main-content',
	pageTitle: 'Who are you making the submission for?',
	title: 'Who are you making the submission for?'
};

const getSubmittingFor = (req, res) => {
	res.render(examinationSubmittingForView, setData);
};

const postSubmittingFor = (req, res) => {
	res.render(examinationSubmittingForView, setData);
};

module.exports = {
	getSubmittingFor,
	postSubmittingFor
};
