const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { sendRequest } = require('../../support/api-helper');

Given(/^the request body contains no case reference$/, function () {
	this.requestBody = {};
});

Given(
	/^the request body contains a property "([^"]*)" with value "([^"]*)"$/,
	function (property, value) {
		if (!this.requestBody) this.requestBody = {};
		this.requestBody[property] = value;
	}
);

Given(/^the request body contains a filter with no name or value$/, function () {
	this.requestBody.filters = [{}];
});

When(/^I submit a (GET|POST) request to the (.*) endpoint$/, async function (method, path) {
	this.response = await sendRequest(method, path, this.requestBody);
});

Then(/^the response status code is (\d{3})$/, function (statusCode) {
	expect(this.response.status).to.eq(parseInt(statusCode));
});

Then(/^the response body contains error "([^"]*)"$/, function (error) {
	const body = this.response.data;

	expect(body.code).to.eq(400);
	expect(body.errors).contains(error);
});

Then(/^the response body contains (\d+) documents$/, function (count) {
	expect(this.response.data.documents).length(count);
});
