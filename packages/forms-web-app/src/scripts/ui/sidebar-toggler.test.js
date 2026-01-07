/**
 * @jest-environment jsdom
 */

const SidebarToggler = require('./sidebar-toggler');

describe('scripts/ui/sidebar-toggler', () => {
	let toggleBtn;
	let sidebar;
	let content;

	beforeEach(() => {
		// Setup DOM structure
		document.body.innerHTML = `<button id="toggle-btn" data-sidebar-toggle="#sidebar" data-content-toggle="#content" data-toggle-class="govuk-!-display-none" data-content-hidden-class="govuk-grid-column-full" data-content-visible-class="govuk-grid-column-two-thirds" data-show-label="Show Sidebar" data-hide-label="Hide Sidebar">Toggle</button><div id="sidebar"></div><div id="content" class="govuk-grid-column-two-thirds"></div>`;

		toggleBtn = document.getElementById('toggle-btn');
		sidebar = document.getElementById('sidebar');
		content = document.getElementById('content');
	});

	afterEach(() => {
		document.body.innerHTML = '';
		jest.clearAllMocks();
	});

	describe('Constructor', () => {
		it('initializes with button ID and removes leading hash', () => {
			const toggler1 = new SidebarToggler('#my-btn');
			expect(toggler1.btnId).toBe('my-btn');

			const toggler2 = new SidebarToggler('my-btn');
			expect(toggler2.btnId).toBe('my-btn');
		});

		it('sets default options from constructor', () => {
			const toggler = new SidebarToggler('#btn', {
				toggleClass: 'custom-hide',
				contentHiddenClass: 'custom-full'
			});

			expect(toggler.defaultOptions.toggleClass).toBe('custom-hide');
			expect(toggler.defaultOptions.contentHiddenClass).toBe('custom-full');
			expect(toggler.defaultOptions.contentVisibleClass).toBe('govuk-grid-column-two-thirds');
		});

		it('applies default options when not provided', () => {
			const toggler = new SidebarToggler('#btn');

			expect(toggler.defaultOptions.toggleClass).toBe('govuk-!-display-none');
			expect(toggler.defaultOptions.contentHiddenClass).toBe('govuk-grid-column-full');
			expect(toggler.defaultOptions.contentVisibleClass).toBe('govuk-grid-column-two-thirds');
		});
	});

	describe('initiate()', () => {
		it('initializes and resolves successfully when all elements found', async () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const result = await toggler.initiate();

			expect(result).toBeUndefined();
		});

		it('resolves when button element not found', async () => {
			const toggler = new SidebarToggler('#non-existent-btn');
			const result = await toggler.initiate();

			expect(result).toBeUndefined();
		});

		it('resolves when sidebar element not found', async () => {
			toggleBtn.setAttribute('data-sidebar-toggle', '#non-existent');
			const toggler = new SidebarToggler('#toggle-btn');
			const result = await toggler.initiate();

			expect(result).toBeUndefined();
		});

		it('resolves when content element not found', async () => {
			toggleBtn.setAttribute('data-content-toggle', '#non-existent');
			const toggler = new SidebarToggler('#toggle-btn');
			const result = await toggler.initiate();

			expect(result).toBeUndefined();
		});

		it('adds click listener to button after initialization', async () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const toggleSpy = jest.spyOn(toggler, 'toggle');

			await toggler.initiate();
			toggleBtn.click();

			expect(toggleSpy).toHaveBeenCalled();
		});

		it('rejects on error during initialization', async () => {
			const toggler = new SidebarToggler('#toggle-btn');
			jest.spyOn(document, 'getElementById').mockImplementationOnce(() => {
				throw new Error('DOM error');
			});

			await expect(toggler.initiate()).rejects.toThrow('DOM error');
		});

		it('reads data attributes from button', async () => {
			toggleBtn.setAttribute('data-show-label', 'Custom Show');
			toggleBtn.setAttribute('data-hide-label', 'Custom Hide');
			toggleBtn.setAttribute('data-toggle-class', 'custom-toggle');

			const toggler = new SidebarToggler('#toggle-btn');
			const toggleSpy = jest.spyOn(toggler, 'toggle');

			await toggler.initiate();
			toggleBtn.click();

			expect(toggleSpy).toHaveBeenCalledWith(
				toggleBtn,
				sidebar,
				content,
				expect.objectContaining({
					toggleClass: 'custom-toggle'
				}),
				'Custom Show',
				'Custom Hide',
				null
			);
		});

		it('uses default labels when data attributes missing', async () => {
			toggleBtn.removeAttribute('data-show-label');
			toggleBtn.removeAttribute('data-hide-label');

			const toggler = new SidebarToggler('#toggle-btn');
			const toggleSpy = jest.spyOn(toggler, 'toggle');

			await toggler.initiate();
			toggleBtn.click();

			expect(toggleSpy).toHaveBeenCalledWith(
				toggleBtn,
				sidebar,
				content,
				expect.anything(),
				'Show',
				'Hide',
				null
			);
		});
	});

	describe('getElement()', () => {
		it('retrieves element by ID with hash', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const element = toggler.getElement('#sidebar');

			expect(element).toBe(sidebar);
		});

		it('retrieves element by ID without hash', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const element = toggler.getElement('sidebar');

			expect(element).toBe(sidebar);
		});

		it('retrieves element by CSS selector', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const element = toggler.getElement('div#content');

			expect(element).toBe(content);
		});

		it('returns null for non-existent element', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const element = toggler.getElement('#non-existent');

			expect(element).toBeNull();
		});

		it('returns null for null selector', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const element = toggler.getElement(null);

			expect(element).toBeNull();
		});

		it('returns null for empty selector', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const element = toggler.getElement('');

			expect(element).toBeNull();
		});
	});

	describe('toggle()', () => {
		it('toggles sidebar visibility class', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const config = { toggleClass: 'govuk-!-display-none' };

			expect(sidebar.classList.contains('govuk-!-display-none')).toBe(false);

			toggler.toggle(toggleBtn, sidebar, content, config, 'Show', 'Hide');

			expect(sidebar.classList.contains('govuk-!-display-none')).toBe(true);

			toggler.toggle(toggleBtn, sidebar, content, config, 'Show', 'Hide');

			expect(sidebar.classList.contains('govuk-!-display-none')).toBe(false);
		});

		it('toggles content classes when sidebar hidden', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const config = {
				toggleClass: 'govuk-!-display-none',
				contentHiddenClass: 'govuk-grid-column-full',
				contentVisibleClass: 'govuk-grid-column-two-thirds'
			};

			expect(content.classList.contains('govuk-grid-column-full')).toBe(false);
			expect(content.classList.contains('govuk-grid-column-two-thirds')).toBe(true);

			toggler.toggle(toggleBtn, sidebar, content, config, 'Show', 'Hide');

			expect(content.classList.contains('govuk-grid-column-full')).toBe(true);
			expect(content.classList.contains('govuk-grid-column-two-thirds')).toBe(false);
		});

		it('updates button label based on sidebar state', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const config = { toggleClass: 'govuk-!-display-none' };

			expect(toggleBtn.textContent).toBe('Toggle');

			toggler.toggle(toggleBtn, sidebar, content, config, 'Show', 'Hide');

			expect(toggleBtn.textContent).toBe('Show');

			toggler.toggle(toggleBtn, sidebar, content, config, 'Show', 'Hide');

			expect(toggleBtn.textContent).toBe('Hide');
		});

		it('invokes callback with correct state when provided', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const config = { toggleClass: 'govuk-!-display-none' };
			const callbackSpy = jest.spyOn(toggler, 'executeCallback');

			toggler.toggle(toggleBtn, sidebar, content, config, 'Show', 'Hide', 'myCallback');

			expect(callbackSpy).toHaveBeenCalledWith('myCallback', {
				sidebar,
				content,
				isHidden: true
			});
		});

		it('does not invoke callback when callback name not provided', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const config = { toggleClass: 'govuk-!-display-none' };
			const callbackSpy = jest.spyOn(toggler, 'executeCallback');

			toggler.toggle(toggleBtn, sidebar, content, config, 'Show', 'Hide');

			expect(callbackSpy).not.toHaveBeenCalled();
		});
	});

	describe('executeCallback()', () => {
		it('executes callback function when found on window', () => {
			const callback = jest.fn();
			window.testCallback = callback;

			const toggler = new SidebarToggler('#toggle-btn');
			const state = { sidebar, content, isHidden: true };

			toggler.executeCallback('testCallback', state);

			expect(callback).toHaveBeenCalledWith(state);
		});

		it('handles callbacks on namespaced objects', () => {
			const callback = jest.fn();
			window._applicationService = { onToggle: callback };

			const toggler = new SidebarToggler('#toggle-btn');
			const state = { sidebar, content, isHidden: true };

			toggler.executeCallback('_applicationService.onToggle', state);

			expect(callback).toHaveBeenCalledWith(state);
		});

		it('handles deeply nested callback paths', () => {
			const callback = jest.fn();
			window.app = { handlers: { sidebar: { toggle: callback } } };

			const toggler = new SidebarToggler('#toggle-btn');
			const state = { sidebar, content, isHidden: true };

			toggler.executeCallback('app.handlers.sidebar.toggle', state);

			expect(callback).toHaveBeenCalledWith(state);
		});

		it('silently fails when callback not found', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const state = { sidebar, content, isHidden: true };

			// Should not throw
			expect(() => {
				toggler.executeCallback('nonExistent', state);
			}).not.toThrow();
		});

		it('silently fails when callback is not a function', () => {
			window.notAFunction = 'string';

			const toggler = new SidebarToggler('#toggle-btn');
			const state = { sidebar, content, isHidden: true };

			// Should not throw
			expect(() => {
				toggler.executeCallback('notAFunction', state);
			}).not.toThrow();
		});

		it('logs error when callback execution throws', () => {
			const error = new Error('Callback error');
			window.throwingCallback = jest.fn(() => {
				throw error;
			});
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

			const toggler = new SidebarToggler('#toggle-btn');
			const state = { sidebar, content, isHidden: true };

			toggler.executeCallback('throwingCallback', state);

			expect(consoleSpy).toHaveBeenCalledWith('Error executing callback throwingCallback:', error);

			consoleSpy.mockRestore();
		});
	});

	describe('resolveCallback()', () => {
		it('resolves direct window properties', () => {
			window.myFunc = () => 'test';

			const toggler = new SidebarToggler('#toggle-btn');
			const callback = toggler.resolveCallback('myFunc');

			expect(callback).toBe(window.myFunc);
		});

		it('resolves single-level namespaced properties', () => {
			window.ns = { func: () => 'test' };

			const toggler = new SidebarToggler('#toggle-btn');
			const callback = toggler.resolveCallback('ns.func');

			expect(callback).toBe(window.ns.func);
		});

		it('resolves multi-level namespaced properties', () => {
			window.app = { api: { handlers: { toggle: () => 'test' } } };

			const toggler = new SidebarToggler('#toggle-btn');
			const callback = toggler.resolveCallback('app.api.handlers.toggle');

			expect(callback).toBe(window.app.api.handlers.toggle);
		});

		it('returns null when intermediate path does not exist', () => {
			window.app = { api: null };

			const toggler = new SidebarToggler('#toggle-btn');
			const callback = toggler.resolveCallback('app.api.handlers.toggle');

			expect(callback).toBeNull();
		});

		it('returns null when property not found', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const callback = toggler.resolveCallback('nonExistent');

			expect(callback).toBeNull();
		});

		it('returns null when path is empty', () => {
			const toggler = new SidebarToggler('#toggle-btn');
			const callback = toggler.resolveCallback('');

			expect(callback).toBeNull();
		});
	});

	describe('Full Integration', () => {
		it('completes full toggle workflow with callback', async () => {
			const mockCallback = jest.fn();
			window.onSidebarToggle = mockCallback;

			toggleBtn.setAttribute('data-on-toggle', 'onSidebarToggle');

			const toggler = new SidebarToggler('#toggle-btn');
			await toggler.initiate();

			// Initial state
			expect(sidebar.classList.contains('govuk-!-display-none')).toBe(false);
			expect(content.classList.contains('govuk-grid-column-two-thirds')).toBe(true);

			// Toggle (hide sidebar)
			toggleBtn.click();

			expect(sidebar.classList.contains('govuk-!-display-none')).toBe(true);
			expect(content.classList.contains('govuk-grid-column-full')).toBe(true);
			expect(toggleBtn.textContent).toBe('Show Sidebar');
			expect(mockCallback).toHaveBeenCalledWith(
				expect.objectContaining({
					isHidden: true
				})
			);

			// Toggle again (show sidebar)
			toggleBtn.click();

			expect(sidebar.classList.contains('govuk-!-display-none')).toBe(false);
			expect(content.classList.contains('govuk-grid-column-two-thirds')).toBe(true);
			expect(toggleBtn.textContent).toBe('Hide Sidebar');
			expect(mockCallback).toHaveBeenCalledTimes(2);
		});

		it('handles missing elements gracefully', async () => {
			const toggler = new SidebarToggler('#non-existent');
			const result = await toggler.initiate();

			expect(result).toBeUndefined();
		});

		it('maintains multiple independent toggle instances', async () => {
			document.body.innerHTML = `
        <button id="btn1" data-sidebar-toggle="#sidebar1" data-content-toggle="#content1" 
                data-toggle-class="hide" data-content-hidden-class="full" data-content-visible-class="split"></button>
        <button id="btn2" data-sidebar-toggle="#sidebar2" data-content-toggle="#content2"
                data-toggle-class="hide" data-content-hidden-class="full" data-content-visible-class="split"></button>
        <div id="sidebar1"></div>
        <div id="content1" class="split"></div>
        <div id="sidebar2"></div>
        <div id="content2" class="split"></div>
      `;

			const toggler1 = new SidebarToggler('#btn1');
			const toggler2 = new SidebarToggler('#btn2');

			await toggler1.initiate();
			await toggler2.initiate();

			document.getElementById('btn1').click();

			const sidebar1 = document.getElementById('sidebar1');
			const sidebar2 = document.getElementById('sidebar2');

			expect(sidebar1.classList.contains('hide')).toBe(true);
			expect(sidebar2.classList.contains('hide')).toBe(false);
		});
	});
});
