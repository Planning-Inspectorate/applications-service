const projectsMapRoute = '/projects-map';

const mapConfig = {
	bounds: {
		southwest: [49.528423, -10.76418],
		northeast: [61.331151, 1.9134116]
	},
	center: [54.5, -4.0],
	minZoom: 6,
	maxZoom: 18,
	defaultZoom: 6,
	tileSize: 256,
	attribution: '© Crown copyright and database rights 2024 OS (0)100024857'
};

const stageColorMapping = {
	1: '#ff6b6b',
	2: '#ffa726',
	3: '#42a5f5',
	4: '#66bb6a',
	5: '#ab47bc',
	6: '#26c6da',
	7: '#d4e157',
	8: '#8d6e63'
};

const boundaryStyle = {
	fillColor: '#e52c00',
	fillOpacity: 0.2,
	color: '#e52c00',
	weight: 2,
	opacity: 0.8
};

module.exports = {
	projectsMapRoute,
	mapConfig,
	stageColorMapping,
	boundaryStyle
};
