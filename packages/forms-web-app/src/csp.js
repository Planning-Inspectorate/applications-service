const helmet = require('helmet');
const crypto = require('node:crypto');

const ga = 'https://www.google-analytics.com';
const gar = 'https://region1.google-analytics.com';
const gas = 'https://ssl.google-analytics.com';
const gtm = 'https://www.googletagmanager.com';

const googleAnalytics = [ga, gtm, gas];

const addCSPNonce = (req, res) => `'nonce-${res.locals.cspNonce}'`;

function configureCSP(app) {
	app.use((req, res, next) => {
		res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
		next();
	});

	app.use(
		helmet({
			referrerPolicy: { policy: 'origin-when-cross-origin' },
			contentSecurityPolicy: {
				directives: {
					'script-src': ["'self'", "'unsafe-eval'", ...googleAnalytics, addCSPNonce],
					'connect-src': ["'self'", gar]
				}
			}
		})
	);
}

module.exports = {
	configureCSP
};
