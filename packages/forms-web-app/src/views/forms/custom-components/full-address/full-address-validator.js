import { body } from 'express-validator';
import AddressValidator, {
	addressLine1MaxLength,
	addressLine1MinLength,
	addressLine2MaxLength,
	addressLine2MinLength,
	townCityMaxLength,
	townCityMinLength,
	postcodeMaxLength,
	postcodeMinLength,
	validatePostcode
	// @ts-expect-error - due to not having @types
} from '@planning-inspectorate/dynamic-forms/src/validator/address-validator.js';

export const countryMaxLength = 250;
export const countryMinLength = 0;

export default class FullAddressValidator extends AddressValidator {
	constructor(opts) {
		super(opts);
	}

	validate(questionObj) {
		const { fieldName, addressLabels } = questionObj;
		return [
			this.addressLine1Rule(fieldName, addressLabels.addressLine1),
			this.addressLine2Rule(fieldName, addressLabels.addressLine2),
			this.townCityRule(fieldName, addressLabels.townCity),
			this.countryRule(fieldName, addressLabels.country),
			this.postCodeRule(fieldName, addressLabels.postcode)
		];
	}

	addressLine1Rule(fieldName, fieldLabel) {
		const validator = body(fieldName + '_addressLine1');

		if (!this.requiredFields?.addressLine1) {
			validator.optional({ checkFalsy: true });
		} else {
			validator.notEmpty().withMessage(`Enter ${fieldLabel.toLocaleLowerCase()}`);
		}

		return validator
			.isLength({ min: addressLine1MinLength, max: addressLine1MaxLength })
			.bail()
			.withMessage(`${fieldLabel} must be ${addressLine1MaxLength} characters or less`);
	}

	addressLine2Rule(fieldName, fieldLabel) {
		const validator = body(fieldName + '_addressLine2');
		if (!this.requiredFields?.addressLine2) {
			validator.optional({ checkFalsy: true });
		} else {
			validator.notEmpty().withMessage(`Enter ${fieldLabel.toLocaleLowerCase()}`);
		}

		return validator
			.isLength({ min: addressLine2MinLength, max: addressLine2MaxLength })
			.bail()
			.withMessage(`${fieldLabel} must be ${addressLine2MaxLength} characters or less`);
	}

	townCityRule(fieldName, fieldLabel) {
		const validator = body(fieldName + '_townCity');
		if (!this.requiredFields?.townCity) {
			validator.optional({ checkFalsy: true });
		} else {
			validator.notEmpty().withMessage(`Enter ${fieldLabel.toLocaleLowerCase()}`);
		}
		return validator
			.isLength({ min: townCityMinLength, max: townCityMaxLength })
			.bail()
			.withMessage(`${fieldLabel} must be ${townCityMaxLength} characters or less`);
	}

	postCodeRule(fieldName, fieldLabel) {
		const validator = body(fieldName + '_postcode');
		if (!this.requiredFields?.postcode) {
			validator.optional({ checkFalsy: true });
		} else {
			validator.notEmpty().withMessage(`Enter ${fieldLabel.toLocaleLowerCase()}`);
		}

		return validator
			.isLength({ min: postcodeMinLength, max: postcodeMaxLength })
			.bail()
			.withMessage(`Enter a valid ${fieldLabel.toLocaleLowerCase()}`)
			.custom((postcode) => {
				return validatePostcode(postcode, `Enter a valid ${fieldLabel.toLocaleLowerCase()}`);
			});
	}

	countryRule(fieldName, fieldLabel) {
		const validator = body(fieldName + '_country');
		if (!this.requiredFields?.country) {
			validator.optional({ checkFalsy: true });
		} else {
			validator.notEmpty().withMessage(`Enter ${fieldLabel.toLocaleLowerCase()}`);
		}

		return validator
			.isLength({ min: countryMinLength, max: countryMaxLength })
			.bail()
			.withMessage(`${fieldLabel} must be ${countryMaxLength} characters or less`);
	}
}
