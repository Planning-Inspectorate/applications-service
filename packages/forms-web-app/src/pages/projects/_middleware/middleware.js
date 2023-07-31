const { getApplicationData } = require('../documents/utils/get-application-data');
const { getVerticalTabs } = require('./_utils/get-vertical-tabs');
const logger = require('../../../lib/logger');
const { getHasOpenTimetables } = require('../../../utils/timetables/get-timetables-state');
const { areEventsEligibleForDisplay } = require('../examination-timetable/utils/events/get-events');

async function middleware(req, res, next) {
	try {
		const { params, baseUrl, path } = req;
		const { case_ref } = params;
		const { projectName, dateOfNonAcceptance, proposal, summary, webAddress } =
			await getApplicationData(case_ref);
		const hasOpenTimetables = await getHasOpenTimetables(case_ref);
		const eventsEligibleForDisplay = areEventsEligibleForDisplay(dateOfNonAcceptance);

		res.locals.projectName = projectName;
		res.locals.caseRef = case_ref;
		res.locals.summary = summary;
		res.locals.webAddress = webAddress;
		res.locals.proposal = proposal;
		res.locals.baseUrl = baseUrl;
		res.locals.path = path;
		res.locals.hasOpenTimetables = hasOpenTimetables;
		res.locals.verticalTabs = getVerticalTabs(
			projectName,
			case_ref,
			hasOpenTimetables,
			eventsEligibleForDisplay
		);
		next();
	} catch (e) {
		logger.error(e);
		next(e);
	}
}

module.exports = {
	middleware
};
