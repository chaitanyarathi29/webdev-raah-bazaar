import { NextRequest } from "next/server";

// app/api/translate/route.ts
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, targetLang }: { text: string; targetLang: string } = body;

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: 'text',
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ translation: data.data.translations[0].translatedText }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
