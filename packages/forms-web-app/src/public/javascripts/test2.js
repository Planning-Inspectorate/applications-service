var yoyoApp;
(() => {
	var o = {
			808: (o) => {
				o.exports = () => {
					console.log('this is yoyo2');
				};
			}
		},
		p = {},
		r = (function r(t) {
			var e = p[t];
			if (void 0 !== e) return e.exports;
			var y = (p[t] = { exports: {} });
			return o[t](y, y.exports, r), y.exports;
		})(808);
	(yoyoApp = void 0 === yoyoApp ? {} : yoyoApp).test2 = r.default;
})();
