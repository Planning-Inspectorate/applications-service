/**
 * Used in controller post response to create an object that can pass errors and url back to FE.
 * @param error: true/false to indicate errors exist
 * @param url: to redirect to after submission
 */
function sanitiseFormPostResponse(error, url) {
	this.error = error;
	this.url = url;
}

module.exports = { sanitiseFormPostResponse };
