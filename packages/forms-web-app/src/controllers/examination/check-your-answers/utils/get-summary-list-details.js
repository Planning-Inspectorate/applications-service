const {
	getUserHasInterestedPartyNumber,
	getUserIsApplicant
} = require('../../../session/deadline/helpers');
const {
	getSummaryListItemHasInterestedPartyNumber,
	getSummaryListItemInterestedPartyNumber,
	getSummaryListItemSubmittingFor,
	getSummaryListIsApplicant,
	getSummaryListName,
	getSummaryListItemEmail
} = require('./summary-list-item');

const getSummaryListDetails = (session) => {
	const summaryListDetails = [];
	const userHasInterestedPartyNumber = getUserHasInterestedPartyNumber(session);
	const userIsApplicant = getUserIsApplicant(session);

	summaryListDetails.push(getSummaryListItemHasInterestedPartyNumber(session));
	if (userHasInterestedPartyNumber)
		summaryListDetails.push(getSummaryListItemInterestedPartyNumber(session));
	if (!userIsApplicant) summaryListDetails.push(getSummaryListItemSubmittingFor(session));
	if (userIsApplicant) summaryListDetails.push(getSummaryListIsApplicant(session));
	if (!userIsApplicant) summaryListDetails.push(getSummaryListName(session));
	summaryListDetails.push(getSummaryListItemEmail(session));

	return { summaryListDetails };
};

module.exports = { getSummaryListDetails };
