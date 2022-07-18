var yoyoApp;
(() => {
	var r = {
			627: (r) => {
				r.exports = (r) => {
					r &&
						Array.isArray(r) &&
						r.forEach((r) => {
							const {
								async: o = !0,
								defer: t = !0,
								callback: e = () => {},
								src: p = null,
								type: a = 'text/javascript'
							} = r;
							if (!p) return;
							const c = document.createElement('script');
							(c.async = o),
								(c.defer = t),
								(c.src = p),
								(c.type = a),
								(c.onload = () => e()),
								document.body.appendChild(c);
						});
				};
			}
		},
		o = {},
		t = (function t(e) {
			var p = o[e];
			if (void 0 !== p) return p.exports;
			var a = (o[e] = { exports: {} });
			return r[e](a, a.exports, t), a.exports;
		})(627);
	(yoyoApp = void 0 === yoyoApp ? {} : yoyoApp).initScripts = t.default;
})();
