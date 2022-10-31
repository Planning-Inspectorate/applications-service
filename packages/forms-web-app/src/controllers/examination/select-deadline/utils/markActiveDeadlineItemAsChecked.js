const markActiveDeadlineItemAsChecked = (deadlineItems, activeDeadlineId) =>
	deadlineItems.map((selectDeadlineValue) => {
		const valueChecked = selectDeadlineValue.value === activeDeadlineId;

		if (!valueChecked) return selectDeadlineValue;

		return {
			...selectDeadlineValue,
			checked: 'checked'
		};
	});

module.exports = {
	markActiveDeadlineItemAsChecked
};
