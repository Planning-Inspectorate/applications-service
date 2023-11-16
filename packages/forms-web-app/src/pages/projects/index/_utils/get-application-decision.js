const getApplicationDecision = (document, documentTypes, documentTypeDictionary) => {
	let applicationDecision = null;

	switch (document?.type) {
		case documentTypeDictionary[documentTypes.DECISION_LETTER_APPROVE].bo:
			applicationDecision = 'granted';
			break;
		case documentTypeDictionary[documentTypes.DECISION_LETTER_REFUSE].bo:
			applicationDecision = 'refused';
			break;
	}
	return applicationDecision;
};

module.exports = {
	getApplicationDecision
};
