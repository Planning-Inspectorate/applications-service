const { marked } = require('marked');
const { titleCase } = require('../../../../../utils/string-case');
const { getRepresentationURL } = require('../../representation/_utils/get-representation-url');
const { formatDate } = require('../../../../../utils/date-utils');

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
	language,
	caseRef
) => ({
	attachments,
	hasAttachments: (attachments && attachments.length) || !!Attachments,
	dateSubmitted: formatDate(DateRrepReceived, language),
	comment: RepresentationRedacted,
	formattedComment: getFormattedComment(RepresentationRedacted),
	name: PersonalName,
	representative: Representative,
	submittedBy: titleCase(RepFrom),
	submittedByWelsh: titleCase(RepFromWelsh),
	URL: getRepresentationURL(caseRef, ID)
});

const getRepresentationsViewModel = (representations, language, caseRef) =>
	representations.map((representation) =>
		getRepresentationViewModel(representation, language, caseRef)
	);

module.exports = { getRepresentationsViewModel, getRepresentationViewModel };
