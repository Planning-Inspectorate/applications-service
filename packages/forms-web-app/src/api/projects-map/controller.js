const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');

const getProjectsMap = async (req, res, next) => {
	try {
		logger.info('Fetching projects for map API');

		const response = await getAllProjectList();

		if (!response || !response.data) {
			logger.warn('No projects found in response');
			return res.json([]);
		}

		const applications = response.data.applications || response.data;
		if (!Array.isArray(applications)) {
			logger.warn('Applications is not an array:', typeof applications);
			return res.json([]);
		}

		const projects = applications
			.filter((app) => {
				if (!app.LongLat || !Array.isArray(app.LongLat) || app.LongLat.length !== 2) {
					return false;
				}
				const lat = parseFloat(app.LongLat[1]);
				const lng = parseFloat(app.LongLat[0]);
				return !isNaN(lat) && !isNaN(lng);
			})
			.map((app) => ({
				caseReference: app.CaseReference,
				projectName: app.ProjectName,
				coordinates: [parseFloat(app.LongLat[1]), parseFloat(app.LongLat[0])],
				stage: app.Stage,
				region: app.Region
			}));

		res.json(projects);
	} catch (error) {
		logger.error('Error fetching projects for map API:', {
			error: error.message,
			stack: error.stack
		});
		next(error);
	}
};

module.exports = { getProjectsMap };
