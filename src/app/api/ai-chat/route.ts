import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI API key not configured" }, { status: 500 });
  }

  try {
    const { message, locale } = await req.json();

    const systemPrompt = `You are AgriAI, an expert agricultural assistant for Indian farmers. You provide advice on:
- Crop recommendations based on season, soil, and region
- Pest and disease identification and treatment
- Irrigation scheduling
- Fertilizer and nutrient management
- Market timing advice
- Weather-based farming decisions

Rules:
- Be concise and practical. Farmers need actionable advice.
- Use simple language. If locale is "kn", respond in Kannada. If "hi", respond in Hindi. Otherwise English.
- Always mention specific product names, dosages, and timing when recommending treatments.
- If you don't know something, say so honestly.
- Include costs/prices in Indian Rupees (₹) when relevant.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: "AI API error", details: errData },
        { status: res.status }
      );
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
  }
}
