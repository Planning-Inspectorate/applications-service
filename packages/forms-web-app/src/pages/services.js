const { getProjectUpdates, getDocumentByType } = require('../lib/application-api-wrapper');
const { documentTypes } = require('@pins/common/src/constants');

const getProjectUpdatesData = async (caseRef) => {
	const response = await getProjectUpdates(caseRef);

	if (response.resp_code !== 200) throw new Error('Project updates response status not 200');

	return response.data.updates;
};

const getRule6DocumentType = async (case_ref) => {
	const { data, resp_code } = await getDocumentByType(case_ref, documentTypes.RULE_6_LETTER);
	return resp_code === 200 ? data : undefined;
};

module.exports = {
	getProjectUpdatesData,
	getRule6DocumentType
};
