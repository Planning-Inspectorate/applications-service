/**
 * Replaces newline characters (\r\n, \r, \n) in a string with an HTML line break tag (\<br>).
 * For any falsy input (null, undefined, empty string, etc.), the function returns the input as is.
 *
 * @param {string} text The input text.
 * @return {string} The text with newline characters replaced by \<br>.
 */
const preserveLinebreaks = (text) => (!text ? text : text.replace(/\r\n|\r|\n/g, '<br>'));

module.exports = {
	preserveLinebreaks
};
