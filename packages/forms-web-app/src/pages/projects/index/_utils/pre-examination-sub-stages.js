const dayjs = require('dayjs');
const { isRegistrationOpen } = require('../../register/index/_utils/is-registration-open');
const {
	featureFlag: { openRegistrationCaseReferences }
} = require('../../../../config');

function getPreExaminationSubStage(openDate, closedDate, websiteDate, rule6 = false, caseRef) {
	const dayToday = dayjs();
	const dayOpenDate = dayjs(openDate);
	const dayClosedDate = dayjs(closedDate);
	const dayWebsiteDate = dayjs(websiteDate);

	const subStages = {
		PRE_REPS: false,
		OPEN_REPS: false,
		CLOSED_REPS: false,
		PUBLISHED_REPS: false,
		RULE_6_PUBLISHED_REPS: false
	};

	if (dayToday.isBefore(dayOpenDate) || openDate === null) subStages.PRE_REPS = true;
	else if (
		isRegistrationOpen(openDate, closedDate, caseRef) &&
		!openRegistrationCaseReferences.includes(caseRef)
	)
		subStages.OPEN_REPS = true;
	else if (
		dayToday.isAfter(dayClosedDate) &&
		(dayToday.isBefore(dayWebsiteDate) || websiteDate === null)
	)
		subStages.CLOSED_REPS = true;
	else if (rule6) {
		if (dayToday.isAfter(dayWebsiteDate) && rule6) subStages.RULE_6_PUBLISHED_REPS = true;
	} else {
		if (dayToday.isAfter(dayWebsiteDate)) subStages.PUBLISHED_REPS = true;
	}

	return subStages;
}

module.exports = {
	getPreExaminationSubStage
};
