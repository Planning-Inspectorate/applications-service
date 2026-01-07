/**
 * SidebarToggler - Generic sidebar toggle handler with optional callbacks
 *
 * Provides reusable sidebar toggle functionality for any UI element.
 * Supports callbacks/hooks on toggle for custom behavior (e.g., map resize).
 * All configuration pulled from HTML data attributes for maximum flexibility.
 *
 * Usage:
 * 1. Add button with data attributes:
 *    <button id="toggle-btn"
 *            data-sidebar-toggle="#sidebar"
 *            data-content-toggle="#content"
 *            data-toggle-class="govuk-!-display-none"
 *            data-content-hidden-class="govuk-grid-column-full"
 *            data-content-visible-class="govuk-grid-column-two-thirds"
 *            data-show-label="Show Sidebar"
 *            data-hide-label="Hide Sidebar"
 *            data-on-toggle="myCallback">
 *      Toggle
 *    </button>
 *
 * 2. Initialize anywhere:
 *    new SidebarToggler('#toggle-btn').initiate();
 *
 * 3. Register callbacks on window:
 *    window.myCallback = function(state) {
 *      // state: {sidebar, content, isHidden}
 *      console.log('Sidebar is hidden:', state.isHidden);
 *    };
 *
 * @class SidebarToggler
 */
class SidebarToggler {
	/**
	 * Create SidebarToggler instance
	 *
	 * @param {string} btnId - Button element ID or selector (with or without #)
	 * @param {Object} [options] - Default fallback options (overridden by button data attributes)
	 * @param {string} [options.toggleClass='govuk-!-display-none'] - Default CSS class for hiding sidebar
	 * @param {string} [options.contentHiddenClass='govuk-grid-column-full'] - Default CSS class when sidebar hidden
	 * @param {string} [options.contentVisibleClass='govuk-grid-column-two-thirds'] - Default CSS class when sidebar visible
	 */
	constructor(btnId, options = {}) {
		this.btnId = btnId.replace('#', '');
		this.defaultOptions = {
			toggleClass: 'govuk-!-display-none',
			contentHiddenClass: 'govuk-grid-column-full',
			contentVisibleClass: 'govuk-grid-column-two-thirds',
			...options
		};
	}

	/**
	 * Initialize sidebar toggle
	 *
	 * Reads all configuration from button data attributes:
	 * - data-sidebar-toggle: Sidebar element ID/selector
	 * - data-content-toggle: Content element ID/selector
	 * - data-toggle-class: CSS class to toggle on sidebar (default: govuk-!-display-none)
	 * - data-content-hidden-class: CSS class on content when hidden (default: govuk-grid-column-full)
	 * - data-content-visible-class: CSS class on content when visible (default: govuk-grid-column-two-thirds)
	 * - data-show-label: Text when sidebar is hidden
	 * - data-hide-label: Text when sidebar is visible
	 * - data-on-toggle: Callback function name on window
	 *
	 * @returns {Promise<void>} Resolves when initialization complete
	 */
	initiate() {
		return new Promise((resolve, reject) => {
			try {
				const btn = document.getElementById(this.btnId);
				if (!btn) {
					resolve();
					return;
				}

				const sidebarSelector = btn.getAttribute('data-sidebar-toggle');
				const contentSelector = btn.getAttribute('data-content-toggle');
				const showLabel = btn.getAttribute('data-show-label') || 'Show';
				const hideLabel = btn.getAttribute('data-hide-label') || 'Hide';
				const callbackName = btn.getAttribute('data-on-toggle');

				const sidebar = this.getElement(sidebarSelector);
				const content = this.getElement(contentSelector);

				if (!sidebar || !content) {
					resolve();
					return;
				}

				// Read CSS classes from button data attributes with fallback to defaults
				const config = {
					toggleClass: btn.getAttribute('data-toggle-class') || this.defaultOptions.toggleClass,
					contentHiddenClass:
						btn.getAttribute('data-content-hidden-class') || this.defaultOptions.contentHiddenClass,
					contentVisibleClass:
						btn.getAttribute('data-content-visible-class') ||
						this.defaultOptions.contentVisibleClass
				};

				btn.addEventListener('click', () => {
					this.toggle(btn, sidebar, content, config, showLabel, hideLabel, callbackName);
				});

				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * Get element by ID or selector
	 *
	 * @param {string} selector - Element ID (with or without #) or CSS selector
	 * @returns {Element|null} DOM element or null if not found
	 */
	getElement(selector) {
		if (!selector) return null;

		const id = selector.replace('#', '');
		return document.getElementById(id) || document.querySelector(selector);
	}

	/**
	 * Toggle sidebar visibility
	 *
	 * @param {HTMLElement} btn - Toggle button element
	 * @param {HTMLElement} sidebar - Sidebar element
	 * @param {HTMLElement} content - Content element
	 * @param {Object} config - CSS class configuration
	 * @param {string} config.toggleClass - CSS class to toggle on sidebar
	 * @param {string} config.contentHiddenClass - CSS class when sidebar hidden
	 * @param {string} config.contentVisibleClass - CSS class when sidebar visible
	 * @param {string} showLabel - Label text when hidden
	 * @param {string} hideLabel - Label text when visible
	 * @param {string} [callbackName] - Callback function name on window
	 */
	toggle(btn, sidebar, content, config, showLabel, hideLabel, callbackName) {
		sidebar.classList.toggle(config.toggleClass);
		content.classList.toggle(config.contentHiddenClass);
		content.classList.toggle(config.contentVisibleClass);

		const isHidden = sidebar.classList.contains(config.toggleClass);

		btn.textContent = isHidden ? showLabel : hideLabel;

		if (callbackName) {
			this.executeCallback(callbackName, { sidebar, content, isHidden });
		}
	}

	/**
	 * Execute callback function if defined on window
	 * Supports both direct callbacks (window.myCallback) and namespaced (_applicationService.onToggle)
	 *
	 * @param {string} callbackName - Function name/path on window object (e.g., 'myCallback' or '_applicationService.onSidebarToggle')
	 * @param {Object} state - State object to pass to callback
	 * @param {HTMLElement} state.sidebar - Sidebar element
	 * @param {HTMLElement} state.content - Content element
	 * @param {boolean} state.isHidden - Whether sidebar is now hidden
	 */
	executeCallback(callbackName, state) {
		try {
			const callback = this.resolveCallback(callbackName);
			if (typeof callback === 'function') {
				callback(state);
			}
		} catch (error) {
			console.error(`Error executing callback ${callbackName}:`, error);
		}
	}

	/**
	 * Resolve callback from window object supporting dot notation
	 * Examples: 'myCallback', '_applicationService.onToggle', 'app.callbacks.toggle'
	 *
	 * @param {string} path - Path to callback function
	 * @returns {Function|null} Callback function or null if not found
	 */
	resolveCallback(path) {
		const parts = path.split('.');
		let obj = window;

		for (const part of parts) {
			if (obj && typeof obj === 'object' && part in obj) {
				obj = obj[part];
			} else {
				return null;
			}
		}

		return obj;
	}
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
	module.exports = SidebarToggler;
}

if (typeof window !== 'undefined') {
	window.SidebarToggler = SidebarToggler;
}
