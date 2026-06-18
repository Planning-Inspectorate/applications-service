const fetch = require('node-fetch');
const {
	getProjectUpdates,
	getDocumentByType,
	getDocumentUriByDocRef
} = require('../lib/application-api-wrapper');
const { documentTypes } = require('@pins/common/src/constants');
const { geoJsonMimeType } = require('./projects/index/config');
const logger = require('../lib/logger');

const getProjectUpdatesData = async (caseRef) => {
	const response = await getProjectUpdates(caseRef);

	if (response.resp_code !== 200) throw new Error('Project updates response status not 200');

	return response.data.updates;
};

const getRule6DocumentType = async (caseRef) => {
	const { data, resp_code } = await getDocumentByType(caseRef, documentTypes.RULE_6_LETTER);
	return resp_code === 200 ? data : undefined;
};

const getRule8DocumentType = async (case_ref) => {
	const { data, resp_code } = await getDocumentByType(case_ref, documentTypes.RULE_8_LETTER);
	return resp_code === 200 ? data : undefined;
};

const getExaminationLibraryDocument = async (case_ref) => {
	const { data, resp_code } = await getDocumentByType(case_ref, documentTypes.EXAMINATION_LIBRARY);
	return resp_code === 200 ? data : undefined;
};

const getProjectDecisionDocument = async (caseRef) => {
	let response = null;

	const getApprovalDocument = await getDocumentByType(
		caseRef,
		documentTypes.DECISION_LETTER_APPROVE
	);

	if (getApprovalDocument.resp_code === 200 || getApprovalDocument.resp_code === 404) {
		if (getApprovalDocument.data?.id) return (response = getApprovalDocument.data);
	} else {
		throw new Error(`${getApprovalDocument.resp_code}: Error fetching project document`);
	}

	const getRefusalDocument = await getDocumentByType(caseRef, documentTypes.DECISION_LETTER_REFUSE);

	if (getRefusalDocument.resp_code === 200 || getRefusalDocument.resp_code === 404) {
		if (getRefusalDocument.data?.id) return (response = getRefusalDocument.data);
	} else {
		throw new Error(`${getRefusalDocument.resp_code}: Error fetching project document`);
	}

	return response;
};

const getShortDocLink = async (docRef) => {
	const { data, resp_code } = await getDocumentUriByDocRef(docRef);
	return resp_code === 200 ? data : undefined;
};

const getProjectBoundaryDocument = async (caseRef) => {
	try {
		const { data, resp_code } = await getDocumentByType(caseRef, documentTypes.GIS_SHAPEFILE);

		if (resp_code !== 200 || !data?.path || data?.mime !== geoJsonMimeType) {
			// It's common for a project not to have a shapefile
			if (resp_code !== 404) {
				logger.warn(
					`GIS_SHAPEFILE rejected for ${caseRef}: resp_code=${resp_code}, path=${data?.path}, mime=${data?.mime}`
				);
			}

			return null;
		}

		return data;
	} catch (error) {
		logger.error(`Error fetching GIS_SHAPEFILE metadata for ${caseRef}:`, error);
		return null;
	}
};

const getProjectBoundaryGeoJSON = async (boundaryDocument, caseRef) => {
	try {
		const response = await fetch(boundaryDocument.path);

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

module.exports = {
	getProjectUpdatesData,
	getRule6DocumentType,
	getRule8DocumentType,
	getExaminationLibraryDocument,
	getProjectDecisionDocument,
	getShortDocLink,
	getProjectBoundaryDocument,
	getProjectBoundaryGeoJSON
};
