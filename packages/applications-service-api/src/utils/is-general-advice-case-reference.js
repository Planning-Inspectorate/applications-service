const isGeneralAdviceCaseReference = (caseReference) => {
	const generalAdviceCaseReferenceNI = 'General';
	const generalAdviceCaseReferenceCBOS = 'GS5110001';

	return (
		caseReference === generalAdviceCaseReferenceNI ||
		caseReference === generalAdviceCaseReferenceCBOS
	);
};

module.exports = { isGeneralAdviceCaseReference };
