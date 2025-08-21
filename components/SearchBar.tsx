"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

interface SearchBarProps {
    initialQuery?: string;
}

const SearchBar = ({ initialQuery = "" }: SearchBarProps) => {
    const [query, setQuery] = useState(initialQuery);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            startTransition(() => {
                router.push(`/?q=${encodeURIComponent(query.trim())}&page=1`);
            });
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="border-border bg-bg text-text placeholder-neutral-text focus:border-highlight focus:ring-highlight/20 flex-1 rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                    disabled={isPending}
                />
                <button
                    type="submit"
                    disabled={isPending || !query.trim()}
                    className="bg-highlight text-highlight-text hover:bg-highlight/90 focus:ring-highlight/20 rounded-lg px-6 py-3 font-medium transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending ? "Searching..." : "Search"}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
