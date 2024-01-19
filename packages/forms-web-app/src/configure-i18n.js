const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
// const Backend = require('i18next-node-fs-backend');

// const options = {
// 	order: ['querystring'],
// 	lookupSession: 'lang',
// 	caches: false
// };

const resources = {
	en: {
		translation: {
			common: {
				feedback: 'feedback',
				resultsPerPage: 'Results per page',
				search: 'Search'
			},
			global: {
				banner: {
					tagText: 'Beta',
					html: 'This is a beta service – your {{-link}} will help us to improve it'
				},
				footer: {
					crownCopyrightText: 'Crown copyright',
					footnote: 'All content is available under the {{-link}}, except where otherwise stated',
					footnoteLinkText: 'Open Government Licence v3.0'
				},
				primaryLinks: {
					index: 'Home',
					projectSearch: 'All projects',
					detailedInformation: 'Detailed information'
				}
			},
			pages: {
				projectSearch: {
					heading: 'Projects',
					summary:
						'This is a list of all projects. To find a specific project, use the filters or search by project name or applicant.',
					downloadDescription:
						'Download a table containing a complete list of all {{count}} projects (CSV)',
					filteredResultsHeading: 'Filtered results',
					relatedContent: {
						heading: 'Related content',
						label: 'Related content navigation'
					},
					resultsPerPageDescription: 'Showing {{-from}} to {{-to}} of {{-total}} projects.'
				}
			}
		}
	},
	cy: {
		translation: {
			common: {
				feedback: 'adborth',
				resultsPerPage: 'Canlyniadau fesul tudalen',
				search: 'Chwiliwch'
			},
			global: {
				banner: {
					tagText: 'Beta',
					html: 'Gwasanaeth beta yw hwn – bydd eich {{-link}} yn ein helpu i’w wella.'
				},
				footer: {
					crownCopyrightText: 'Hawlfraint y Goron',
					footnote: `Mae’r holl gynnwys ar gael o dan y {{-link}}, ac eithrio lle nodir yn wahanol`,
					footnoteLinkText: 'Drwydded Llywodraeth Agored v3.0'
				},
				primaryLinks: {
					index: 'Cartref',
					projectSearch: 'Pob prosiect',
					detailedInformation: 'Gwybodaeth fanwl'
				}
			},
			pages: {
				projectSearch: {
					heading: 'Prosiectau',
					summary: `Dyma restr o'r holl brosiectau. I ddod o hyd i brosiect penodol, defnyddiwch yr hidlwyr neu chwiliwch yn ôl enw'r prosiect neu ymgeisydd.`,
					downloadDescription: `Lawrlwythwch dabl sy'n cynnwys rhestr gyflawn o bob un o'r {{count}} prosiect (CSV)`,
					filteredResultsHeading: `Canlyniadau wedi'u hidlo`,
					relatedContent: {
						heading: 'Cynnwys cysylltiedig',
						label: 'Llywio cynnwys cysylltiedig'
					},
					resultsPerPageDescription: 'Yn dangos {{-from}} i {{-to}} o {{-total}} brosiect.'
				}
			}
		}
	}
};

function configureI18n(app) {
	i18next
		// .use(Backend)
		.use(i18nextMiddleware.LanguageDetector)
		.init({
			// backend: {
			// 	loadPath: __dirname + '/locales/{{lng}}/translation.json'
			// },
			// detection: options,
			fallbackLng: 'en',
			// debug: app.get('env') === 'development',
			// ns: ['translation'],
			// defaultNS: 'translation',
			// preload: ['en', 'cy'],
			resources
		});

	app.use(i18nextMiddleware.handle(i18next));
}

module.exports = { configureI18n };
