const nunjucks = require('nunjucks');
const dateFilter = require('nunjucks-date-filter');
const config = require('./config');
const addKeyValuePair = require('./lib/add-key-value-pair');
const fileSizeDisplayHelper = require('./lib/file-size-display-helper');
const fileTypeDisplayHelper = require('./lib/file-type-display-helper');
const filterByKey = require('./lib/filter-by-key');
const renderTemplateFilter = require('./lib/render-template-filter');
const { Status: projectStageNames } = require('./utils/status');
const { routesConfig } = require('./routes/config');
const path = require('path');
const { configureI18n } = require('./i18n');

const configureNunjcuks = (app) => {
	const isDev = app.get('env') === 'development';

	const nunjucksConfig = {
		autoescape: true,
		noCache: true,
		watch: isDev,
		express: app
	};

	const mojFrontendRoot = path.resolve(require.resolve('@ministryofjustice/frontend'), '../..');
	const pinsComponentsRoot = path.resolve(
		require.resolve('@planning-inspectorate/pins-components'),
		'../..'
	);

	const govukFrontendRoot = path.resolve(require.resolve('govuk-frontend'), '../..');

	const viewPaths = [
		govukFrontendRoot,
		mojFrontendRoot,
		path.join(__dirname, 'views'),
		pinsComponentsRoot
	];

	const env = nunjucks.configure(viewPaths, nunjucksConfig);

	dateFilter.setDefaultFormat(config.application.defaultDisplayDateFormat);
	env.addFilter('date', dateFilter);
	env.addFilter('addKeyValuePair', addKeyValuePair);
	env.addFilter('formatBytes', fileSizeDisplayHelper);
	env.addFilter('formatMimeType', fileTypeDisplayHelper);
	env.addFilter('filterByKey', filterByKey);
	env.addFilter('render', renderTemplateFilter(nunjucks));
	env.addGlobal('defaultPageTitle', config.defaultPageTitle);
	env.addGlobal('featureFlag', config.featureFlag);
	env.addGlobal('featureHideLink', config.featureHideLink);
	env.addGlobal('googleAnalyticsId', config.server.googleAnalyticsId);
	env.addGlobal('googleTagManagerId', config.server.googleTagManagerId);
	env.addGlobal('host', config.server.host);
	env.addGlobal('nsipBaseUrl', config.server.nsipBaseUrl);
	env.addGlobal('projectStageNames', projectStageNames);
	env.addGlobal('routes', routesConfig);
	env.addGlobal('serviceFeedbackUrl', config.serviceFeedbackUrl);

	// i18n
	const i18n = configureI18n(app);
	env.addGlobal('__', i18n.__);
	env.addFilter('t', i18n.__);

	return env;
};

module.exports = {
	configureNunjcuks
};
