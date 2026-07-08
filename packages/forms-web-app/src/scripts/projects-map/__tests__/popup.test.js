const mockSetAttribute = jest.fn();
jest.mock('ol-ext/src/overlay/Popup.js', () => {
	return jest.fn().mockImplementation(() => ({
		show: jest.fn(),
		hide: jest.fn(),
		getElement: jest.fn(() => ({
			querySelector: jest.fn(() => ({
				setAttribute: mockSetAttribute
			}))
		}))
	}));
});

jest.mock('ol-ext/src/interaction/SelectCluster.js', () => {
	return jest.fn().mockImplementation(() => ({
		on: jest.fn()
	}));
});

jest.mock('../constants', () => ({
	ANIMATION_DURATION: 250,
	CIRCLE_MAX_OBJECTS: 10,
	MULTI_POLYGON: 'MultiPolygon',
	POLYGON: 'Polygon',
	PROP_PROJECT_NAME: 'projectName',
	PROP_STAGE: 'stage'
}));

jest.mock('../index', () => ({
	getCaseReference: jest.fn()
}));

const SelectCluster = require('ol-ext/src/interaction/SelectCluster.js');
const { getCaseReference } = require('../index');

const {
	createPopup,
	renderPopupHTML,
	mapFeaturePropertiesToPopupProject,
	showProjectPopup,
	getBoundaryPopupProperties,
	getBoundariesPopup,
	getMarkersPopup
} = require('../popup');

const { NUM_ITERATIONS, randomProjects } = require('./test-helpers');
const boundariesNewSchema = require('./fixtures/boundaries-new-schema.json');

const popupText = {
	projectSelected: 'project selected',
	projectsSelected: 'projects selected'
};

