import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, source, target } =
      await req.json();

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${source}|${target}`
    );

    const data = await response.json();

    return NextResponse.json({
      translatedText:
        data.responseData.translatedText,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        translatedText:
          "Tarjima qilishda xatolik yuz berdi",
      },
      {
        status: 500,
      }
    );
  }
}