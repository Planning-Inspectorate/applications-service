const helmet = require('helmet');
const crypto = require('node:crypto');

const ga = 'https://www.google-analytics.com';
const gar = 'https://region1.google-analytics.com';
const gas = 'https://ssl.google-analytics.com';
const gtm = 'https://www.googletagmanager.com';

const scriptSrc = [ga, gtm, gas];

const connectSrc = [gar, 'https://api.os.uk'];

const imgSrc = ['https://cdn.jsdelivr.net/gh/OrdnanceSurvey/os-api-branding@0.3.1/img/'];

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
					'script-src': ["'self'", "'unsafe-eval'", ...scriptSrc, addCSPNonce],
					'connect-src': ["'self'", ...connectSrc],
					'img-src': ["'self'", ...imgSrc, 'data:']
				}
			}
		})
	);
}

module.exports = {
	configureCSP
};
