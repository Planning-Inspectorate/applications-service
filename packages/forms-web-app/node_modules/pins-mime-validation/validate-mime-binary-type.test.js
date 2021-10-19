const CrossBlob = require("cross-blob");
const {
  MIME_BINARY_TYPE_DOC,
  MIME_TYPE_DOCX,
  MIME_TYPE_PDF,
  MIME_TYPE_JPEG,
  MIME_TYPE_TIF,
  MIME_TYPE_PNG,
} = require("./mime-types");

const { validateMimeBinaryType } = require("./index");

function MockFile() {}

MockFile.prototype.create = (name, size, mimeType, filePath) => {
  const blobStream = new CrossBlob(["a".repeat(size)], { type: mimeType });
  blobStream.name = name;
  blobStream.mimetype = mimeType;
  blobStream.tempFilePath = filePath;

  return blobStream;
};

// mock file test harness
describe("Mock file for file upload testing", function mockFileValid() {
  it("should be valid when binary content type is in valid list", async () => {
    const mock = new MockFile();
    const file = mock.create(
      "example.jpeg",
      1024,
      MIME_TYPE_JPEG,
      `${__dirname}/file_example.jpeg`
    );
    expect(
      await validateMimeBinaryType(
        file,
        [
          MIME_BINARY_TYPE_DOC,
          MIME_TYPE_DOCX,
          MIME_TYPE_PDF,
          MIME_TYPE_JPEG,
          MIME_TYPE_TIF,
          MIME_TYPE_PNG,
        ],
        "The selected file must be a DOC, DOCX, PDF, TIF, JPG or PNG"
      )
    ).toBeTruthy();
  });

  it("should be invalid when binary content type is not in valid list", async () => {
    const mock = new MockFile();
    const file = mock.create(
      "example.ods",
      1024,
      "application/vnd.oasis.opendocument.spreadsheet",
      `${__dirname}/file_example.ods`
    );
    expect.assertions(1);
    await expect(
      validateMimeBinaryType(
        file,
        [
          MIME_BINARY_TYPE_DOC,
          MIME_TYPE_DOCX,
          MIME_TYPE_PDF,
          MIME_TYPE_JPEG,
          MIME_TYPE_TIF,
          MIME_TYPE_PNG,
        ],
        "The selected file must be a DOC, DOCX, PDF, TIF, JPG or PNG"
      )
    ).rejects.toEqual(
      TypeError("The selected file must be a DOC, DOCX, PDF, TIF, JPG or PNG")
    );
  });

  it("should resolve to true with undefined file", async () => {
    expect.assertions(1);
    await expect(validateMimeBinaryType(undefined, [], "")).resolves.toBe(true);
  });

  it("should resolve to true with undefined temporary file path", async () => {
    const mock = new MockFile();
    const file = mock.create(
      "example.ods",
      1024,
      "application/vnd.oasis.opendocument.spreadsheet",
      undefined
    );
    expect.assertions(1);
    await expect(validateMimeBinaryType(file, [], "")).resolves.toBe(true);
  });
});
