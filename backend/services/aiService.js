const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


const analyzeContract = async (contractText) => {
    try {
        const isHindi = /[\u0900-\u097F]/.test(contractText);
        const languageInstruction = isHindi
            ? "Write the analysis in Hindi. Use Hindi language for summary, clauses, risks, and recommendations."
            : "Write the analysis in English.";

        const prompt = `
You are an AI Contract Analyzer.

Analyze the following contract.

IMPORTANT:
Return ONLY valid JSON.
Do NOT use markdown.
Do NOT wrap the response in \`\`\`json.
${languageInstruction}

Format:

{
  "summary": "",
  "riskScore": 0,
  "clauses": [],
  "risks": [],
  "recommendations": []
}

Contract:
${contractText}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });


        let result = response.text;

        result = result.replace(
            /```json|```/g,
            ""
        ).trim();

        console.log("Gemini Response:");
        console.log(result);

        return JSON.parse(result);

    } catch (error) {

        console.log("Gemini Error:", error.message);
        throw error;
    }
};


module.exports = analyzeContract;