export class FullAddress {
	constructor({ addressLine1, addressLine2, townCity, country, postcode }) {
		this.addressLine1 = addressLine1?.trim();
		this.addressLine2 = addressLine2?.trim();
		this.townCity = townCity?.trim();
		this.country = country?.trim();
		this.postcode = postcode?.trim();
	}
}
