import PageObject from '../../PageObject';

class PO_SayAboutNationalInfraProject extends PageObject {
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
}
export default PO_SayAboutNationalInfraProject;
