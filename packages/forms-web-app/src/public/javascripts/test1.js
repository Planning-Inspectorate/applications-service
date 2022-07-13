var yoyoApp;
(() => {
	var o = {
			575: (o) => {
				o.exports = {
					yoyo: function () {
						console.log('this does yoyo');
					}
				};
			}
		},
		p = {},
		r = (function r(t) {
			var y = p[t];
			if (void 0 !== y) return y.exports;
			var e = (p[t] = { exports: {} });
			return o[t](e, e.exports, r), e.exports;
		})(575);
	(yoyoApp = void 0 === yoyoApp ? {} : yoyoApp).test1 = r;
})();
