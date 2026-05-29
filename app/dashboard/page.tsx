"use client";

import { useEffect, useState } from "react";
import TranslationChart from "@/components/TranslationChart";

interface HistoryItem {
    source: string;
    target: string;
    text: string;
    result: string;
    date: string;
}

export default function DashboardPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const data = JSON.parse(
            localStorage.getItem("history") || "[]"
        );

        setHistory(data);
    }, []);

    const totalTranslations = history.length;

    const languageStats: Record<string, number> = {};

    history.forEach((item) => {
        const key = `${item.source} → ${item.target}`;

        languageStats[key] =
            (languageStats[key] || 0) + 1;
    });

    const mostUsed =
        Object.entries(languageStats).sort(
            (a, b) => b[1] - a[1]
        )[0];

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                📊 Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-4">

                <div className="border rounded p-4">
                    <h2 className="font-bold">
                        Jami tarjimalar
                    </h2>

                    <p className="text-4xl mt-3">
                        {totalTranslations}
                    </p>
                </div>

                <div className="border rounded p-4">
                    <h2 className="font-bold">
                        Eng ko‘p ishlatilgan
                    </h2>

                    <p className="mt-3">
                        {mostUsed
                            ? mostUsed[0]
                            : "Ma'lumot yo'q"}
                    </p>
                </div>

                <div className="border rounded p-4">
                    <h2 className="font-bold">
                        Oxirgi tarjima
                    </h2>

                    <p className="mt-3">
                        {history[0]?.date ||
                            "Ma'lumot yo'q"}
                    </p>
                </div>

            </div>

            <div className="mt-8 border rounded p-5">

                <h2 className="font-bold text-xl mb-4">
                    Tarjima statistikasi
                </h2>

                {Object.entries(languageStats).map(
                    ([lang, count]) => (
                        <div
                            key={lang}
                            className="mb-3"
                        >
                            <div className="flex justify-between">
                                <span>{lang}</span>
                                <span>{count}</span>
                            </div>

                            <div className="w-full bg-gray-200 rounded h-4">
                                <div
                                    className="bg-blue-600 h-4 rounded"
                                    style={{
                                        width: `${(count /
                                            totalTranslations) *
                                            100
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    )
                )}

            </div>

            <TranslationChart
                labels={Object.keys(languageStats)}
                values={Object.values(languageStats)}
            />

        </div>
    );
}