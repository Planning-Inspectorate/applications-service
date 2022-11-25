const { getSummaryListIsApplicant } = require('./is-applicant');
const { getSummaryListItemHasInterestedPartyNumber } = require('./has-interested-party-number');
const { getSummaryListItemInterestedPartyNumber } = require('./interested-party-number');
const { getSummaryListItemSubmittingFor } = require('./submitting-for');
const { getSummaryListName } = require('./name');
const { getSummaryListItemEmail } = require('./email');
const { getSummaryListItemSubmissionItems } = require('./submission-items');

module.exports = {
	getSummaryListIsApplicant,
	getSummaryListItemHasInterestedPartyNumber,
	getSummaryListItemInterestedPartyNumber,
	getSummaryListItemSubmittingFor,
	getSummaryListName,
	getSummaryListItemEmail,
	getSummaryListItemSubmissionItems
};
