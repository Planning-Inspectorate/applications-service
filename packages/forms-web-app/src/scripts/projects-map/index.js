import L from 'leaflet';
import 'leaflet.markercluster';

const stageNames = {
	'Pre-application': 1,
	Acceptance: 2,
	'Pre-examination': 3,
	Examination: 4,
	Recommendation: 5,
	Decision: 6,
	'Post decision': 7,
	Withdrawn: 8
};

const stageColors = {
	1: '#ff6b6b',
	2: '#ffa726',
	3: '#42a5f5',
	4: '#66bb6a',
	5: '#ab47bc',
	6: '#26c6da',
	7: '#d4e157',
	8: '#8d6e63'
};

function createCustomIcon(stage) {
	const color = stageColors[stage] || '#666666';
	return L.divIcon({
		className: 'custom-project-marker',
		html: `<div style="
			background-color: ${color};
			width: 20px;
			height: 20px;
			border-radius: 50% 50% 50% 0;
			border: 3px solid white;
			box-shadow: 0 2px 4px rgba(0,0,0,0.3);
			transform: rotate(-45deg);
		"></div>`,
		iconSize: [26, 26],
		iconAnchor: [13, 26],
		popupAnchor: [0, -26]
	});
}

function getStageNumber(stageName) {
	return stageNames[stageName] || 1;
}

