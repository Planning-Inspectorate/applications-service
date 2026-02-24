# Projects Map Filter Implementation

## Overview

Refactored `/projects-map` page to match the 2-column layout pattern of `/project-search`, with filters hidden by default on desktop and shown as an overlay modal on mobile/tablet.

## Problem Statement

- Projects-map had a custom sidebar toggle implementation that conflicted with the modal script
- The solution was mixing SidebarToggler class + Modal script, causing duplicate buttons and broken functionality
- Goal: Reuse the same modal-based pattern as project-search, but with filters hidden by default on desktop

## Solution Architecture

### Layout Structure

```
<form>
  <grid-row>
    <grid-column-one-third>
      (sidebar with filters)
    </grid-column-one-third>

    <grid-column-two-thirds>
      (main content - map, search, etc)
    </grid-column-two-thirds>
  </grid-row>
</form>
```

### Responsive Behavior

#### Desktop (769px+)

- Sidebar visible in 1-column layout
- Filters hidden by CSS: `#projects-map-page-filters { display: none; }`
- Toggle button visible and functional
- Clicking button toggles filters visibility with `govuk-!-display-none` class
- Map resizes when sidebar toggles

#### Mobile/Tablet (<769px)

- Modal script creates "Show Filters" button automatically
- Filters shown as full-screen modal overlay
- No custom toggle script runs

## Files Modified

### 1. `packages/forms-web-app/src/pages/projects-map/view.njk`

**Key Changes:**

- Standard 2-column grid layout (like project-search)
- Added CSS media queries to hide/show filters and toggle button based on screen size
- Added elegant inline script for desktop toggle functionality
- Removed manual button hiding attempt (was causing issues)

**CSS Added:**

```css
/* Hide filters on desktop, modal shows them on mobile/tablet */
@media (min-width: 769px) {
	#projects-map-page-filters {
		display: none;
	}
}

/* Show toggle button only on desktop */
#projects-map-filters-toggle-btn {
	display: none;
}

@media (min-width: 769px) {
	#projects-map-filters-toggle-btn {
		display: inline-block;
	}
}
```

**JavaScript Toggle (Desktop Only):**

```javascript
(function () {
	const btn = document.getElementById('projects-map-filters-toggle-btn');
	const filters = document.getElementById('projects-map-page-filters');
	if (!btn || !filters) return;

	btn.addEventListener('click', function () {
		const isHidden = filters.classList.toggle('govuk-!-display-none');
		btn.textContent = isHidden ? 'Show Filters' : 'Hide Filters';
		window._applicationService?.map &&
			setTimeout(() => window._applicationService.map.updateSize(), 100);
	});
})();
```

### 2. `packages/forms-web-app/src/pages/projects-map/includes/search.njk` (NEW FILE)

**Purpose:** Page-specific search include with correct search bar ID for modal script

**Content:**

```nunjucks
{% from "components/ui/search-bar.njk" import uiSearchBar %}

{{ uiSearchBar('projects-map-search-bar', 'searchTerm', query.searchTerm, t('projectsMap.accessibilityText1'), t('common.search')) }}
```

**Why:** Modal script looks for `#projects-map-search-bar` to insert button after. Project-search uses different ID (`project-search-page-search-bar`), so we created a dedicated include.

### 3. `packages/forms-web-app/src/pages/projects-map/includes/sidebar.njk`

**Change:** No wrapper divs, just the filter accordion

- Removed unnecessary container divs
- Let the parent handle visibility

### 4. `packages/forms-web-app/webpack.config.js`

**Change:** Removed SidebarToggler entry from webpack config

```javascript
// REMOVED:
// sidebarToggler: `${entryPath}/ui/sidebar-toggler.js`
```

**Reason:** SidebarToggler class was deleted as it was the wrong approach for this use case

## Files Deleted

### 1. `packages/forms-web-app/src/scripts/ui/sidebar-toggler.js`

**Reason:** Generic utility that was causing confusion when mixed with modal script. Inline solution is simpler for this specific use case.

### 2. `packages/forms-web-app/src/scripts/ui/sidebar-toggler.test.js`

**Reason:** Tests for deleted class

## Key Design Decisions

### 1. CSS Media Queries vs Utility Classes

- **Why:** Semantic, cleaner, easier to understand breakpoint logic
- **Alternative Rejected:** `govuk-!-display-none` on sidebar container blocked modal functionality

### 2. Inline Script vs Generic Component

- **Why:** Simple, focused, no dependency management needed for single use case
- **Alternative:** Could have restored SidebarToggler class, but overkill for this scenario
- **When to Restore:** If other pages need similar desktop-only toggle, restore SidebarToggler

### 3. Hiding Filters Element vs Sidebar Container

- **Why:** Modal script controls `#projects-map-page-filters` element, needs access to it
- **Important:** Never hide parent container, only the filter element itself

## How It Works

### Desktop Flow

1. User clicks "Show/Hide Filters" button
2. Inline script toggles `govuk-!-display-none` on `#projects-map-page-filters`
3. Script updates button text
4. Script triggers map resize after 100ms

### Mobile/Tablet Flow

1. Modal script runs on page load
2. Detects screen size is < 769px
3. Creates "Show Filters" button automatically
4. Clicking button shows filters as modal overlay
5. Modal handles all interactions (no inline script runs)

## Important Notes

- **Search Bar ID**: Must match `#projects-map-search-bar` (modal script inserts button after this element)
- **Filter ID**: Must be `#projects-map-page-filters` (modal script targets this)
- **Breakpoint**: 769px matches project-search modal breakpoint for consistency
- **Map Resize**: Important for OpenLayers map to recalculate dimensions when sidebar toggle

## Testing Checklist

- [ ] Desktop: Toggle button visible and functional
- [ ] Desktop: Button text changes between "Show/Hide Filters"
- [ ] Desktop: Filters appear/disappear on toggle
- [ ] Desktop: Map resizes correctly
- [ ] Mobile: Only one "Show Filters" button appears
- [ ] Mobile: Button opens full-screen modal overlay
- [ ] Mobile: Close button in modal works
- [ ] Tablet: Modal behavior matches mobile

## Future Improvements

1. If other pages need similar toggle, restore `sidebar-toggler.js` and use it with data attributes
2. Consider extracting CSS constants for breakpoints (769px currently hardcoded in multiple places)
3. Add accessibility features: ARIA labels, focus management
