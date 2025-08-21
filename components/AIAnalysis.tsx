"use client";

import { useState } from "react";
import { generateAnalysisAction, generateTriviaAction } from "@/lib/actions";
import { Brain, Lightbulb, Loader2 } from "lucide-react";
import type { MovieDetail } from "@/types";

interface Props {
    movie: MovieDetail;
}

const AIAnalysis = ({ movie }: Props) => {
    const [analysis, setAnalysis] = useState<string>("");
    const [trivia, setTrivia] = useState<{ fact: string }[]>([]);
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);
    const [loadingTrivia, setLoadingTrivia] = useState(false);
    const [activeTab, setActiveTab] = useState<"analysis" | "trivia">("analysis");
    const handleGenerateAnalysis = async () => {
        setLoadingAnalysis(true);
        try {
            const result = await generateAnalysisAction(movie);
            setAnalysis(result);
        } catch (error) {
            console.error("Error generating analysis:", error);
        } finally {
            setLoadingAnalysis(false);
        }
    };

    const handleGenerateTrivia = async () => {
        setLoadingTrivia(true);
        try {
            const result = await generateTriviaAction(movie);
            await setTrivia(JSON.parse(typeof result === "string" ? result : ""));
        } catch (error) {
            console.error("Error generating trivia:", error);
        } finally {
            setLoadingTrivia(false);
        }
    };
    return (
        <div className="border-border bg-surface mt-8 rounded-lg border">
            <div className="border-border border-b p-6">
                <h3 className="text-surface-text mb-2 flex items-center gap-2 text-xl font-semibold">
                    <Brain className="h-5 w-5 text-purple-500" />
                    AI Insights
                </h3>
                <p className="text-neutral-text">Get intelligent analysis and interesting trivia about this movie</p>
            </div>
            <div className="p-6">
                <div className="w-full">
                    <div className="bg-neutral mb-6 flex rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab("analysis")}
                            className={`flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                activeTab === "analysis" ? "bg-highlight text-highlight-text" : "text-neutral-text hover:text-text"
                            }`}
                        >
                            AI Analysis
                        </button>
                        <button
                            onClick={() => setActiveTab("trivia")}
                            className={`flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                activeTab === "trivia" ? "bg-highlight text-highlight-text" : "text-neutral-text hover:text-text"
                            }`}
                        >
                            Movie Trivia
                        </button>
                    </div>

                    {activeTab === "analysis" && (
                        <div className="space-y-4">
                            {!analysis ? (
                                <div className="py-8 text-center">
                                    <button
                                        onClick={handleGenerateAnalysis}
                                        disabled={loadingAnalysis}
                                        className="bg-highlight text-highlight-text hover:bg-neutral inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-colors disabled:opacity-50"
                                    >
                                        {loadingAnalysis ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                                        Generate AI Analysis
                                    </button>
                                </div>
                            ) : (
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-neutral-text leading-relaxed">{analysis}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "trivia" && (
                        <div className="space-y-4">
                            {trivia.length === 0 ? (
                                <div className="py-8 text-center">
                                    <button
                                        onClick={handleGenerateTrivia}
                                        disabled={loadingTrivia}
                                        className="bg-highlight text-highlight-text hover:bg-neutral inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-colors disabled:opacity-50"
                                    >
                                        {loadingTrivia ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
                                        Generate Movie Trivia
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {trivia.map((item, index) => (
                                        <div key={index} className="bg-neutral rounded-lg p-4">
                                            <p className="text-neutral-text text-sm">{item.fact}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIAnalysis;
