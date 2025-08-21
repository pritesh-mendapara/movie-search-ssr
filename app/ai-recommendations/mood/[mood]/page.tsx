import { generateMoodRecommendations } from "@/lib/ai";
import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
    params: { mood: string };
}

interface MovieRecommendation {
    title: string;
    year?: string;
    reason: string;
}

export default async function MoodRecommendationsPage({ params }: Props) {
    const { mood } = await params;
    const decodedMood = decodeURIComponent(mood);
    const rawText = await generateMoodRecommendations(decodedMood);

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

    if (hasError) {
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
        <div className="bg-bg container mx-auto min-h-screen px-4 py-8">
            <div className="mb-8">
                <Link href="/ai-recommendations" className="text-neutral-text hover:text-text mb-4 inline-flex items-center gap-2 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to AI Recommendations
                </Link>
                <h1 className="text-text mb-2 flex items-center gap-2 text-4xl font-bold capitalize">
                    <Sparkles className="h-8 w-8 text-yellow-500" />
                    {mood} Mood Movies
                </h1>
                <p className="text-neutral-text">Perfect movies for when you&apos;re feeling {mood.toLowerCase()}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((movie: MovieRecommendation, index: number) => (
                    <div key={index} className="border-border bg-surface rounded-lg border p-6 transition-shadow hover:shadow-lg">
                        <h3 className="text-surface-text mb-3 text-lg font-semibold">
                            {movie.title} {movie.year && `(${movie.year})`}
                        </h3>
                        <p className="text-neutral-text">{movie.reason}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
