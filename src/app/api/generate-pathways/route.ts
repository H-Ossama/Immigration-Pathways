import { NextRequest, NextResponse } from "next/server";

const SYSTEM_MESSAGE = `You are an immigration assistant. Provide only general informational guidance. Do not provide legal advice. Always recommend official government sources and include direct links. Be transparent when unsure. Avoid hallucinating.`;

const RESPONSE_FORMAT = `{
  "summary": "short overview",
  "pathways": [
    {
      "title": "",
      "best_for": "",
      "difficulty": "Easy|Medium|Hard",
      "timeline": "",
      "estimated_cost": "",
      "steps": ["", "", ""],
      "requirements": ["", "", ""],
      "documents": ["", "", ""],
      "official_links": [
        { "label": "", "url": "" }
      ],
      "warnings": ["", ""],
      "next_actions": ["", ""]
    }
  ]
}`;

import { DEFAULT_FREE_KEY } from "@/lib/constants";

async function callAI(formData: any, apiKey: string, provider: string, model: string) {
    const finalApiKey = apiKey || DEFAULT_FREE_KEY;
    const finalModel = model || 'gemini-2.5-flash';
    const finalProvider = provider || 'google';

    const userMessage = `
User Profile:
${JSON.stringify(formData, null, 2)}

Task:
Suggest the best immigration pathways for this user to move abroad based on their goal (study/work/etc.). Provide 3–6 pathways, each with steps, requirements, estimated time/cost, and official links. Format in strict JSON.

AI Response Format (STRICT JSON)
Must return this exact JSON shape:
${RESPONSE_FORMAT}
`;

    if (finalProvider === 'google') {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${finalModel}:generateContent?key=${finalApiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${SYSTEM_MESSAGE}\n\n${userMessage}`
                    }]
                }],
                generationConfig: {
                    response_mime_type: "application/json",
                    temperature: 0.7,
                }
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || "Google AI Request failed");
        }

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;

        try {
            return JSON.parse(content);
        } catch (e) {
            console.error("Failed to parse Google AI response:", content);
            throw new Error("Invalid JSON response from Google AI");
        }
    } else {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${finalApiKey}`,
            },
            body: JSON.stringify({
                model: finalModel,
                messages: [
                    { role: "system", content: SYSTEM_MESSAGE },
                    { role: "user", content: userMessage },
                ],
                response_format: { type: "json_object" },
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || "OpenAI Request failed");
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        try {
            return JSON.parse(content);
        } catch (e) {
            throw new Error("Invalid JSON response from OpenAI");
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { apiKey, ...formData } = body;

        let results;
        try {
            // First attempt
            results = await callAI(formData, apiKey, body.aiProvider, body.aiModel);
        } catch (err: any) {
            console.warn("First attempt failed, retrying...", err.message);
            // Automatic retry once
            try {
                results = await callAI(formData, apiKey, body.aiProvider, body.aiModel);
            } catch (retryErr: any) {
                return NextResponse.json(
                    { message: `AI Error: ${retryErr.message}` },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json(results);
    } catch (err: any) {
        console.error("API Route Error:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
