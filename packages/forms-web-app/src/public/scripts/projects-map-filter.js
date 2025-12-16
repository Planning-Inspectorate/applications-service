/**
 * Projects map filter toggle functionality
 */
(function () {
	const toggleBtn = document.getElementById('toggle-filter-btn');
	const filterPanel = document.getElementById('filter-panel');
	const mapPanel = document.getElementById('map-panel');

	if (!toggleBtn || !filterPanel || !mapPanel) return;

	let filterVisible = false;

	function toggleFilter() {
		filterVisible = !filterVisible;

		if (filterVisible) {
			// Show filters
			filterPanel.classList.remove('govuk-!-display-none');
			mapPanel.classList.remove('govuk-grid-column-full');
			mapPanel.classList.add('govuk-grid-column-two-thirds');
			toggleBtn.textContent = 'Hide Filters';
		} else {
			// Hide filters
			filterPanel.classList.add('govuk-!-display-none');
			mapPanel.classList.remove('govuk-grid-column-two-thirds');
			mapPanel.classList.add('govuk-grid-column-full');
			toggleBtn.textContent = 'Show Filters';
		}

		// Trigger map resize after layout change
		setTimeout(() => {
			if (window.leafletMapInstance) {
				window.leafletMapInstance.invalidateSize();
			}
		}, 100);
	}

	toggleBtn.addEventListener('click', function (e) {
		e.preventDefault();
		toggleFilter();
	});
})();
