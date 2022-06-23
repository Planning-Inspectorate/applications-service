const htmlEscaper = require('html-escaper');
const { collapse } = require('string-collapse-white-space');
const { stripHtml } = require('string-strip-html');

const sanitiseStrings = (ref, formFields) => (req, res, next) => {
  try {
    formFields.forEach((formField) => {
      const fieldRef = req[ref];

      if (!fieldRef) return;

      const field = fieldRef[formField];

      if (!field) return;

      const stripedHtml = stripHtml(field).result;
      const collapsedWhitespace = collapse(stripedHtml).result
      const escapedString = htmlEscaper.escape(collapsedWhitespace);

      req[ref][formField] = escapedString;
    });

    return next();
  } catch {
    return next();
  }
};

module.exports = sanitiseStrings;
