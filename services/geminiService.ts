import { GoogleGenAI, Modality } from "@google/genai";
import { MOCKUP_STYLES } from '../constants';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateMockups = async (
  patternFile: File,
  applicationPromptValue: string,
  count: number
): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = await fileToGenerativePart(patternFile);

  const generationPromises = [];
  const numStyles = MOCKUP_STYLES.length;

  for (let i = 0; i < count; i++) {
    const style = MOCKUP_STYLES[i % numStyles];
    const stylePromptValue = style.promptValue;
    
    let prompt: string;

    if (stylePromptValue === 'a flat lay') {
      prompt = `Create a photorealistic flat lay product shot of the webbing/tape itself, featuring the provided pattern. The webbing should be elegantly coiled and unfurled, similar to a product sample photo. This webbing is intended for use as ${applicationPromptValue}. The image must be a high-quality, professional-looking photo with a clean, neutral, and slightly textured background, suitable for a product catalog. Ensure the provided pattern is applied realistically to the fabric's texture and drape. Do not include any text, logos, or other objects.`;
    } else {
      prompt = `Create a photorealistic lifestyle mockup showing ${stylePromptValue}. The item is ${applicationPromptValue} which must prominently feature the provided pattern. The image must be a tasteful, high-quality, professional shot, similar to a fashion magazine or lingerie brand photoshoot. The setting should be a softly lit, neutral indoor environment. Ensure the pattern is applied naturally and realistically to the fabric texture. Do not include any text or logos.`;
    }

    const promise = ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          imagePart,
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    generationPromises.push(promise);
  }


  const responses = await Promise.allSettled(generationPromises);
  
  const successfulResults: string[] = [];
  responses.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const response = result.value;
      const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
      if (imagePart && imagePart.inlineData) {
        successfulResults.push(`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`);
      }
    } else {
      console.error(`Generation ${index + 1} failed:`, result.reason);
    }
  });

  if (successfulResults.length === 0 && responses.length > 0) {
      throw new Error("所有圖片生成失敗，請檢查 API 金鑰或稍後再試。");
  }

  return successfulResults;
};