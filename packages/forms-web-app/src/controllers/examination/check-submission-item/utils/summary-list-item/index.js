const { getSummaryListItemEnterComment } = require('./enter-comment');
const { getSummaryListItemEvidenceOrComment } = require('./evidence-or-comment');
const { getSummaryListItemSelectFile } = require('./select-file');
const { getSummaryListItemPersonalInformation } = require('./personal-information');
const {
	getSummaryListItemPersonalInformationWhich
} = require('./personal-information-which/index');
const { getSummaryListItemSubmissionItem } = require('./submission-item');

module.exports = {
	getSummaryListItemEnterComment,
	getSummaryListItemEvidenceOrComment,
	getSummaryListItemSelectFile,
	getSummaryListItemPersonalInformation,
	getSummaryListItemPersonalInformationWhich,
	getSummaryListItemSubmissionItem
};
