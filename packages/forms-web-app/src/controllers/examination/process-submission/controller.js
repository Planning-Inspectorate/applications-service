const logger = require('../../../lib/logger');

const {
	routesConfig: {
		examination: {
			pages: { processSubmission }
		}
	}
} = require('../../../routes/config');
const { sendData } = require('./utils/service');

const getProcessSubmission = async (req, res) => {
	try {
		const pageData = {
			warningText: 'Do not refresh this page or navigate away until processing is complete.',
			text: 'This may take a few minutes.',
			title: processSubmission.pageTitle
		};
		return res.render(processSubmission.view, pageData);
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postProcessSubmission = async (req, res) => {
	try {
		const { session } = req;

		await sendData(session);
		return res.json("that's worked");
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getProcessSubmission,
	postProcessSubmission
};
