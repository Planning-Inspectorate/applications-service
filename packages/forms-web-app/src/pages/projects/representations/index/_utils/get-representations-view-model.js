const { marked } = require('marked');
const { titleCase } = require('../../../../../utils/string-case');
const { getRepresentationURL } = require('../../representation/_utils/get-representation-url');
const { formatDateSubmitted } = require('./format-date-submitted');

const getFormattedComment = (comment) => (comment ? marked.parse(comment).trim() : '');

const getRepresentationViewModel = (
	{
		Attachments,
		attachments,
		DateRrepReceived,
		ID,
		PersonalName,
		RepFrom,
		RepFromWelsh,
		RepresentationRedacted,
		Representative
	},
	caseRef
) => ({
	attachments,
	hasAttachments: (attachments && attachments.length) || !!Attachments,
	dateSubmitted: formatDateSubmitted(DateRrepReceived),
	comment: RepresentationRedacted,
	formattedComment: getFormattedComment(RepresentationRedacted),
	name: PersonalName,
	representative: Representative,
	submittedBy: titleCase(RepFrom),
	submittedByWelsh: titleCase(RepFromWelsh),
	URL: getRepresentationURL(caseRef, ID)
});

const getRepresentationsViewModel = (representations, caseRef) =>
	representations.map((representation) => getRepresentationViewModel(representation, caseRef));

module.exports = { getRepresentationsViewModel, getRepresentationViewModel };
