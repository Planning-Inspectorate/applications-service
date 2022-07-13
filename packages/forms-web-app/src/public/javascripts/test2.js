var yoyoApp;
(() => {
	var o = {
			741: (o) => {
				o.exports = function () {
					console.log('this is yoyo2');
				};
			}
		},
		p = {},
		r = (function r(t) {
			var y = p[t];
			if (void 0 !== y) return y.exports;
			var e = (p[t] = { exports: {} });
			return o[t](e, e.exports, r), e.exports;
		})(741);
	(yoyoApp = void 0 === yoyoApp ? {} : yoyoApp).test2 = r;
})();
