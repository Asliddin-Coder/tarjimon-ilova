"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
    const { darkMode, toggleTheme } =
        useTheme();
    return (
        <nav className="bg-blue-600 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

                <h1 className="font-bold text-xl">
                    🌍 AI Translator
                </h1>

                <div className="flex gap-6">
                    <Link href="/">Bosh sahifa</Link>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/history">Tarix</Link>
                    <Link href="/settings">Sozlamalar</Link>
                    <button
                        onClick={toggleTheme}
                        className="border px-3 py-1 rounded"
                    >
                        {darkMode ? "☀ Light" : "🌙 Dark"}
                    </button>
                </div>

            </div>
        </nav>
    );
}