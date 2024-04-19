/**
 * This is a temporary controller to validate the migration of applications from NI to Back Office.
 * Once the migration is complete, this controller will be removed.
 */
const {
	mapBackOfficeApplicationToApi,
	mapNIApplicationToApi
} = require('../utils/application.mapper');
const {
	getByCaseReference: getBackOfficeApplication
} = require('../repositories/project.backoffice.repository');
const { getNIApplication } = require('../services/application.ni.service');
const { isEmpty, isEqual } = require('lodash');
const jsonDiff = require('json-diff');
const {
	getRepresentations: getRepresentationsBORepository
} = require('../repositories/representation.backoffice.repository');
const {
	getRepresentationsWithCount: getRepresentationsWithCountNIRepository
} = require('../repositories/representation.ni.repository');
const { mapBackOfficeRepresentationsToApi } = require('../utils/representation.mapper');
const { mapBackOfficeTimetableToApi, mapNITimetableToApi } = require('../utils/timetable.mapper');
const {
	getTimetablesByCaseReference: getBackOfficeTimetable
} = require('../repositories/timetable.backoffice.repository');
const {
	getTimetablesByCaseReference: getNITimetable
} = require('../repositories/timetable.ni.repository');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdvice
} = require('../repositories/advice.backoffice.repository');
const {
	getAllAdviceByCaseReference: getAllNIAdvice
} = require('../repositories/advice.ni.repository');
const { mapBackOfficeAdviceListToApi } = require('../utils/advice.mapper');
const { getDocuments } = require('../repositories/document.backoffice.repository');
const { mapBackOfficeDocuments, mapDocuments } = require('../utils/document.mapper');
const { fetchDocuments } = require('../repositories/document.ni.repository');

const validateMigration = async (req, res) => {
	const caseReference = req.params.caseReference;
	const applications = await getApplicationDiff(caseReference);
	const representations = await getRepresentationDiff(caseReference);
	const advice = await getAdviceDiff(caseReference);
	const examTimetable = await getExamTimetableDiff(caseReference);
	const documents = await getDocumentDiff(caseReference);
	res.status(200).json({
		applications,
		representations,
		advice,
		examTimetable,
		documents
	});
};

const getApplicationDiff = async (caseReference) => {
	const boApplication = mapBackOfficeApplicationToApi(
		await getBackOfficeApplication(caseReference)
	);
	const niApplication = mapNIApplicationToApi(await getNIApplication(caseReference));
	if (!boApplication && !niApplication) {
		return 'No applications found in back office or NI';
	}
	if (!boApplication || isEmpty(boApplication)) {
		return 'No BO application found';
	}
	if (!niApplication || isEmpty(niApplication)) {
		return 'No NI application found';
	}
	if (isEqual(boApplication, niApplication)) {
		return 'Applications are the same';
	}

	const diff = jsonDiff.diff(niApplication, boApplication);
	return generateBetterDiff(diff);
};

const getRepresentationDiff = async (caseReference) => {
	const { representations } = await getRepresentationsBORepository({ caseReference });
	const boRepresentations = mapBackOfficeRepresentationsToApi(representations);
	const { representations: niRepresentations } = await getRepresentationsWithCountNIRepository({
		caseReference
	});
	return getEntityDiff('ID', niRepresentations, boRepresentations);
};

const getAdviceDiff = async (caseReference) => {
	const { advice } = await getAllBackOfficeAdvice(caseReference);
	const boAdvice = mapBackOfficeAdviceListToApi(advice);
	const { advice: niAdvice } = await getAllNIAdvice(caseReference);
	return getEntityDiff('adviceID', niAdvice, boAdvice);
};

const getExamTimetableDiff = async (caseReference) => {
	const boTimeTable = mapBackOfficeTimetableToApi(await getBackOfficeTimetable(caseReference));
	const niTimeTable = mapNITimetableToApi(await getNITimetable(caseReference));
	return getEntityDiff('id', niTimeTable, boTimeTable);
};

const getDocumentDiff = async (caseReference) => {
	const { rows: boDocs } = await getDocuments({ caseReference });
	const mappedBoDOcs = mapBackOfficeDocuments(boDocs);
	const { rows: niDocs } = await fetchDocuments({ caseReference });
	const mappedNiDOcs = mapDocuments(niDocs);
	return getEntityDiff('id', mappedNiDOcs, mappedBoDOcs);
};

/* ------------------ Helper functions ------------------ */

/**
 * This function generates a more readable diff object
 * by replacing the keys of the diff object with more meaningful names
 * Note: This function only works if first object is NI and second object is BO
 * @param diff
 */
const generateBetterDiff = (diff) => {
	const replaceKeys = (obj) => {
		const keys = Object.keys(obj);
		keys.forEach((key) => {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				replaceKeys(obj[key]);
			}

			let newKey = key
				.replace('__old', 'NI')
				.replace('__new', 'BO')
				.replace('__deleted', '__missing_in_BO')
				.replace('__added', '__missing_in_NI');

			newKey = newKey.charAt(0).toUpperCase() + newKey.slice(1);
			obj[newKey] = obj[key];
			if (newKey !== key) delete obj[key];
		});
	};

	replaceKeys(diff);

	return diff;
};

const getEntityDiff = (comparisonKey, niEntity, boEntity) => {
	if (!niEntity && !boEntity) {
		return 'None found in back office or NI';
	}
	if (!niEntity) {
		return 'None found in NI';
	}
	if (!boEntity) {
		return 'None found in BO';
	}

	const diff = {};
	niEntity.forEach((ni) => {
		const bo = boEntity.find((bo) => bo[comparisonKey] === ni[comparisonKey]);
		if (!bo) {
			diff[`${ni[comparisonKey]}__missing_in_BO`] = ni;
		} else {
			const entityDiff = jsonDiff.diff(ni, bo);
			diff[ni[comparisonKey]] = generateBetterDiff(entityDiff);
		}
	});

	boEntity.forEach((bo) => {
		const ni = niEntity.find((ni) => ni[comparisonKey] === bo[comparisonKey]);
		if (!ni) {
			diff[`${bo[comparisonKey]}__missing_in_NI`] = bo;
		}
	});

	return {
		boLength: boEntity.length,
		niLength: niEntity.length,
		diff
	};
};

module.exports = {
	validateMigration
};
