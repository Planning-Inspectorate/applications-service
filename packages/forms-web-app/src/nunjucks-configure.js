const nunjucks = require('nunjucks');
const dateFilter = require('nunjucks-date-filter');
const config = require('./config');
const addKeyValuePair = require('./lib/add-key-value-pair');
const fileSizeDisplayHelper = require('./lib/file-size-display-helper');
const fileTypeDisplayHelper = require('./lib/file-type-display-helper');
const filterByKey = require('./lib/filter-by-key');
const renderTemplateFilter = require('./lib/render-template-filter');
const { projectStages: projectStageNames } = require('./utils/project-stages');
const { routesConfig } = require('./routes/config');
const path = require('path');
const { getYearNow } = require('./utils/date-utils');
const { getFileNameFromDocumentUrl } = require('./lib/get-file-name-from-url');

const govukFrontendRoot = path.resolve(require.resolve('govuk-frontend'), '../..');
const mojFrontendRoot = path.resolve(require.resolve('@ministryofjustice/frontend'), '../..');
const pinsComponentsRoot = path.resolve(
	require.resolve('@planning-inspectorate/pins-components'),
	'../..'
);

const viewPaths = [
	govukFrontendRoot,
	mojFrontendRoot,
	path.join(__dirname, 'views'),
	path.join(__dirname, 'pages'),
	pinsComponentsRoot
];

function nunjucksConfigure(app) {
	const isDev = app.get('env') === 'development';

	const nunjucksConfig = {
		autoescape: true,
		noCache: true,
		watch: isDev,
		express: app,
		trimBlocks: true,
		lstripBlocks: true
	};
	const nunjucksEnv = nunjucks.configure(viewPaths, nunjucksConfig);

	dateFilter.setDefaultFormat(config.application.defaultDisplayDateFormat);
	nunjucksEnv.addFilter('date', dateFilter);
	nunjucksEnv.addFilter('addKeyValuePair', addKeyValuePair);
	nunjucksEnv.addFilter('formatBytes', fileSizeDisplayHelper);
	nunjucksEnv.addFilter('formatMimeType', fileTypeDisplayHelper);
	nunjucksEnv.addFilter('filterByKey', filterByKey);
	nunjucksEnv.addFilter('render', renderTemplateFilter(nunjucks));
	nunjucksEnv.addFilter('fileNameFromDocumentURL', getFileNameFromDocumentUrl);

	nunjucksEnv.addGlobal('defaultPageTitle', config.defaultPageTitle);
	nunjucksEnv.addGlobal('featureFlag', config.featureFlag);
	nunjucksEnv.addGlobal('featureHideLink', config.featureHideLink);
	nunjucksEnv.addGlobal('googleAnalyticsId', config.server.googleAnalyticsId);
	nunjucksEnv.addGlobal('googleTagManagerId', config.server.googleTagManagerId);
	nunjucksEnv.addGlobal('host', config.server.host);
	nunjucksEnv.addGlobal('nsipBaseUrl', config.server.nsipBaseUrl);
	nunjucksEnv.addGlobal('projectStageNames', projectStageNames);
	nunjucksEnv.addGlobal('routes', routesConfig);
	nunjucksEnv.addGlobal('serviceFeedbackUrl', config.serviceFeedbackUrl);
	nunjucksEnv.addGlobal('pinsContactDetails', config.pinsContactDetails);
	nunjucksEnv.addGlobal('pinsSocialMedia', config.pinsSocialMedia);
	nunjucksEnv.addGlobal('pinsPrivacyNoticeUrl', config.pinsPrivacyNoticeUrl);
	nunjucksEnv.addGlobal('pinsURL', config.pinsURL);
	nunjucksEnv.addGlobal('govUK', config.govUK);
	nunjucksEnv.addGlobal('externalURL', config.externalURL);
	nunjucksEnv.addGlobal('yearNow', getYearNow());

	return nunjucksEnv;
}

module.exports = {
	nunjucksConfigure
};
