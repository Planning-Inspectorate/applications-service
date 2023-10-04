const {
	getByCaseReference: getBackOfficeApplication
} = require('../repositories/project.repository');
const { getNIApplication } = require('./application.ni.service');
const config = require('../lib/config');
const {
	mapNIApplicationToApi,
	mapBackOfficeApplicationToApi
} = require('../utils/application.mapper');

const getApplication = async (caseReference) =>
	isBackOfficeApplication(caseReference)
		? mapBackOfficeApplicationToApi(await getBackOfficeApplication(caseReference))
		: mapNIApplicationToApi(await getNIApplication(caseReference));

const isBackOfficeApplication = (caseReference) =>
	config.backOfficeIntegration.applications.getApplication.caseReferences.includes(caseReference);

module.exports = {
	getApplication
};
