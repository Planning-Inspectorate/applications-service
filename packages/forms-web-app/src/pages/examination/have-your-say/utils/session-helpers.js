const setBaseSessionData = (
	session,
	case_ref,
	{ ProjectName, PromoterName, ProjectEmailAddress }
) => {
	session.caseRef = case_ref;
	session.projectName = ProjectName;
	session.promoterName = PromoterName;
	session.projectEmailAddress = ProjectEmailAddress;
};

const setExaminationData = (session, caseRef, deadlineItems, { id, title }) => {
	session.examination = {
		...session.examination,
		caseRef,
		deadlineItems,
		id,
		title
	};
};

module.exports = {
	setExaminationData,
	setBaseSessionData
};
