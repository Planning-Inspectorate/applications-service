const { getSummaryListApplicant } = require('./applicant');
const { getSummaryListItemHasInterestedPartyNumber } = require('./has-interested-party-number');
const { getSummaryListItemInterestedPartyNumber } = require('./interested-party-number');
const { getSummaryListItemSubmittingFor } = require('./submitting-for');
const { getSummaryListName } = require('./name');
const { getSummaryListItemEmail } = require('./email');
const { getSummaryListItemSubmissionItems } = require('./submission-items');

module.exports = {
	getSummaryListApplicant,
	getSummaryListItemHasInterestedPartyNumber,
	getSummaryListItemInterestedPartyNumber,
	getSummaryListItemSubmittingFor,
	getSummaryListName,
	getSummaryListItemEmail,
	getSummaryListItemSubmissionItems
};
