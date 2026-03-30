const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

const getAverageWordConfidence = (fullTextAnnotation) => {
  const pages = fullTextAnnotation?.pages || [];
  let totalConfidence = 0;
  let totalWords = 0;

  for (const page of pages) {
    for (const block of page.blocks || []) {
      for (const paragraph of block.paragraphs || []) {
        for (const word of paragraph.words || []) {
          if (typeof word.confidence === "number") {
            totalConfidence += word.confidence;
            totalWords += 1;
          }
        }
      }
    }
  }

  if (totalWords === 0) {
    return null;
  }

  return totalConfidence / totalWords;
};

const extractTextFromImageBuffer = async (buffer) => {
  const [result] = await client.documentTextDetection({
    image: {
      content: buffer.toString("base64"),
    },
  });

  const fullText = result.fullTextAnnotation?.text || "";
  const confidence = getAverageWordConfidence(result.fullTextAnnotation);

  return {
    text: fullText.trim(),
    confidence,
  };
};

module.exports = {
  extractTextFromImageBuffer,
};