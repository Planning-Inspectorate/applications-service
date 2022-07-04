const sanitise = (string) => {
  const removedHTML = string.replace(/<\/?[^>]+(>|$)/gm, '');
  const removedWhiteSpace = removedHTML.replace(/ {2,}/gm, '').trim();
  const removedReturns = removedWhiteSpace.replace(/^(\r\n|\n|\r){2,}/gm, '$1');
  const encodedURI = encodeURIComponent(removedReturns);

  return encodedURI;
}

export default sanitise;
