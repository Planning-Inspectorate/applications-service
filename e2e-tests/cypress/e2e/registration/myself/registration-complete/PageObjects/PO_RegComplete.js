class PO_RegComplete {
	identifiers = {};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}
}
export default PO_RegComplete;
