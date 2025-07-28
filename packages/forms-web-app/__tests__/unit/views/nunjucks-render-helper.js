const nunjucks = require('nunjucks');
const path = require('path');
const dateFilter = require('nunjucks-date-filter');
const filterByKey = require('../../../src/lib/filter-by-key');
const addKeyValuePair = require('../../../src/lib/add-key-value-pair');
const render = require('../../../src/lib/render-template-filter');
const globalTranslationsEN = require('../../../src/locales/en/global.json');
const { mockI18n } = require('../../../src/pages/_mocks/i18n');

const viewPaths = [
	path.resolve(require.resolve('govuk-frontend'), '../..'),
	path.resolve(require.resolve('@ministryofjustice/frontend'), '../..'),
	path.join(path.resolve(require.resolve('@pins/common'), '../..'), 'src', 'frontend'),
	path.join(__dirname, '../../..', 'src', 'views')
];

const nunjucksConfig = {
	noCache: true
};

const env = nunjucks.configure(viewPaths, nunjucksConfig);

env.addFilter('filterByKey', filterByKey);
env.addFilter('addKeyValuePair', addKeyValuePair);
env.addFilter('date', dateFilter);
env.addFilter('render', render);

const i18n = mockI18n({ global: globalTranslationsEN });
env.addGlobal('t', i18n.t);

module.exports = env;
