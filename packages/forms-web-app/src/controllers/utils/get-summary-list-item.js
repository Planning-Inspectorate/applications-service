const getSummaryListItem = (i18n, keyText, valueText, actionItemHref) => {
	const summaryListItem = {
		key: {
			text: keyText
		},
		value: {
			html: valueText
		}
	};

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
