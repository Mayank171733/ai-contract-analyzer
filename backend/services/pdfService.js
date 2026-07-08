const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractText = async (filePath) => {
  try {

    if (filePath.endsWith(".pdf")) {

      const dataBuffer = fs.readFileSync(filePath);

      const data = await pdf(dataBuffer);

      return data.text;
    }


    if (filePath.endsWith(".docx")) {

      const result = await mammoth.extractRawText({
        path: filePath
      });

      return result.value;
    }


    throw new Error("Unsupported file type");

  } catch (error) {
    console.log("Text extraction error:", error.message);
    throw error;
  }
};

module.exports = extractText;