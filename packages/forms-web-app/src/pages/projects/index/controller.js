const fetch = require('node-fetch');
const logger = require('../../../lib/logger');
const { getPageData } = require('./_utils/get-page-data');
const {
	getProjectDecisionDocument,
	getRule6DocumentType,
	getRule8DocumentType,
	getProjectUpdatesData,
	getProjectBoundaryDocument,
	getProjectBoundaryGeoJSON
} = require('../../services');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const { getApplicationDecision } = require('./_utils/get-application-decision');
const { documentTypes, documentTypeDictionary } = require('@pins/common/src/constants');
const { getPreExaminationSubStage } = require('./_utils/pre-examination-sub-stages');
const { formatProjectStagesToLowerCase } = require('./_utils/formatters');
const {
	getExaminationOrDecisionCompletedDate
} = require('./_utils/examination-or-decision-completed-date');
const { getMapAccessToken } = require('../../_services');
const { isBackOfficeCaseReference } = require('./_utils/is-backoffice-case-reference');
const { GeoJSONBuilder } = require('../../../lib/geojson-builder');

const { getProjectsBoundaryDownloadURL } = require('./_utils/get-projects-boundary-download-url');

const view = 'projects/index/view.njk';

const getMiscDataByStageName = async (stageName, caseRef) => {
	stageName = stageName.toLowerCase();
	const formattedProjectStages = formatProjectStagesToLowerCase(projectInfoProjectStages);
	let result = null;

	//post decision
	if (stageName === formattedProjectStages[7]) {
		const projectDecisionDocument = await getProjectDecisionDocument(caseRef);
		result = getApplicationDecision(projectDecisionDocument, documentTypes, documentTypeDictionary);
	}

	return result;
};

const getProjectsIndexController = async (req, res, next) => {
	try {
		const { i18n } = req;
		const {
			locals: { applicationData }
		} = res;
		const { caseRef } = applicationData;

		const boundaryDownloadURL = getProjectsBoundaryDownloadURL(caseRef);

		const [projectUpdates, rule6Document, rule8Document, applicationDecision, boundaryDocument] =
			await Promise.all([
				getProjectUpdatesData(caseRef),
				getRule6DocumentType(caseRef),
				getRule8DocumentType(caseRef),
				getMiscDataByStageName(applicationData.status.text, caseRef),
				getProjectBoundaryDocument(caseRef)
			]);

		const mapGeoJSON = boundaryDocument
			? await getProjectBoundaryGeoJSON(boundaryDocument, caseRef)
			: null;

		const hasMapData = mapGeoJSON || applicationData.longLat;
		const mapAccessToken = hasMapData ? await getMapAccessToken() : null;

		const preExamSubStages = getPreExaminationSubStage(applicationData, rule6Document);
		const recommendationCompletedDate = getExaminationOrDecisionCompletedDate(
			applicationData.dateTimeExaminationEnds,
			applicationData.stage5ExtensionToRecommendationDeadline
		);
		const decisionCompletedDate = getExaminationOrDecisionCompletedDate(
			applicationData.dateOfRecommendations,
			applicationData.stage5ExtensionToDecisionDeadline
		);
		const backOfficeCase = isBackOfficeCaseReference(caseRef);

		let finalMapGeoJSON = mapGeoJSON;

		// Fallback to a point if no boundary polygon was found
		if (!finalMapGeoJSON && applicationData.longLat) {
			const builder = new GeoJSONBuilder();
			builder.addPoint(applicationData.longLat);
			finalMapGeoJSON = JSON.stringify(builder.build());
		}

		return res.render(view, {
			...getPageData(i18n, applicationData, projectUpdates),
			preExamSubStages,
			applicationDecision,
			rule6Document,
			rule8Document,
			recommendationCompletedDate,
			decisionCompletedDate,
			mapAccessToken,
			mapGeoJSON: finalMapGeoJSON,
			backOfficeCase,
			boundaryDocument,
			boundaryDownloadURL
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const downloadProjectBoundaryController = async (req, res, next) => {
	try {
		const { case_ref } = req.params;

		const boundaryDocument = await getProjectBoundaryDocument(case_ref);

		if (!boundaryDocument?.path) {
			return res.status(404).render('error/not-found');
		}

		const response = await fetch(boundaryDocument.path);

		if (!response.ok) {
			logger.warn(`Failed to fetch GIS_SHAPEFILE for ${case_ref}: HTTP ${response.status}`);

			return res.status(404).render('error/not-found');
		}

		res.setHeader('Content-Disposition', `attachment; filename="${case_ref}-boundary.geojson"`);

		res.setHeader('Content-Type', 'application/geo+json');

		response.body.pipe(res);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const getProjectBoundaryGeoJsonController = async (req, res, next) => {
	try {
		const { case_ref } = req.params;

		const boundaryDocument = await getProjectBoundaryDocument(case_ref);

		if (!boundaryDocument) {
			return res.status(204).send();
		}

		const geoJson = await getProjectBoundaryGeoJSON(boundaryDocument, case_ref);

		if (!geoJson) {
			return res.status(204).send();
		}

		return res.json(JSON.parse(geoJson));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsIndexController,
	downloadProjectBoundaryController,
	getProjectBoundaryGeoJsonController
};
