const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { projectStages } = require('../../utils/project-stages');
const fetch = require('node-fetch');
const { maps } = require('../../config');

/**
 * Generates GeoJSON from database projects
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getGeoJsonController = async (req, res, next) => {
	try {
		const startTime = Date.now();
		logger.info('Starting GeoJSON generation from database...');

		const projectsResponse = await getAllProjectList();
		const fetchTime = Date.now() - startTime;

		if (!projectsResponse || !projectsResponse.data) {
			throw new Error('Failed to fetch projects from database');
		}

		const projects = projectsResponse.data.applications || projectsResponse.data;
		logger.info(`Fetched ${projects.length} projects in ${fetchTime}ms`);

		const geojson = {
			type: 'FeatureCollection',
			features: projects.map((project) => {
				let longitude = -1.7,
					latitude = 52.3;

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
		res.setHeader('Cache-Control', 'public, max-age=300');
		res.json(geojson);
	} catch (error) {
		logger.error({ error }, 'GeoJSON generation error');
		next(error);
	}
};

/**
 * Proxies external GeoJSON boundaries and enriches with project data
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getBoundariesController = async (req, res, next) => {
	try {
		const boundariesUrl = maps.geojsonURL;

		if (!boundariesUrl) {
			return res.status(404).json({ error: 'Boundaries URL not configured' });
		}

		logger.info(`Proxying boundaries from: ${boundariesUrl}`);

		// Fetch boundaries and project data in parallel
		const [boundariesResponse, projectsResponse] = await Promise.all([
			fetch(boundariesUrl),
			getAllProjectList()
		]);

		if (!boundariesResponse.ok) {
			throw new Error(`Failed to fetch boundaries: ${boundariesResponse.status}`);
		}

		const geojsonData = await boundariesResponse.json();

		// Create a lookup map from case reference to project data
		const projectsMap = new Map();
		if (projectsResponse?.data) {
			const projects = projectsResponse.data.applications || projectsResponse.data;
			projects.forEach((project) => {
				if (project.CaseReference) {
					projectsMap.set(project.CaseReference.toLowerCase(), project);
				}
			});
		}

		// Enrich boundary features with project data
		if (geojsonData.features) {
			geojsonData.features = geojsonData.features.map((feature) => {
				const caseRef = feature.properties?.caseReference;
				const project = caseRef ? projectsMap.get(caseRef.toLowerCase()) : null;

				if (project) {
					feature.properties = {
						...feature.properties,
						projectName: project.ProjectName || feature.properties.projectName,
						stage: projectStages[project.Stage] || 'Unknown',
						stageNumber: project.Stage,
						region: project.Region,
						sector: project.Proposal,
						dateOfDCOSubmission: project.DateOfDCOSubmission,
						projectLocation: project.ProjectLocation
					};
				}
				return feature;
			});
		}

		logger.info(`Proxied and enriched ${geojsonData.features?.length || 0} boundary features`);

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'public, max-age=300');
		res.json(geojsonData);
	} catch (error) {
		logger.error({ error }, 'Boundaries proxy error');
		next(error);
	}
};

module.exports = { getGeoJsonController, getBoundariesController };
