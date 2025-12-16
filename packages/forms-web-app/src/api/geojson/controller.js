const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { projectStages } = require('../../utils/project-stages');

const getMasterGeojson = async (req, res, next) => {
	try {
		const startTime = Date.now();
		logger.info('Starting GeoJSON conversion...');

		const projectsResponse = await getAllProjectList();
		const fetchTime = Date.now() - startTime;
		logger.info('Projects response:', {
			status: projectsResponse?.resp_code,
			hasData: !!projectsResponse?.data
		});

		if (!projectsResponse || !projectsResponse.data) {
			throw new Error('Failed to fetch projects from database');
		}

		const projects = projectsResponse.data.applications || projectsResponse.data;
		logger.info(`Fetched ${projects.length} projects in ${fetchTime}ms`);

		// Convert projects to GeoJSON format
		const geojson = {
			type: 'FeatureCollection',
			features: projects.map((project) => {
				// Parse coordinates from LongLat array or use grid references
				let longitude = -1.7,
					latitude = 52.3; // Default fallback

				if (project.LongLat && Array.isArray(project.LongLat)) {
					longitude = parseFloat(project.LongLat[0]) || -1.7;
					latitude = parseFloat(project.LongLat[1]) || 52.3;
				}

				return {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [longitude, latitude]
					},
					properties: {
						caseRef: project.CaseReference,
						projectName: project.ProjectName,
						stage: projectStages[project.Stage] || 'Unknown',
						stageNumber: project.Stage,
						projectType: project.Proposal,
						region: project.Region,
						dateOfDCOSubmission: project.DateOfDCOSubmission,
						dateOfDCOAcceptance: project.DateOfDCOAcceptance_NonAcceptance
					}
				};
			})
		};

		logger.info(`Generated GeoJSON with ${geojson.features.length} features`);
		res.setHeader('Content-Type', 'application/json');
		res.json(geojson);
	} catch (error) {
		logger.error('GeoJSON conversion error:', error);
		next(error);
	}
};

module.exports = { getMasterGeojson };
