const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { projectStages } = require('../../utils/project-stages');

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
					logger.warn(`Skipping project: missing/invalid LongLat`, { caseRef: app.CaseReference });
					return false;
				}
				const lat = parseFloat(app.LongLat[1]);
				const lng = parseFloat(app.LongLat[0]);

				if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
					logger.warn(`Skipping project: invalid coordinates [${lat}, ${lng}]`, {
						caseRef: app.CaseReference,
						projectName: app.ProjectName
					});
					return false;
				}
				return true;
			})
			.map((app) => ({
				caseReference: app.CaseReference,
				projectName: app.ProjectName,
				coordinates: [parseFloat(app.LongLat[1]), parseFloat(app.LongLat[0])],
				stage: app.Stage,
				stageName: projectStages[app.Stage] || app.Stage,
				summary: app.Summary,
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
