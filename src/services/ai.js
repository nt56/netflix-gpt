import { GEMINI_KEY, GEMINI_MODEL } from "../config/constants";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Sends a prompt to Gemini and returns the reply as plain text
const askGemini = async (prompt) => {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    const error = new Error(json.error?.message || "Gemini request failed");
    error.status = response.status;
    throw error;
  }

  const parts = json.candidates?.[0]?.content?.parts ?? [];
  return parts.map((part) => part.text ?? "").join("");
};

export default askGemini;
