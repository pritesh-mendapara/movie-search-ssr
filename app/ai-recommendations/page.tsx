import { Suspense } from "react";
import { getFavorites } from "@/lib/favorites";
import { generateMovieRecommendations } from "@/lib/ai";
import { Sparkles, Heart, Lightbulb, RefreshCw } from "lucide-react";
import Link from "next/link";

async function RecommendationsContent() {
    const favorites = await getFavorites();
    const rawText = await generateMovieRecommendations(favorites);

    let recommendations: { title: string; reason: string }[] = [];
    let hasError = false;

    if (typeof rawText === "string" && rawText.trim().length > 0) {
        try {
            recommendations = JSON.parse(rawText);
        } catch (e) {
            console.error("Failed to parse recommendations:", e, rawText);
            hasError = true;
        }
    } else if (Array.isArray(rawText)) {
        recommendations = rawText;
    }
    if (favorites.length === 0) {
        return (
            <div className="border-border bg-surface rounded-lg border p-6">
                <div className="mb-4">
                    <h3 className="text-surface-text mb-2 flex items-center gap-2 text-xl font-semibold">
                        <Heart className="h-5 w-5 text-red-500" />
                        No Favorites Yet
                    </h3>
                    <p className="text-neutral-text">Add some movies to your favorites to get personalized AI recommendations!</p>
                </div>
                <Link href="/" className="bg-highlight text-highlight-text hover:bg-neutral inline-block rounded-md px-4 py-2 transition-colors">
                    Browse Movies
                </Link>
            </div>
        );
    }

    if (hasError || recommendations.length === 0) {
        return (
            <div className="border-border bg-surface rounded-lg border p-6 text-center">
                <h3 className="text-surface-text mb-3 text-xl font-semibold">⚠️ Something went wrong</h3>
                <p className="text-neutral-text mb-4">We couldn’t generate recommendations right now. Please try refreshing.</p>
                <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Page
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-text mb-4 flex items-center gap-2 text-2xl font-bold">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                AI Recommendations Based on Your Favorites
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((rec, index: number) => (
                    <div key={index} className="border-border bg-surface rounded-lg border p-6 transition-shadow hover:shadow-lg">
                        <h3 className="text-surface-text mb-3 text-lg font-semibold">{rec.title}</h3>
                        <p className="text-neutral-text">{rec.reason}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

async function MoodRecommendations() {
    const moods = ["Happy", "Sad", "Excited", "Relaxed", "Adventurous", "Romantic"];

    return (
        <div className="space-y-6">
            <h2 className="text-text mb-4 flex items-center gap-2 text-2xl font-bold">
                <Lightbulb className="h-6 w-6 text-blue-500" />
                Mood-Based Recommendations
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {moods.map((mood) => (
                    <Link key={mood} href={`/ai-recommendations/mood/${mood.toLowerCase()}`}>
                        <div className="border-border bg-surface cursor-pointer rounded-lg border p-6 transition-shadow hover:shadow-lg">
                            <h3 className="text-surface-text mb-2 text-lg font-semibold">Feeling {mood}?</h3>
                            <p className="text-neutral-text">Get AI-curated movie suggestions for your {mood.toLowerCase()} mood</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function AIRecommendationsPage() {
    return (
        <div className="bg-bg container mx-auto min-h-screen px-4 py-8">
            <div className="mb-8">
                <h1 className="text-text mb-2 text-4xl font-bold">AI-Powered Recommendations</h1>
                <p className="text-neutral-text">Discover your next favorite movie with intelligent AI suggestions</p>
            </div>

            <Suspense
                fallback={
                    <div className="space-y-4">
                        <div className="bg-neutral h-8 animate-pulse rounded" />
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-neutral h-32 animate-pulse rounded" />
                            ))}
                        </div>
                    </div>
                }
            >
                <RecommendationsContent />
            </Suspense>

            <div className="mt-12">
                <Suspense fallback={<div className="bg-neutral h-64 animate-pulse rounded" />}>
                    <MoodRecommendations />
                </Suspense>
            </div>
        </div>
    );
}