describe('scripts/projects-map/popup', () => {
	describe('#createPopup', () => {
		it('adds an aria-label to the popup close button', () => {
			createPopup();

			expect(mockSetAttribute).toHaveBeenCalledWith('aria-label', 'Close popup');
		});
	});
	describe('#mapFeaturePropertiesToPopupProject', () => {
		it('should use new schema keys', () => {
			const result = mapFeaturePropertiesToPopupProject({
				caseReference: 'EN010101',
				projectName: 'New Schema Project',
				stage: 'Examination'
			});

			expect(result).toEqual({
				caseReference: 'EN010101',
				projectName: 'New Schema Project',
				stage: 'Examination'
			});
		});

		it('should ignore legacy keys when only legacy keys are provided', () => {
			const result = mapFeaturePropertiesToPopupProject({
				caseRef: 'EN010102',
				projName: 'Legacy Project',
				geomStage: 'Pre-application'
			});

			expect(result).toEqual({
				caseReference: undefined,
				projectName: 'Unknown project',
				stage: ''
			});
		});

		it('should provide safe fallback values for mixed and missing fields', () => {
			const result = mapFeaturePropertiesToPopupProject({
				caseReference: 'EN010103',
				projectName: '   ',
				stage: 'Accepted'
			});

			expect(result).toEqual({
				caseReference: 'EN010103',
				projectName: 'EN010103',
				stage: 'Accepted'
			});
		});

		it('should use Unknown project when both projectName and caseReference are missing', () => {
			const result = mapFeaturePropertiesToPopupProject({
				projectName: ''
			});

			expect(result).toEqual({
				caseReference: undefined,
				projectName: 'Unknown project',
				stage: ''
			});
		});
	});

	describe('#renderPopupHTML', () => {
		describe('single project', () => {
			it('should contain the project name, case reference and stage', () => {
				const projects = [
					{
						caseReference: 'EN010001',
						projectName: 'Example Wind Farm',
						stage: 'Examination'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('Example Wind Farm');
				expect(html).toContain('EN010001');
				expect(html).toContain('Examination');
			});

			it('should include a link to /projects/{caseReference}', () => {
				const projects = [
					{
						caseReference: 'EN010001',
						projectName: 'Example Wind Farm',
						stage: 'Examination'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('href="/projects/EN010001"');
			});

			it('should display "1 project selected" header', () => {
				const projects = [
					{
						caseReference: 'EN010001',
						projectName: 'Example Wind Farm',
						stage: 'Examination'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('1 project selected');
			});
		});

		describe('multiple projects', () => {
			const projects = [
				{
					caseReference: 'EN010001',
					projectName: 'Example Wind Farm',
					stage: 'Examination'
				},
				{
					caseReference: 'EN010002',
					projectName: 'Solar Array Project',
					stage: 'Pre-application'
				},
				{
					caseReference: 'EN010003',
					projectName: 'Rail Link Extension',
					stage: 'Accepted'
				}
			];

			it('should contain all project names, case references, and stages', () => {
				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('Example Wind Farm');
				expect(html).toContain('EN010001');
				expect(html).toContain('Examination');

				expect(html).toContain('Solar Array Project');
				expect(html).toContain('EN010002');
				expect(html).toContain('Pre-application');

				expect(html).toContain('Rail Link Extension');
				expect(html).toContain('EN010003');
				expect(html).toContain('Accepted');
			});

			it('should include links to /projects/{caseReference} for each project', () => {
				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('href="/projects/EN010001"');
				expect(html).toContain('href="/projects/EN010002"');
				expect(html).toContain('href="/projects/EN010003"');
			});

			it('should display "3 projects selected" header', () => {
				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('3 projects selected');
			});
		});

		describe('edge cases', () => {
			it('should use caseReference as link text when projectName is missing', () => {
				const projects = [
					{
						caseReference: 'EN010004',
						projectName: '',
						stage: 'Draft'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('>EN010004</a>');
				expect(html).toContain('href="/projects/EN010004"');
			});

			it('should render empty stage cell when stage is missing', () => {
				const projects = [
					{
						caseReference: 'EN010005',
						projectName: 'No Stage Project',
						stage: ''
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('No Stage Project');
				expect(html).toContain('cluster-popup-cell-stage');
			});

			it('should not render undefined when caseReference and projectName are missing', () => {
				const projects = [
					{
						caseReference: undefined,
						projectName: undefined,
						stage: 'Accepted'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('Unknown project');
				expect(html).not.toContain('undefined');
				expect(html).not.toContain('href="/projects/undefined"');
			});
		});
	});

	describe('#showProjectPopup', () => {
		it('should render boundary popup text from new schema feature properties without undefined', () => {
			const popup = { show: jest.fn(), hide: jest.fn() };
			const features = [
				{
					getProperties: () => ({
						caseReference: 'EN010201',
						projectName: 'Boundary Wind Farm',
						receivedDate: '2026-06-01'
					})
				}
			];

			showProjectPopup(popup, features, [0, 0], popupText);

			expect(popup.show).toHaveBeenCalledTimes(1);
			const html = popup.show.mock.calls[0][1];
			expect(html).toContain('Boundary Wind Farm');
			expect(html).toContain('href="/projects/EN010201"');
			expect(html).not.toContain('undefined');
		});

		it('should render popup rows correctly for provided boundary GeoJSON fixture', () => {
			const popup = { show: jest.fn(), hide: jest.fn() };
			const features = boundariesNewSchema.features.map((feature) => ({
				getProperties: () => feature.properties
			}));

			showProjectPopup(popup, features, [100, 200], popupText);

			expect(popup.show).toHaveBeenCalledTimes(1);
			const html = popup.show.mock.calls[0][1];
			expect(html).toContain('5 projects selected');
			expect(html).toContain('Northvale Solar Farm');
			expect(html).toContain('East Haven Wind Extension');
			expect(html).toContain('Southport Grid Connection');
			expect(html).toContain('Riverside Port Upgrade');
			expect(html).toContain('Westmoor Hydrogen Facility');
			expect(html).toContain('href="/projects/EN010201"');
			expect(html).toContain('href="/projects/EN010205"');
			expect(html).not.toContain('undefined');
		});
	});

	describe('Popup HTML rendering - property-based', () => {
		it('should contain every project caseReference in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(project.caseReference);
				}
			}
		});

		it('should contain every project projectName in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(project.projectName);
				}
			}
		});

		it('should contain every project stage in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(project.stage);
				}
			}
		});

		it('should include a link to /projects/{caseReference} for every project', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(`href="/projects/${project.caseReference}"`);
				}
			}
		});
	});

	describe('#getBoundaryPopupProperties', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should return caseReference, projectName and stage from the feature', () => {
			getCaseReference.mockReturnValue('EN010201');

			const feature = {
				get: jest.fn((key) => {
					if (key === 'projectName') return 'Northvale Solar Farm';
					if (key === 'stage') return 'Examination';
					return undefined;
				})
			};

			const result = getBoundaryPopupProperties(feature);

			expect(getCaseReference).toHaveBeenCalledWith(feature);
			expect(feature.get).toHaveBeenCalledWith('projectName');
			expect(feature.get).toHaveBeenCalledWith('stage');

			expect(result).toEqual({
				caseReference: 'EN010201',
				projectName: 'Northvale Solar Farm',
				stage: 'Examination'
			});
		});

		it('should allow missing projectName and stage', () => {
			getCaseReference.mockReturnValue('EN010202');

			const feature = {
				get: jest.fn(() => undefined)
			};

			const result = getBoundaryPopupProperties(feature);

			expect(result).toEqual({
				caseReference: 'EN010202',
				projectName: undefined,
				stage: undefined
			});
		});
	});

	describe('#getBoundariesPopup', () => {
		let mockMap;
		let mockPopup;
		let singleclickHandler;
		let resolutionHandler;
		let mockView;

		beforeEach(() => {
			jest.clearAllMocks();

			mockPopup = {
				show: jest.fn(),
				hide: jest.fn()
			};

			mockView = {
				on: jest.fn((event, handler) => {
					if (event === 'change:resolution') resolutionHandler = handler;
				})
			};

			mockMap = {
				on: jest.fn((event, handler) => {
					if (event === 'singleclick') singleclickHandler = handler;
				}),
				forEachFeatureAtPixel: jest.fn(),
				getView: jest.fn(() => mockView)
			};
		});

		it('registers singleclick listener on map', () => {
			getBoundariesPopup(mockMap, mockPopup, popupText);

			expect(mockMap.on).toHaveBeenCalledWith('singleclick', expect.any(Function));
		});

		it('registers change:resolution listener on map view', () => {
			getBoundariesPopup(mockMap, mockPopup, popupText);

			expect(mockMap.getView).toHaveBeenCalledTimes(1);
			expect(mockView.on).toHaveBeenCalledWith('change:resolution', expect.any(Function));
		});

		it('does not register listeners when popup is null', () => {
			getBoundariesPopup(mockMap, null, popupText);

			expect(mockMap.on).not.toHaveBeenCalled();
			expect(mockMap.getView).not.toHaveBeenCalled();
		});

		it('shows popup when a POLYGON feature is clicked', () => {
			getCaseReference.mockReturnValue('EN010001');
			getBoundariesPopup(mockMap, mockPopup, popupText);

			const polygonFeature = {
				getGeometry: jest.fn(() => ({ getType: jest.fn(() => 'Polygon') })),
				get: jest.fn((key) => {
					if (key === 'projectName') return 'Test Project';
					if (key === 'stage') return 'Examination';
					return undefined;
				})
			};

			mockMap.forEachFeatureAtPixel.mockImplementation((_, iterateFeature) => {
				iterateFeature(polygonFeature);
			});

			singleclickHandler({ pixel: [100, 200], coordinate: [10, 20] });

			expect(getCaseReference).toHaveBeenCalledWith(polygonFeature);
			expect(mockPopup.show).toHaveBeenCalledTimes(1);
			expect(mockPopup.hide).not.toHaveBeenCalled();
		});

		it('shows popup when a MULTI_POLYGON feature is clicked', () => {
			getCaseReference.mockReturnValue('EN010002');
			getBoundariesPopup(mockMap, mockPopup, popupText);

			const multiPolygonFeature = {
				getGeometry: jest.fn(() => ({ getType: jest.fn(() => 'MultiPolygon') })),
				get: jest.fn((key) => {
					if (key === 'projectName') return 'Another Project';
					if (key === 'stage') return 'Accepted';
					return undefined;
				})
			};

			mockMap.forEachFeatureAtPixel.mockImplementation((_, iterateFeature) => {
				iterateFeature(multiPolygonFeature);
			});

			singleclickHandler({ pixel: [1, 2], coordinate: [3, 4] });

			expect(mockPopup.show).toHaveBeenCalledTimes(1);
			expect(mockPopup.hide).not.toHaveBeenCalled();
		});

		it('hides popup when no boundary feature is clicked', () => {
			getBoundariesPopup(mockMap, mockPopup, popupText);

			mockMap.forEachFeatureAtPixel.mockImplementation(() => {});

			singleclickHandler({ pixel: [100, 200], coordinate: [10, 20] });

			expect(mockPopup.hide).toHaveBeenCalledTimes(1);
			expect(mockPopup.show).not.toHaveBeenCalled();
		});

		it('hides popup when non-boundary geometry is clicked', () => {
			getBoundariesPopup(mockMap, mockPopup, popupText);

			const pointFeature = {
				getGeometry: jest.fn(() => ({ getType: jest.fn(() => 'Point') })),
				get: jest.fn()
			};

			mockMap.forEachFeatureAtPixel.mockImplementation((_, iterateFeature) => {
				iterateFeature(pointFeature);
			});

			singleclickHandler({ pixel: [5, 6], coordinate: [7, 8] });

			expect(mockPopup.hide).toHaveBeenCalledTimes(1);
			expect(mockPopup.show).not.toHaveBeenCalled();
		});

		it('hides popup on resolution change', () => {
			getBoundariesPopup(mockMap, mockPopup, popupText);

			resolutionHandler();

			expect(mockPopup.hide).toHaveBeenCalledTimes(1);
		});
	});

	describe('#getMarkersPopup', () => {
		let mockMap;
		let mockPopup;
		let mockLayers;
		let mockSelectClusterInstance;
		let selectClusterOnCallback;

		beforeEach(() => {
			jest.clearAllMocks();

			mockPopup = {
				show: jest.fn(),
				hide: jest.fn()
			};

			mockSelectClusterInstance = {
				on: jest.fn((event, callback) => {
					if (event === 'select') {
						selectClusterOnCallback = callback;
					}
				})
			};

			SelectCluster.mockImplementation(() => mockSelectClusterInstance);

			mockLayers = [{ id: 'base' }, { id: 'cluster' }];

			mockMap = {
				addInteraction: jest.fn()
			};
		});

		it('should instantiate SelectCluster with correct config', () => {
			getMarkersPopup(mockMap, mockLayers, mockPopup, popupText);

			const SelectCluster = require('ol-ext/src/interaction/SelectCluster.js');
			expect(SelectCluster).toHaveBeenCalledWith(
				expect.objectContaining({
					layers: [mockLayers[1]],
					animate: true,
					animationDuration: 250,
					spiral: true,
					circleMaxObjects: 10
				})
			);
		});

		it('should add SelectCluster interaction to map', () => {
			getMarkersPopup(mockMap, mockLayers, mockPopup, popupText);

			expect(mockMap.addInteraction).toHaveBeenCalledWith(mockSelectClusterInstance);
		});

		it('should register select listener on SelectCluster', () => {
			getMarkersPopup(mockMap, mockLayers, mockPopup, popupText);

			expect(mockSelectClusterInstance.on).toHaveBeenCalledWith('select', expect.any(Function));
		});

		it('should hide popup when no features are selected', () => {
			getMarkersPopup(mockMap, mockLayers, mockPopup, popupText);

			const event = { selected: [] };
			selectClusterOnCallback(event);

			expect(mockPopup.hide).toHaveBeenCalled();
		});

		it('should show popup when cluster features are selected', () => {
			getMarkersPopup(mockMap, mockLayers, mockPopup, popupText);

			const mockClusterFeature = {
				get: jest.fn((key) => {
					if (key === 'features') {
						return [
							{
								getProperties: jest.fn(() => ({
									caseReference: 'EN010001',
									projectName: 'Project 1',
									stage: 'Examination'
								}))
							},
							{
								getProperties: jest.fn(() => ({
									caseReference: 'EN010002',
									projectName: 'Project 2',
									stage: 'Accepted'
								}))
							}
						];
					}
					if (key === 'selectclusterlink') return false;
					return undefined;
				}),
				getGeometry: jest.fn(() => ({
					getCoordinates: jest.fn(() => [100, 200])
				}))
			};

			const event = { selected: [mockClusterFeature] };
			selectClusterOnCallback(event);

			expect(mockPopup.show).toHaveBeenCalled();
		});

		it('should not show popup when selectclusterlink is true', () => {
			getMarkersPopup(mockMap, mockLayers, mockPopup, popupText);

			const mockClusterFeature = {
				get: jest.fn((key) => {
					if (key === 'selectclusterlink') return true;
					return undefined;
				})
			};

			const event = { selected: [mockClusterFeature] };
			selectClusterOnCallback(event);

			expect(mockPopup.show).not.toHaveBeenCalled();
		});
	});
});