function projectsMap() {
	this.initiate = function (mapElement) {
		let applications = [];
		let featureFlags = {
			enableClustering: false,
			enableBoundaries: false,
			enableCustomIcons: true
		};

		try {
			applications = JSON.parse(mapElement.dataset.applications || '[]');
		} catch (e) {
			console.error('Error parsing applications data:', e);
		}

		try {
			featureFlags = JSON.parse(mapElement.dataset.featureFlags || '{}');
		} catch (e) {
			console.error('Error parsing feature flags:', e);
		}

		const mapOptions = {
			minZoom: 6,
			maxZoom: 18,
			center: [54.5, -4.0],
			zoom: 6,
			maxBounds: [
				[49.528423, -10.76418],
				[61.331151, 1.9134116]
			],
			attributionControl: true
		};

		const map = L.map(mapElement, mapOptions);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		const boundariesLayer = L.layerGroup().addTo(map);
		let markersLayer;

		if (featureFlags.enableClustering) {
			markersLayer = L.markerClusterGroup({
				maxClusterRadius: 50,
				disableClusteringAtZoom: 12,
				spiderfyOnMaxZoom: true,
				showCoverageOnHover: false,
				animate: true,
				iconCreateFunction: function (cluster) {
					const count = cluster.getChildCount();
					let size = 'small';
					if (count > 10) size = 'medium';
					if (count > 50) size = 'large';

					return L.divIcon({
						html: `<div class="cluster-icon cluster-icon--${size}"><span>${count}</span></div>`,
						className: 'marker-cluster',
						iconSize: L.point(40, 40)
					});
				}
			});
		} else {
			markersLayer = L.layerGroup();
		}
		markersLayer.addTo(map);

		const projectsByLocation = new Map();

		applications.forEach((app) => {
			if (app.longLat && app.longLat.length === 2) {
				const [lng, lat] = app.longLat;
				const key = `${lat},${lng}`;

				if (!projectsByLocation.has(key)) {
					projectsByLocation.set(key, []);
				}
				projectsByLocation.get(key).push(app);
			}
		});

		projectsByLocation.forEach((projects, key) => {
			const [lat, lng] = key.split(',').map(Number);
			const firstProject = projects[0];
			const stage = getStageNumber(firstProject.stage);

			let marker;
			if (featureFlags.enableCustomIcons) {
				const icon = createCustomIcon(stage);
				marker = L.marker([lat, lng], { icon });
			} else {
				marker = L.marker([lat, lng]);
			}

			marker.on('click', function () {
				showProjectsList(projects);
			});

			const popupContent = createPopupContent(projects, firstProject);
			marker.bindPopup(popupContent, {
				maxWidth: 300,
				className: 'project-popup'
			});

			markersLayer.addLayer(marker);
		});

		if (featureFlags.enableBoundaries) {
			loadGeoJsonBoundaries(map, boundariesLayer, applications);
		}

		function createPopupContent(projects, firstProject) {
			if (projects.length === 1) {
				return `
					<div class="popup-content">
						<h4 class="popup-title">${firstProject.projectName}</h4>
						<div class="popup-details">
							<p><strong>Case Reference:</strong> ${firstProject.caseReference}</p>
							<p><strong>Stage:</strong> <span class="popup-stage" style="background-color: ${
								stageColors[getStageNumber(firstProject.stage)] || '#666'
							}">${firstProject.stage}</span></p>
							${
								firstProject.projectLocation
									? `<p><strong>Location:</strong> ${firstProject.projectLocation}</p>`
									: ''
							}
							${firstProject.sector ? `<p><strong>Sector:</strong> ${firstProject.sector}</p>` : ''}
						</div>
						<div class="popup-actions">
							<a href="/projects/${firstProject.caseReference}" class="popup-link">View Project Details →</a>
						</div>
					</div>
				`;
			} else {
				const projectList = projects
					.slice(0, 5)
					.map(
						(p) =>
							`<li><a href="/projects/${p.caseReference}">${p.projectName}</a> <small>(${p.stage})</small></li>`
					)
					.join('');
				const moreText =
					projects.length > 5 ? `<p><em>+${projects.length - 5} more projects</em></p>` : '';

				return `
					<div class="popup-content">
						<h4 class="popup-title">${projects.length} projects at this location</h4>
						<ul class="popup-project-list">${projectList}</ul>
						${moreText}
						<p class="popup-hint">Click to see full list in panel</p>
					</div>
				`;
			}
		}

		function showProjectsList(projects) {
			const panel = document.getElementById('projects-list-panel');
			const heading = document.getElementById('selected-projects-heading');
			const list = document.getElementById('selected-projects-list');

			if (!panel || !heading || !list) return;

			panel.style.display = 'block';
			heading.textContent = `${projects.length} project${
				projects.length !== 1 ? 's' : ''
			} selected`;

			list.innerHTML = projects
				.map((project) => {
					const stageNum = getStageNumber(project.stage);
					const stageColor = stageColors[stageNum] || '#666';
					return `
						<div class="project-list-item">
							<a href="/projects/${project.caseReference}" class="govuk-link project-link">
								${project.projectName}
							</a>
							<div class="project-meta">
								<span class="project-stage-tag" style="background-color: ${stageColor}">${project.stage}</span>
								${project.sector ? `<span class="project-sector">${project.sector}</span>` : ''}
							</div>
						</div>
					`;
				})
				.join('');
		}

		async function loadGeoJsonBoundaries(map, layer, apps) {
			try {
				const response = await fetch('/api/geojson');

				if (!response.ok) {
					console.log('GeoJSON endpoint not available, using markers only');
					return;
				}

				const geojsonData = await response.json();

				if (geojsonData && geojsonData.features) {
					L.geoJSON(geojsonData, {
						style: function (feature) {
							const props = feature.properties || {};
							const caseRef = props.caseReference || props.CaseReference || '';
							const matchingApp = apps.find((app) => app.caseReference === caseRef);
							const stageNum = matchingApp ? getStageNumber(matchingApp.stage) : 1;
							const color = stageColors[stageNum] || '#e52c00';

							return {
								color: color,
								weight: 2,
								opacity: 0.8,
								fillColor: color,
								fillOpacity: 0.2,
								dashArray: props.isApproximate ? '5, 5' : null
							};
						},
						onEachFeature: function (feature, featureLayer) {
							if (feature.properties) {
								const props = feature.properties;
								const projectName =
									props.projectName || props.ProjectName || props.name || 'Project';
								const caseRef = props.caseReference || props.CaseReference || props.caseRef || '';

								featureLayer.on('click', function () {
									const matchingApps = apps.filter(
										(app) => app.caseReference === caseRef || app.projectName === projectName
									);

									if (matchingApps.length > 0) {
										showProjectsList(matchingApps);

										const bounds = featureLayer.getBounds();
										map.fitBounds(bounds, { padding: [50, 50] });
									}
								});

								featureLayer.on('mouseover', function () {
									featureLayer.setStyle({
										weight: 4,
										fillOpacity: 0.4
									});
								});

								featureLayer.on('mouseout', function () {
									featureLayer.setStyle({
										weight: 2,
										fillOpacity: 0.2
									});
								});

								const tooltipContent = `<strong>${projectName}</strong>${
									caseRef ? `<br/>${caseRef}` : ''
								}`;
								featureLayer.bindTooltip(tooltipContent, {
									sticky: true,
									className: 'boundary-tooltip'
								});
							}
						}
					}).addTo(layer);

					console.log(`Loaded ${geojsonData.features.length} boundary features`);
				}
			} catch (error) {
				console.log('GeoJSON boundaries not available:', error.message);
			}
		}

		return map;
	};
}

export default projectsMap;
