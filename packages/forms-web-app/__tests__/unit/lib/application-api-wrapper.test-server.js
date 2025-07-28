const { URL } = require('node:url');
const http = require('node:http');

class TestServer {
	constructor() {
		this.server = http.createServer((req, res) => this.router(req, res));
		this.hostname = 'localhost';
		// node 8 default keepalive timeout is 5000ms
		// make it shorter here as we want to close server quickly at the end of tests
		this.server.keepAliveTimeout = 1000;
		this.server.on('error', function (err) {
			console.log(err.stack);
		});
		this.server.on('connection', function (socket) {
			socket.setTimeout(1500);
		});

		this._jsonResponse = {
			name: 'value'
		};
	}

	get base() {
		return `http://${this.hostname}:${this.server.address()?.port || 10000}`;
	}

	set jsonResponse(value) {
		this._jsonResponse = value;
	}

	start(cb) {
		// randomly assign a port
		this.server.listen(0, this.hostname, cb);
	}

	stop(cb) {
		this.server.close(cb);
	}

	router(req, res) {
		const reqUrl = new URL(this.base + req.url);
		let p = decodeURIComponent(reqUrl.pathname);

		if (p === '/timeout') {
			const ms = reqUrl.searchParams.get('ms') || 500;
			setTimeout(function () {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(this._jsonResponse));
			}, ms);
		} else {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(this._jsonResponse));
		}
	}
}

module.exports = {
	TestServer
};
