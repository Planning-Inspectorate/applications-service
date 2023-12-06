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

const mockApplicantMessage = {
	...mockBaseMessage,
	serviceUserType: 'Applicant'
};

const mockRepresentationContactMessage = {
	...mockBaseMessage,
	serviceUserType: 'RepresentationContact'
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

const mockRepresentationContactServiceUser = {
	serviceUserId: mockRepresentationContactMessage.id,
	firstName: mockRepresentationContactMessage.firstName,
	lastName: mockRepresentationContactMessage.lastName,
	organisationName: mockRepresentationContactMessage.organisation,
	caseReference: mockRepresentationContactMessage.caseReference,
	serviceUserType: mockRepresentationContactMessage.serviceUserType
};

module.exports = {
	mockMessageWithInvalidServiceUserType,
	mockApplicantMessage,
	mockApplicantServiceUser,
	mockRepresentationContactMessage,
	mockRepresentationContactServiceUser
};
