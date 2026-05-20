import { Given, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from './PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_WhoYouRegisterFor from '../../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to UK address details page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Myself');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	emailAddressPage.selectRadioYesOrNo('Yes');
	emailAddressPage.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('test@gmail.com');
	emailAddressPage.clickSaveAndContinue();
});

And('I continue with the following values in the address fields', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
	addressDetails.clickSaveAndContinue();
});
