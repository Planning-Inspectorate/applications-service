const { titleCase } = require('../../../../../utils/string-case');
const { getRepresentationURL } = require('../../representation/_utils/get-representation-url');
const { formatDateSubmitted } = require('./format-date-submitted');

const getRepresentationViewModel = (
	{
		Attachments,
		attachments,
		DateRrepReceived,
		ID,
		PersonalName,
		RepFrom,
		RepresentationRedacted,
		Representative
	},
	caseRef
) => ({
	Attachments,
	attachments,
	dateSubmitted: formatDateSubmitted(DateRrepReceived),
	comment: RepresentationRedacted,
	name: PersonalName,
	representative: Representative,
	submittedBy: titleCase(RepFrom),
	URL: getRepresentationURL(caseRef, ID)
});

const getRepresentationsViewModel = (representations, caseRef) =>
	representations.map((representation) => getRepresentationViewModel(representation, caseRef));

module.exports = { getRepresentationsViewModel, getRepresentationViewModel };
