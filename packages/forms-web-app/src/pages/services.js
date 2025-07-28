const { getProjectUpdates, getDocumentByType } = require('../lib/application-api-wrapper');
const { documentTypes } = require('@pins/common/src/constants');

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

module.exports = {
	getProjectUpdatesData,
	getRule6DocumentType,
	getRule8DocumentType,
	getExaminationLibraryDocument,
	getProjectDecisionDocument
};
