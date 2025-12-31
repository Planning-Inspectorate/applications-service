const mapStateManager = require('./map-state-manager');

module.exports = class ToggleFilters {
	initiate(btnId, sidebarId, contentId) {
		const btn = document.getElementById(btnId.replace('#', ''));
		const sidebar = document.getElementById(sidebarId.replace('#', ''));
		const content = document.getElementById(contentId.replace('#', ''));

		if (!btn || !sidebar || !content) return;

		const showFiltersText = btn.getAttribute('data-show-filters-button-label');
		const hideFiltersText = btn.getAttribute('data-hide-filters-button-label');

		btn.addEventListener('click', () => {
			sidebar.classList.toggle('govuk-!-display-none');
			content.classList.toggle('govuk-grid-column-full');
			content.classList.toggle('govuk-grid-column-two-thirds');
			setTimeout(() => {
				const map = mapStateManager.getMap();
				if (map) {
					map.invalidateSize();
				}
			}, 100);
			btn.textContent = sidebar.classList.contains('govuk-!-display-none')
				? showFiltersText
				: hideFiltersText;
		});
	}
};
