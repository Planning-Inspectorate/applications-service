const {
	getSummaryListItemWithLink
} = require('../../../../../utils/get-summary-list-item-with-link');
const { getPersonalInformationWhichName } = require('./get-name');
const { getPersonalInformationWhichUrl } = require('./get-url');
const { getPersonalInformationWhichValue } = require('./get-value');

const getSummaryListItemPersonalInformationWhich = (submissionItem) =>
	getSummaryListItemWithLink(
		getPersonalInformationWhichName(submissionItem),
		getPersonalInformationWhichValue(submissionItem),
		getPersonalInformationWhichUrl(submissionItem)
	);

module.exports = { getSummaryListItemPersonalInformationWhich };
