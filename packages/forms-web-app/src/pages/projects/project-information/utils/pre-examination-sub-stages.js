const dayjs = require('dayjs');

function getPreExaminationSubStage(openDate, closedDate, websiteDate, rule6 = false) {
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

	if (dayToday.isAfter(dayOpenDate) && (dayToday.isBefore(dayClosedDate) || closedDate === null))
		subStages.OPEN_REPS = true;

	if (dayToday.isAfter(dayClosedDate) && dayToday.isBefore(dayWebsiteDate))
		subStages.CLOSED_REPS = true;

	if (rule6) {
		if (dayToday.isAfter(dayWebsiteDate) && rule6) subStages.RULE_6_PUBLISHED_REPS = true;
	} else {
		if (dayToday.isAfter(dayWebsiteDate)) subStages.PUBLISHED_REPS = true;
	}

	return subStages;
}

module.exports = {
	getPreExaminationSubStage
};
