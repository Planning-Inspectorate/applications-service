const getSummaryListItemWithHtml = (keyText, valueText, actionItemHtml) => {
	const summaryListItem = {
		key: {
			text: keyText
		},
		value: {
			html: valueText
		}
	};

	if (actionItemHtml) {
		summaryListItem.actions = {
			items: [
				{
					html: actionItemHtml
				}
			]
		};
	}

	return summaryListItem;
};

module.exports = { getSummaryListItemWithHtml };
