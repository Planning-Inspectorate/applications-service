import PageObject from '../../PageObject';

class PO_SayDuringExaminationOfProject extends PageObject {
	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => {
					const value = this[prop];
					if (typeof value !== 'function') {
						throw new Error(`Function "${String(prop)}" was not found on ${this.constructor.name}`);
					}
					return value.bind(this);
				}
			}
		);
	}

	assertLinksPresentOnPage(table) {
		super.assertLinksPresentOnPage(table);
	}
}
export default PO_SayDuringExaminationOfProject;
