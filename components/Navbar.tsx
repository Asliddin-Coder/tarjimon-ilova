"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const { darkMode, toggleTheme } =
        useTheme();

    return (<nav className="bg-blue-600 text-white shadow-md"> <div className="max-w-7xl mx-auto px-4">


        <div className="flex items-center justify-between h-16">

            <Link
                href="/"
                className="font-bold text-2xl"
            >
                🌍 AI Translator
            </Link>

            <div className="hidden md:flex items-center gap-6">

                <Link href="/">
                    Bosh sahifa
                </Link>

                <Link href="/dashboard">
                    Dashboard
                </Link>

                <Link href="/history">
                    Tarix
                </Link>

                <Link href="/settings">
                    Sozlamalar
                </Link>

                <button
                    onClick={toggleTheme}
                    className="border px-3 py-1 rounded"
                >
                    {darkMode
                        ? "☀ Light"
                        : "🌙 Dark"}
                </button>

            </div>

            <button
                onClick={() =>
                    setIsOpen(!isOpen)
                }
                className="md:hidden text-2xl"
            >
                ☰
            </button>

        </div>

        {isOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-3">

                <Link
                    href="/"
                    onClick={() =>
                        setIsOpen(false)
                    }
                >
                    🏠 Bosh sahifa
                </Link>

                <Link
                    href="/dashboard"
                    onClick={() =>
                        setIsOpen(false)
                    }
                >
                    📊 Dashboard
                </Link>

                <Link
                    href="/history"
                    onClick={() =>
                        setIsOpen(false)
                    }
                >
                    📜 Tarix
                </Link>

                <Link
                    href="/settings"
                    onClick={() =>
                        setIsOpen(false)
                    }
                >
                    ⚙ Sozlamalar
                </Link>

                <button
                    onClick={toggleTheme}
                    className="border px-3 py-2 rounded text-left"
                >
                    {darkMode
                        ? "☀ Light Mode"
                        : "🌙 Dark Mode"}
                </button>

            </div>
        )}

    </div>
    </nav>


    );
}
