"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";

export default function ImageTranslator() {
    const [image, setImage] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImage = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];


        if (!file) return;

        setImage(file);

        try {
            setLoading(true);

            const result = await Tesseract.recognize(
                file,
                "eng"
            );

            const extractedText =
                result.data.text.trim();

            console.log(
                "OCR TEXT:",
                extractedText
            );

            setText(extractedText);

            if (!extractedText) {
                setTranslatedText(
                    "Rasm ichidan matn topilmadi"
                );
                return;
            }

            const res = await fetch(
                "/api/translate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        text: extractedText,
                        source: "en",
                        target: "uz",
                    }),
                }
            );

            const translated =
                await res.json();

            console.log(
                "OCR API:",
                translated
            );

            setTranslatedText(
                translated.translatedText ||
                "Tarjima topilmadi"
            );
        } catch (error) {
            console.error(
                "OCR ERROR:",
                error
            );

            setTranslatedText(
                "Xatolik yuz berdi"
            );
        } finally {
            setLoading(false);
        }


    };

    return (<div className="border rounded-lg p-5 mt-8"> <h2 className="text-2xl font-bold mb-4">
        📷 Rasm orqali tarjima </h2>


        <input
            type="file"
            accept="image/*"
            onChange={handleImage}
        />

        {loading && (
            <p className="mt-4">
                OCR ishlamoqda...
            </p>
        )}

        {text && (
            <div className="mt-4">
                <h3 className="font-semibold mb-2">
                    Topilgan matn:
                </h3>

                <textarea
                    value={text}
                    readOnly
                    rows={6}
                    className="w-full border rounded p-3"
                />
            </div>
        )}

        {translatedText && (
            <div className="mt-4">
                <h3 className="font-semibold mb-2">
                    Tarjima:
                </h3>

                <textarea
                    value={translatedText}
                    readOnly
                    rows={6}
                    className="w-full border rounded p-3"
                />
            </div>
        )}
    </div>


    );
}
