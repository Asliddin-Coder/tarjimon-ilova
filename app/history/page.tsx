"use client";

import { useEffect, useState } from "react";

interface HistoryItem {
  source: string;
  target: string;
  text: string;
  result: string;
  date: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("history") || "[]"
    );

    setHistory(data);
  }, []);

  const clearHistory = () => {
    if (
      confirm(
        "Tarixni tozalashni xohlaysizmi?"
      )
    ) {
      localStorage.removeItem("history");
      setHistory([]);
    }
  };

  const exportHistory = () => {
    const blob = new Blob(
      [JSON.stringify(history, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "translation-history.json";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          📜 Tarjima Tarixi
        </h1>

        <div className="flex gap-2">

          <button
            onClick={exportHistory}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export JSON
          </button>

          <button
            onClick={clearHistory}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Tarixni tozalash
          </button>

        </div>

      </div>

      {history.length === 0 ? (
        <div className="border rounded p-6 text-center">
          Tarix mavjud emas
        </div>
      ) : (
        <div className="grid gap-4">

          {history.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-5 shadow-sm"
            >

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  {item.source} → {item.target}
                </span>

                <span className="text-sm text-gray-500">
                  {item.date}
                </span>

              </div>

              <div className="mb-3">

                <p className="font-medium">
                  Kiritilgan matn:
                </p>

                <p>
                  {item.text}
                </p>

              </div>

              <div>

                <p className="font-medium">
                  Tarjima:
                </p>

                <p>
                  {item.result}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}