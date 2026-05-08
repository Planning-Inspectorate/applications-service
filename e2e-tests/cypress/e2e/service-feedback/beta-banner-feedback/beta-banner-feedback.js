import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_Homepage from '../../common/PageObjects/PO_Homepage';

const homepage = new PO_Homepage();

Given('I open the local homepage for feedback', () => {
	homepage.openHomepage();
	homepage.assertWelcomeHeading();
});

Then('the beta banner feedback link points to the service feedback form', () => {
	homepage.assertFeedbackLinkTargetIncludes('forms.office.com/Pages/ResponsePage.aspx');
});
