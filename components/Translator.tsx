"use client";

import { useState } from "react";

const languages = [
    { code: "uz", name: "O'zbekcha" },
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "tr", name: "Türkçe" },
    { code: "de", name: "Deutsch" },
    { code: "fr", name: "Français" },
];

export default function Translator() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const [source, setSource] = useState("uz");
    const [target, setTarget] = useState("en");

    const startListening = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Brauzeringiz Speech Recognition funksiyasini qo‘llab-quvvatlamaydi!"
            );
            return;
        }

        const speechLanguages: Record<string, string> = {
            uz: "uz-UZ",
            en: "en-US",
            ru: "ru-RU",
            tr: "tr-TR",
            de: "de-DE",
            fr: "fr-FR",
        };

        const recognition = new SpeechRecognition();

        recognition.lang =
            speechLanguages[source] || "en-US";

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event: any) => {
            const transcript =
                event.results[0][0].transcript;

            setText(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error(
                "Speech Recognition xatosi:",
                event.error
            );

            alert(
                "Mikrofondan foydalanishda xatolik yuz berdi!"
            );
        };

    };

    const swapLanguages = () => {
        setSource(target);
        setTarget(source);


        setText(result);
        setResult(text);


    };

    const translateText = async () => {
        if (!text.trim()) return;


        try {
            setLoading(true);

            const res = await fetch("/api/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text,
                    source,
                    target,
                }),
            });

            const data = await res.json();

            setResult(data.translatedText);

            const history = JSON.parse(
                localStorage.getItem("history") || "[]"
            );

            history.unshift({
                source,
                target,
                text,
                result: data.translatedText,
                date: new Date().toLocaleString(),
            });

            localStorage.setItem(
                "history",
                JSON.stringify(history)
            );
        } catch (error) {
            console.error(error);
            setResult(
                "Tarjima qilishda xatolik yuz berdi!"
            );
        } finally {
            setLoading(false);
        }


    };

    const copyText = () => {
        navigator.clipboard.writeText(result);
        alert("Nusxalandi!");
    };

    const speakText = () => {
        if (!result) return;


        const utterance =
            new SpeechSynthesisUtterance(result);

        utterance.lang = target;

        speechSynthesis.speak(utterance);

    };

    return (<div className="max-w-3xl mx-auto p-6"> <h1 className="text-3xl font-bold mb-6">
        🌍 Tarjimon ilovasi </h1>

        <div className="flex items-center gap-3 mb-4">
            <select
                value={source}
                onChange={(e) =>
                    setSource(e.target.value)
                }
                className="border rounded p-2"
            >
                {languages.map((lang) => (
                    <option
                        key={lang.code}
                        value={lang.code}
                    >
                        {lang.name}
                    </option>
                ))}
            </select>

            <button
                onClick={swapLanguages}
                className="border px-3 py-2 rounded"
            >
                🔄
            </button>

            <select
                value={target}
                onChange={(e) =>
                    setTarget(e.target.value)
                }
                className="border rounded p-2"
            >
                {languages.map((lang) => (
                    <option
                        key={lang.code}
                        value={lang.code}
                    >
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>

        <textarea
            rows={7}
            value={text}
            onChange={(e) =>
                setText(e.target.value)
            }
            placeholder="Matn kiriting..."
            className="w-full border rounded p-3"
        />

        <div className="flex gap-2 mt-4">
            <button
                onClick={translateText}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading
                    ? "Tarjima qilinmoqda..."
                    : "Tarjima qilish"}
            </button>

            <button
                onClick={startListening}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                🎤 Gapirish
            </button>
        </div>

        {result && (
            <div className="mt-6 border rounded p-4">
                <h2 className="font-bold mb-3">
                    Natija
                </h2>

                <p className="mb-4">
                    {result}
                </p>

                <button
                    onClick={copyText}
                    className="border px-3 py-2 rounded mr-2"
                >
                    📋 Nusxalash
                </button>

                <button
                    onClick={speakText}
                    className="border px-3 py-2 rounded"
                >
                    🔊 O‘qish
                </button>
            </div>
        )}
    </div>

    );
}
