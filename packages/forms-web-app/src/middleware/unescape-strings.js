const htmlEscaper = require('html-escaper');

const unescapeStrings = (ref, formFields) => (req, res, next) => {
  try {
    formFields.forEach((formField) => {
      const fieldRef = req[ref];

      if (!fieldRef) return;

      const field = fieldRef[formField];

      if (!field) return;

      const unescapedString = htmlEscaper.unescape(field);

      req[ref][formField] = unescapedString;
    });

    return next();
  } catch {
    return next();
  }
};

module.exports = unescapeStrings;
