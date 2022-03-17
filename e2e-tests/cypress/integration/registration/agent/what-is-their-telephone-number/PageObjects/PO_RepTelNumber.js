import PageObject from "../../../../PageObject";

class PO_RepTelNumber extends PageObject {

    enterTextIntoRepTelephoneNumberField(dataInput) {
      super.enterTextIntoField(dataInput, '#telephone');
    }

}
export default PO_RepTelNumber;
