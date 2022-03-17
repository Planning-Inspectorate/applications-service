import PageObject from "../../../../PageObject";

class PO_TelNumber extends PageObject {

    enterTextIntoTelephoneNumberField(dataInput) {
      super.enterTextIntoField(dataInput, '#telephone');
    }

}
export default PO_TelNumber;
