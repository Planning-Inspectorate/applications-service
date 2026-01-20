const helmet = require('helmet');
const crypto = require('node:crypto');

const scriptSrc = ['https://*.googletagmanager.com'];

const styleSrc = ["'self'", "'unsafe-inline'"];

const imgSrc = [
	"'self'",
	'https://*.google-analytics.com',
	'https://*.analytics.google.com',
	'https://*.googletagmanager.com',
	'https://*.g.doubleclick.net',
	'https://*.google.com',
	'https://*.google.co.uk',
	'https://cdn.jsdelivr.net/gh/OrdnanceSurvey/os-api-branding@0.3.1/img/',
	'https://api.os.uk'
];

const connectSrc = [
	'https://*.google-analytics.com',
	'https://*.analytics.google.com',
	'https://*.googletagmanager.com',
	'https://*.g.doubleclick.net',
	'https://*.google.com',
	'https://*.google.co.uk',
	'https://api.os.uk'
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
					'style-src': styleSrc,
					'img-src': ["'self'", ...imgSrc, 'data:', 'blob:', 'https:'],
					'connect-src': ["'self'", ...connectSrc]
				}
			}
		})
	);
}

module.exports = {
	configureCSP
};
