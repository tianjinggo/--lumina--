import { HealingResult } from "../types";

// DashScope API Key - 使用 sk- 前缀 + AccessKey ID + Secret 组合
const DASHSCOPE_API_KEY = import.meta.env.VITE_ALIYUN_ACCESS_KEY_ID
  ? `sk-${import.meta.env.VITE_ALIYUN_ACCESS_KEY_ID}${import.meta.env.VITE_ALIYUN_ACCESS_KEY_SECRET}`
  : '';

console.log('DashScope API Key loaded:', DASHSCOPE_API_KEY ? 'Yes' : 'No');

// 使用 DashScope API 调用通义千问
export const processHealingJourney = async (story: string): Promise<HealingResult> => {
  const prompt = `用户分享了以下故事进行治愈和反思："${story}"

请分析此故事并提供（用中文回答）：
1. 一个富有隐喻的章节标题（例如："第一关：解开心结"）
2. 一段用于冥想课程的诗意且支持性的反思感言（最多30个中文字）
3. 一段简短的漫画式卡片文案（最多15个中文字）
4. 一个"智者导师"的见解，侧重于情绪成长和视角转变（30-60个中文字）
5. 一个模拟的压力减轻百分比（介于 -5 到 -30 之间的负数）

请严格按照以下 JSON 格式返回结果（不要包含其他文字）：
{
  "sessionTitle": "章节标题",
  "metaphor": "反思感言",
  "comicCaption": "卡片文案",
  "mentorSageInsight": "导师见解",
  "stressLevelChange": -15
}`;

  try {
    // 使用通义千问 API
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        messages: [
          {
            role: 'system',
            content: '你是一位温暖、富有同理心的心理治愈导师。你善于用隐喻和诗意的方式帮助人们反思和成长。总是返回 JSON 格式的结果。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('阿里云 API Error:', errorText);
      throw new Error(`API 请求失败: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('阿里云 API 响应:', data);

    // 解析响应 - 使用 OpenAI 兼容格式
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('API 返回数据格式错误');
    }

    // 尝试从响应中提取 JSON
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as HealingResult;
    } else {
      throw new Error('无法从响应中提取 JSON');
    }
  } catch (error) {
    console.error("阿里云 API Error:", error);
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
