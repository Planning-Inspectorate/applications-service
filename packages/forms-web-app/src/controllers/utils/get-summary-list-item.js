const translationEn = require('../../pages/examination/_translations/en.json');
const translationCy = require('../../pages/examination/_translations/cy.json');

const getSummaryListItem = (i18n, keyText, valueText, actionItemHref) => {
	const summaryListItem = {
		key: {
			text: keyText
		},
		value: {
			text: valueText
		}
	};
	//if heading is 'Documents uploaded'
	const isDocumentsUploadRow =
		keyText === translationEn.checkSubmissionItem.summaryListHeading3 ||
		keyText === translationCy.checkSubmissionItem.summaryListHeading3;

	// exception for 'Documents uploaded' row which returns ul
	if (isDocumentsUploadRow) {
		summaryListItem.value.html = valueText;
		delete summaryListItem.value.text;
	}
	if (actionItemHref) {
		summaryListItem.actions = {
			items: [
				{
					href: actionItemHref,
					text: i18n.t('common.change'),
					visuallyHiddenText: keyText
				}
			]
		};
	}

	return summaryListItem;
};

module.exports = { getSummaryListItem };
