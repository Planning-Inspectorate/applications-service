const fileContentType = require("file-type");
const fs = require("fs");

const validMimeType = (givenMimeType, allowableMimeTypes, errorMessage) => {
  if (!allowableMimeTypes.includes(givenMimeType)) {
    throw new Error(errorMessage);
  }

  return true;
};

const validateMimeBinaryType = async (
  fileInformation,
  allowableMimeTypes,
  errorMessage
) => {
  if (typeof fileInformation !== "undefined") {
    if (typeof fileInformation.tempFilePath !== "undefined") {
      const fileStream = fs.createReadStream(fileInformation.tempFilePath);
      const fileStreamType = await fileContentType.fromStream(fileStream);
      validMimeType(fileStreamType?.mime, allowableMimeTypes, errorMessage);
    }
  }
  return true;
};

module.exports = { validMimeType, validateMimeBinaryType };
