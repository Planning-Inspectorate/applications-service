import PageObject from "../../PageObject";

class PO_EmailAddress extends PageObject{

    enterTextIntoEmailField(dataInput) {
      super.enterTextIntoField(dataInput, '#email')
    }

}
export default PO_EmailAddress;
