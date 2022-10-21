const PNG_FILE = Buffer.from([
	137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0,
	0, 31, 21, 196, 137, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 13, 73, 68, 65,
	84, 24, 87, 99, 96, 248, 207, 253, 31, 0, 4, 23, 2, 10, 193, 168, 10, 247, 0, 0, 0, 0, 73, 69, 78,
	68, 174, 66, 96, 130
]);

const SUBMISSION_DATA = {
	id: 123,
	name: 'Joe Bloggs',
	email: 'joe@example.org',
	interestedParty: true,
	ipReference: '999999999',
	deadline: 'Deadline 1',
	submissionType: 'Some Type',
	submissionId: 123,
	caseReference: 'EN010120'
};

// file data in format provided by express-fileupload
const ORIGINAL_REQUEST_FILE_DATA = {
	name: 'Test.png',
	data: PNG_FILE,
	size: 83,
	encoding: '7bit',
	tempFilePath: '',
	truncated: false,
	mimetype: 'image/png',
	md5: '3ac9e57c0901b59075291537496aaf06'
};

// file data in normalised format via middleware
const REQUEST_FILE_DATA = {
	originalName: 'Test.png',
	buffer: PNG_FILE,
	size: 83,
	mimeType: 'image/png',
	md5: '3ac9e57c0901b59075291537496aaf06'
};

// file data with new file name included
const FILE_DATA = {
	name: 'Test-123-1.png',
	...REQUEST_FILE_DATA
};

// file data in create submission response body
const RESPONSE_FILE_DATA = {
	name: 'Test-123-1.png',
	originalName: 'Test.png',
	size: 83,
	md5: '3ac9e57c0901b59075291537496aaf06'
};

// file data using column names for NI DB
const DB_FILE_DATA = {
	filenameOriginal: 'Test.png',
	filename: 'Test-123-1.png',
	fileSize: 83,
	fileMD5: '3ac9e57c0901b59075291537496aaf06'
};

module.exports = {
	PNG_FILE,
	SUBMISSION_DATA,
	ORIGINAL_REQUEST_FILE_DATA,
	REQUEST_FILE_DATA,
	FILE_DATA,
	DB_FILE_DATA,
	RESPONSE_FILE_DATA
};
