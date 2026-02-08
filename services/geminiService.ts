
import { GoogleGenAI, Type } from "@google/genai";
import { HealingResult } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const processHealingJourney = async (story: string): Promise<HealingResult> => {
  const prompt = `
    用户分享了以下故事进行治愈和反思：
    "${story}"

    请用中文分析此故事并提供：
    1. 一个富有隐喻的章节标题（例如：“第一关：解开心结”）。
    2. 一段用于冥想课程的诗意且支持性的反思感言（最多30个中文字）。
    3. 一段简短的漫画式卡片文案（最多15个中文字）。
    4. 一个“智者导师”的见解，侧重于情绪成长和视角转变（30-60个中文字）。
    5. 一个模拟的压力减轻百分比（介于 -5 到 -30 之间）。

    请严格按以下 JSON 格式返回结果。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sessionTitle: { type: Type.STRING },
            metaphor: { type: Type.STRING },
            comicCaption: { type: Type.STRING },
            mentorSageInsight: { type: Type.STRING },
            stressLevelChange: { type: Type.NUMBER },
          },
          required: ["sessionTitle", "metaphor", "comicCaption", "mentorSageInsight", "stressLevelChange"],
        },
      },
    });

    return JSON.parse(response.text.trim()) as HealingResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    // 回退数据
    return {
      sessionTitle: "新的篇章",
      metaphor: "你的思绪如同山间飘过的云，暂时且轻柔。",
      comicCaption: "风暴已过，花朵在寂静中悄然绽放。",
      mentorSageInsight: "感谢你分享自己的故事。你写下的每一个字，都是迈向更清晰、更平静的自己的重要一步。请带着这份觉察继续前行。",
      stressLevelChange: -15,
    };
  }
};
