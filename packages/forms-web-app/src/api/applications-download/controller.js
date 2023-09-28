const logger = require('../../lib/logger');
const { getApplicationsCSV } = require('../_services/get-applications-csv');

const getApplicationsDownload = async (req, res) => {
	try {
		const applicationsCSV = await getApplicationsCSV();

		return res.attachment('applications.csv').send(applicationsCSV);
	} catch (error) {
		logger.error(error);
		return res.status(500).send(error);
	}
};

module.exports = { getApplicationsDownload };
