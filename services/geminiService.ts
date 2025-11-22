import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from environment variables
// Note: In a real production app, ensure process.env.API_KEY is defined.
// If it's undefined, the SDK will throw an error when used.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "Erro: Chave de API não encontrada. Por favor, configure sua API KEY.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Nenhum texto foi gerado.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, encontrei um erro ao processar sua solicitação. Verifique sua chave de API ou conexão.";
  }
};