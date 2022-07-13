var yoyoApp;
(() => {
	var o = {
			850: (o) => {
				o.exports = function (o) {
					o &&
						Array.isArray(o) &&
						o.forEach(function (o) {
							var r = o.async,
								t = void 0 === r || r,
								e = o.defer,
								n = void 0 === e || e,
								i = o.callback,
								p = void 0 === i ? function () {} : i,
								a = o.src,
								c = void 0 === a ? null : a,
								d = o.type,
								y = void 0 === d ? 'text/javascript' : d;
							if (c) {
								var v = document.createElement('script');
								(v.async = t),
									(v.defer = n),
									(v.src = c),
									(v.type = y),
									(v.onload = function () {
										return p();
									}),
									document.body.appendChild(v);
							}
						});
				};
			}
		},
		r = {},
		t = (function t(e) {
			var n = r[e];
			if (void 0 !== n) return n.exports;
			var i = (r[e] = { exports: {} });
			return o[e](i, i.exports, t), i.exports;
		})(850);
	(yoyoApp = void 0 === yoyoApp ? {} : yoyoApp).initScripts = t;
})();
