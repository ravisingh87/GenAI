import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const textCardSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A creative and professional job title."
        },
        tagline: {
            type: Type.STRING,
            description: "A short, catchy tagline or professional summary (max 10 words)."
        },
        email: {
            type: Type.STRING,
            description: "A fictional but professional-sounding email address."
        },
        phone: {
            type: Type.STRING,
            description: "A fictional but realistic-looking phone number in a common format (e.g., (555) 123-4567)."
        },
        website: {
            type: Type.STRING,
            description: "A fictional but professional-looking domain name (e.g., innovatesolutions.io)."
        }
    },
    required: ["title", "tagline", "email", "phone", "website"]
};

export async function generateCardContent(name: string, industry: string, design: string): Promise<string> {
  const prompt = `You are a creative branding expert. For a person named "${name}" working in the "${industry}" industry, generate the content for a unique and memorable visiting card. The desired design style is "${design}". Provide a creative job title, a short and catchy tagline (max 10 words), a fictional but realistic-sounding email address, phone number, and website URL. The tone should be professional and match the requested design style.`;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: textCardSchema,
    },
  });

  return response.text;
}

export async function generateCardImage(prompt: string): Promise<string> {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        return response.generatedImages[0].image.imageBytes;
    }
    
    throw new Error("Image generation failed or returned no images.");
}