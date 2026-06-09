const fetch = require('node-fetch');
const logger = require('../../../lib/logger');
const { getPageData } = require('./_utils/get-page-data');
const {
	getProjectDecisionDocument,
	getRule6DocumentType,
	getRule8DocumentType,
	getProjectUpdatesData
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
const { getDocumentByType } = require('../../../lib/application-api-wrapper');
const { geoJsonMimeType } = require('./config');

const view = 'projects/index/view.njk';

const getProjectBoundaryGeoJSON = async (caseRef) => {
	try {
		const { data, resp_code } = await getDocumentByType(caseRef, documentTypes.GIS_SHAPEFILE);

		if (resp_code !== 200 || !data?.path || data?.mime !== geoJsonMimeType) {
			// It's common for a project not to have a shapefile, so a 404 is not an error.
			if (resp_code !== 404) {
				logger.warn(
					`GIS_SHAPEFILE rejected for ${caseRef}: resp_code=${resp_code}, path=${data?.path}, mime=${data?.mime}`
				);
			}
			return null;
		}

		const response = await fetch(data.path);

		if (!response.ok) {
			logger.warn(`Failed to fetch GIS_SHAPEFILE for ${caseRef}: HTTP ${response.status}`);
			return null;
		}

		const geoJson = await response.json();
		return JSON.stringify(geoJson);
	} catch (error) {
		logger.error(`Error fetching GIS_SHAPEFILE for ${caseRef}:`, error);
		return null;
	}
};

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

		const [projectUpdates, rule6Document, rule8Document, applicationDecision, mapGeoJSON] =
			await Promise.all([
				getProjectUpdatesData(caseRef),
				getRule6DocumentType(caseRef),
				getRule8DocumentType(caseRef),
				getMiscDataByStageName(applicationData.status.text, caseRef),
				getProjectBoundaryGeoJSON(caseRef)
			]);

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
			backOfficeCase
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsIndexController
};
