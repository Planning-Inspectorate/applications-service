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

const validateMigration = async (req, res) => {
	const caseReference = req.params.caseReference;
	const applications = await getApplicationDiff(caseReference);
	const representations = await getRepresentationDiff(caseReference);
	res.status(200).json({
		applications,
		representations
	});
};

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

const getApplicationDiff = async (caseReference) => {
	const boApplication = mapBackOfficeApplicationToApi(
		await getBackOfficeApplication(caseReference)
	);
	const niApplication = mapNIApplicationToApi(await getNIApplication(caseReference));
	if (!boApplication && !niApplication) {
		return 'No applications found in back office or NI';
	}
	if (!boApplication || isEmpty(boApplication)) {
		return 'No back office application found';
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
	const diff = {};
	const { representations } = await getRepresentationsBORepository({ caseReference });
	const boRepresentations = mapBackOfficeRepresentationsToApi(representations);
	const { representations: niRepresentations } = await getRepresentationsWithCountNIRepository({
		caseReference
	});

	niRepresentations.forEach((niRepresentation) => {
		const boRepresentation = boRepresentations.find(
			(boRepresentation) => boRepresentation.ID === niRepresentation.ID
		);
		if (!boRepresentation) {
			diff[`${niRepresentation.ID}__missing_in_BO`] = niRepresentation;
		} else {
			const representationDiff = jsonDiff.diff(niRepresentation, boRepresentation);
			if (representationDiff) {
				diff[`${niRepresentation.ID}__${boRepresentation.ID}`] = representationDiff;
			}
		}
	});
	return {
		boLength: boRepresentations.length,
		niLength: niRepresentations.length,
		diff
	};
};

module.exports = {
	validateMigration
};
