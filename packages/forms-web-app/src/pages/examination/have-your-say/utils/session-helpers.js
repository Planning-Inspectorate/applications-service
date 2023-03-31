const setBaseSessionData = (
	session,
	case_ref,
	{ ProjectName, PromoterName, ProjectEmailAddress }
) => {
	session.caseRef = case_ref;
	session.projectName = ProjectName;
	session.promoterName = PromoterName;
	session.ProjectEmailAddress = ProjectEmailAddress;
};

module.exports = { setBaseSessionData };
