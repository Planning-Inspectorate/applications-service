const mockMessageWithInvalidServiceUserType = {
	id: '123',
	serviceUserType: 'Invalid'
};

const mockBaseMessage = {
	id: '123',
	firstName: 'John',
	lastName: 'Smith',
	organisation: 'ACME',
	organisationType: 'Sole Trader',
	caseReference: 'B123456',
	emailAddress: 'test@test.com',
	webAddress: 'www.test.com',
	telephoneNumber: '0123456789'
};

const mockRepresentativeMessage = {
	...mockBaseMessage,
	serviceUserType: 'Representative'
};
const mockRepresentedMessage = {
	...mockBaseMessage,
	serviceUserType: 'Represented'
};
const mockApplicantMessage = {
	...mockBaseMessage,
	serviceUserType: 'Applicant'
};

const mockRepresentativeServiceUser = {
	serviceUserId: mockRepresentativeMessage.id,
	firstName: mockRepresentativeMessage.firstName,
	lastName: mockRepresentativeMessage.lastName,
	organisationName: mockRepresentativeMessage.organisation,
	caseReference: mockRepresentativeMessage.caseReference,
	serviceUserType: mockRepresentativeMessage.serviceUserType
};
const mockRepresentedServiceUser = {
	...mockRepresentativeServiceUser,
	serviceUserType: 'Represented'
	// same as representative
};
const mockApplicantServiceUser = {
	serviceUserId: mockApplicantMessage.id,
	firstName: mockApplicantMessage.firstName,
	lastName: mockApplicantMessage.lastName,
	organisationName: mockApplicantMessage.organisation,
	caseReference: mockApplicantMessage.caseReference,
	serviceUserType: mockApplicantMessage.serviceUserType,
	email: mockApplicantMessage.emailAddress,
	webAddress: mockApplicantMessage.webAddress,
	phoneNumber: mockApplicantMessage.telephoneNumber
};

module.exports = {
	mockMessageWithInvalidServiceUserType,
	mockRepresentativeMessage,
	mockRepresentedMessage,
	mockApplicantMessage,
	mockRepresentativeServiceUser,
	mockRepresentedServiceUser,
	mockApplicantServiceUser
};
