const { validMimeType } = require("./index");

describe("validMimeType", () => {
  it("should be valid", () => {
    const mimes = ["a", "b", "c"];

    mimes.forEach((mime) => expect(validMimeType(mime, mimes)).toBeTruthy());
  });

  [
    {
      givenMimeType: "x",
      allowableMimeTypes: ["y"],
      errorMessage:
        "Doc is the wrong file type: The file must be a Something, or Something",
    },
    {
      givenMimeType: "x",
      allowableMimeTypes: ["y", "z"],
      errorMessage:
        "Doc is the wrong file type: The file must be a Something, or Something",
    },
    {
      givenMimeType: "x",
      allowableMimeTypes: ["y", "z", "qqq"],
      errorMessage: "Can be anything - exact words are not important",
    },
  ].forEach(({ givenMimeType, allowableMimeTypes, errorMessage }) => {
    it("should throw", () => {
      expect(() =>
        validMimeType(givenMimeType, allowableMimeTypes, errorMessage)
      ).toThrow(errorMessage);
    });
  });
});
