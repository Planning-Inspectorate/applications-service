const fileTypeDisplayHelper = require('../../../src/lib/file-type-display-helper');

describe('lib/file-type-display-helper', () => {
  [
    {
      given: 'application/pdf',
      expected: 'PDF',
    },
    {
      given: 'text/html',
      expected: 'HTML',
    },
    {
      given: 'video/mp4',
      expected: 'Video',
    },
    {
      given: 'video/mpeg',
      expected: 'Audio',
    },
    {
      given: 'application/msword',
      expected: 'Word',
    },
    {
      given: 'application/x-unknown',
      expected: 'application/x-unknown',
    },
  ].forEach(({ given, expected }) => {
    it(`should display the expected file size - ${expected}`, () => {
      expect(fileTypeDisplayHelper(given)).toBe(expected);
    });
  });
});
