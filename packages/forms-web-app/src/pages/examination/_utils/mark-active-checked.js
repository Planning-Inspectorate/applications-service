const markActiveChecked = (items, activeItem) =>
	items.map((item) => {
		if (item.value !== activeItem) return item;

		return {
			...item,
			checked: 'checked'
		};
	});

module.exports = {
	markActiveChecked
};
