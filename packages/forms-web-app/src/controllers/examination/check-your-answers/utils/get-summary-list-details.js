const {
	getUserHasInterestedPartyNumber,
	getUserApplicant
} = require('../../session/deadline/helpers');
const {
	getSummaryListItemHasInterestedPartyNumber,
	getSummaryListItemInterestedPartyNumber,
	getSummaryListItemSubmittingFor,
	getSummaryListApplicant,
	getSummaryListName,
	getSummaryListItemEmail
} = require('./summary-list-item');

const getSummaryListDetails = (session) => {
	const summaryListDetails = [];
	const userHasInterestedPartyNumber = getUserHasInterestedPartyNumber(session);
	const isUserApplicant = getUserApplicant(session);

	summaryListDetails.push(getSummaryListItemHasInterestedPartyNumber(session));
	if (userHasInterestedPartyNumber)
		summaryListDetails.push(getSummaryListItemInterestedPartyNumber(session));
	if (!isUserApplicant) summaryListDetails.push(getSummaryListItemSubmittingFor(session));
	if (isUserApplicant) summaryListDetails.push(getSummaryListApplicant(session));
	if (!isUserApplicant) summaryListDetails.push(getSummaryListName(session));
	summaryListDetails.push(getSummaryListItemEmail(session));

	return summaryListDetails;
};

module.exports = { getSummaryListDetails };
