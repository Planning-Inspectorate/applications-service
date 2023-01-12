const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { haveYourSay }
		}
	}
} = require('../../../../routes/config');

const getExaminationSubmitCommentsURL = () => {
	return examinationDirectory + haveYourSay.route;
};

module.exports = { getExaminationSubmitCommentsURL };
