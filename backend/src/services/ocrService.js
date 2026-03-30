const Tesseract = require("tesseract.js");

const extractTextFromImageBuffer = async (buffer) => {
  const language = process.env.TESSERACT_LANG || "eng";
  const {
    data: { text, confidence },
  } = await Tesseract.recognize(buffer, language);

  const normalizedConfidence =
    typeof confidence === "number"
      ? Math.max(0, Math.min(1, confidence / 100))
      : null;

  return {
    text: (text || "").trim(),
    confidence: normalizedConfidence,
  };
};

module.exports = {
  extractTextFromImageBuffer,
};