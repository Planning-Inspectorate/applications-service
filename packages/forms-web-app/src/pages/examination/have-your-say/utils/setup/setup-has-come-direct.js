const hasDateInThePast = (dateOfNonAcceptance) => new Date() >= new Date(dateOfNonAcceptance);
const setupHasComeDirect = (session, dateOfNonAcceptance) => {
	if (dateOfNonAcceptance && hasDateInThePast(dateOfNonAcceptance)) {
		session.examination = {
			showChooseDeadline: true
		};
	} else {
		throw new Error('NO_OPEN_DEADLINES');
	}
};

module.exports = {
	setupHasComeDirect
};
