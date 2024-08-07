const { getSummaryListItem } = require('../../../../../../controllers/utils/get-summary-list-item');
const { getPersonalInformationWhichName } = require('./get-name');
const { getPersonalInformationWhichUrl } = require('./get-url');
const { getPersonalInformationWhichValue } = require('./get-value');

const getSummaryListItemPersonalInformationWhich = (i18n, submissionItem) =>
	getSummaryListItem(
		i18n,
		getPersonalInformationWhichName(i18n, submissionItem),
		getPersonalInformationWhichValue(i18n, submissionItem),
		getPersonalInformationWhichUrl(submissionItem)
	);

module.exports = { getSummaryListItemPersonalInformationWhich };
