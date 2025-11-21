const helmet = require('helmet');
const crypto = require('node:crypto');

const scriptSrc = ['https://*.googletagmanager.com'];

const imgSrc = [
	'https://*.google-analytics.com',
	'https://*.analytics.google.com',
	'https://*.googletagmanager.com',
	'https://*.g.doubleclick.net',
	'https://*.google.com',
	'https://*.google.co.uk',
	'https://cdn.jsdelivr.net/gh/OrdnanceSurvey/os-api-branding@0.3.1/img/',
	'https://*.openstreetmap.org',
	'https://*.tile.openstreetmap.org'
];

const connectSrc = [
	'https://*.google-analytics.com',
	'https://*.analytics.google.com',
	'https://*.googletagmanager.com',
	'https://*.g.doubleclick.net',
	'https://*.google.com',
	'https://*.google.co.uk',
	'https://api.os.uk',
	'https://*.openstreetmap.org',
	'https://*.tile.openstreetmap.org'
];

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
					'img-src': ["'self'", ...imgSrc, 'data:'],
					'connect-src': ["'self'", ...connectSrc]
				}
			}
		})
	);
}

module.exports = {
	configureCSP
};
