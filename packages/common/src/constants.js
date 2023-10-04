const documentTypes = {
	RULE_6_LETTER: 'RULE_6_LETTER',
	RULE_8_LETTER: 'RULE_8_LETTER',
	EXAMINATION_LIBRARY: 'EXAMINATION_LIBRARY',
	DECISION_LETTER_APPROVE: 'DECISION_LETTER_APPROVE',
	DECISION_LETTER_REFUSE: 'DECISION_LETTER_REFUSE'
};

const documentTypeDictionary = {
	[documentTypes.RULE_6_LETTER]: {
		bo: 'Rule 6 letter',
		ni: 'Rule 6 letter - Notification of the preliminary meeting and matters to be discussed'
	},
	[documentTypes.RULE_8_LETTER]: {
		bo: 'Rule 8 letter',
		ni: 'Rule 8 letter - notification of timetable for the examination'
	},
	[documentTypes.EXAMINATION_LIBRARY]: {
		bo: 'Exam library',
		ni: 'Examination library'
	},
	[documentTypes.DECISION_LETTER_APPROVE]: {
		bo: 'DCO decision letter (SoS)(approve)',
		ni: 'DCO decision letter (SoS)(approve)'
	},
	[documentTypes.DECISION_LETTER_REFUSE]: {
		bo: 'DCO decision letter (SoS)(refuse)',
		ni: 'DCO decision letter (SoS)(refuse)'
	}
};

module.exports = {
	documentTypes,
	documentTypeDictionary
};
