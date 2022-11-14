const getSummaryListItem = (keyText, valueText, actionItemHref) => {
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
					text: 'Change',
					visuallyHiddenText: keyText
				}
			]
		};
	}

	return summaryListItem;
};

module.exports = { getSummaryListItem };
