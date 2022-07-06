const sanitiseString = (stringToSanitise) => {
  let sanitisedString = stringToSanitise
    .replace(/<[^>]*>/gm, '')
    .replace(/ {2,}/gm, ' ').trim()
    .replace(/(\r )/gm, '\r')
    .replace(/(\n )/gm, '\n')
    .replace(/^(\r\n|\n|\r){2,}/gm, '$1');

  return encodeURIComponent(sanitisedString);
}

export default sanitiseString;
