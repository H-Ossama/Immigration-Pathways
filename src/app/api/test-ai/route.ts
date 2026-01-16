import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { apiKey, provider, model } = body;

        if (!apiKey) {
            return NextResponse.json({ message: "API Key is required" }, { status: 400 });
        }

        const testPrompt = "Respond with 'Yes' if you can read this.";

        if (provider === 'google') {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: testPrompt }] }],
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                return NextResponse.json({ message: err.error?.message || "Google AI test failed" }, { status: 400 });
            }
            return NextResponse.json({ message: "Successfully connected to Google Gemini!" });
        } else {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: "user", content: testPrompt }],
                    max_tokens: 5,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                return NextResponse.json({ message: err.error?.message || "OpenAI test failed" }, { status: 400 });
            }
            return NextResponse.json({ message: "Successfully connected to OpenAI GPT!" });
        }
    } catch (err: any) {
        return NextResponse.json({ message: err.message || "Internal server error during test" }, { status: 500 });
    }
}
