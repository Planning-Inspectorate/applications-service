const { getSummaryListItem } = require('../../../../../../controllers/utils/get-summary-list-item');
const { getPersonalInformationWhichName } = require('./get-name');
const { getPersonalInformationWhichUrl } = require('./get-url');
const { getPersonalInformationWhichValue } = require('./get-value');

const getSummaryListItemPersonalInformationWhich = (submissionItem) =>
	getSummaryListItem(
		getPersonalInformationWhichName(submissionItem),
		getPersonalInformationWhichValue(submissionItem),
		getPersonalInformationWhichUrl(submissionItem)
	);

module.exports = { getSummaryListItemPersonalInformationWhich };
