import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getMovieById } from "@/lib/omdb";
import FavoriteButton from "@/components/FavoriteButton";

interface MoviePageProps {
    params: {
        imdbID: string;
    };
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
    try {
        const movie = await getMovieById(params.imdbID);

        return {
            title: `${movie.Title} (${movie.Year}) - CineScope`,
            description: movie.Plot,
            openGraph: {
                title: `${movie.Title} (${movie.Year})`,
                description: movie.Plot,
                images: movie.Poster !== "N/A" ? [movie.Poster] : [],
            },
        };
    } catch {
        return {
            title: "Movie Not Found - CineScope",
        };
    }
}

export default async function MoviePage({ params }: MoviePageProps) {
    try {
        const movie = await getMovieById(params.imdbID);

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <div className="sticky top-8">
                            <div className="border-border bg-surface aspect-[2/3] overflow-hidden rounded-2xl border">
                                {movie.Poster !== "N/A" ? (
                                    <Image src={movie.Poster || "/placeholder.png"} alt={`${movie.Title} poster`} width={400} height={600} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="bg-neutral flex h-full items-center justify-center">
                                        <span className="text-neutral-text">No poster available</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4">
                                <FavoriteButton movie={movie} />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-text text-4xl font-bold">{movie.Title}</h1>
                                <p className="text-neutral-text text-xl">{movie.Year}</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h3 className="text-text font-semibold">Runtime</h3>
                                    <p className="text-neutral-text">{movie.Runtime}</p>
                                </div>
                                <div>
                                    <h3 className="text-text font-semibold">Genre</h3>
                                    <p className="text-neutral-text">{movie.Genre}</p>
                                </div>
                                <div>
                                    <h3 className="text-text font-semibold">Director</h3>
                                    <p className="text-neutral-text">{movie.Director}</p>
                                </div>
                                <div>
                                    <h3 className="text-text font-semibold">IMDb Rating</h3>
                                    <p className="text-neutral-text">{movie.imdbRating}/10</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-text mb-2 font-semibold">Plot</h3>
                                <p className="text-neutral-text leading-relaxed">{movie.Plot}</p>
                            </div>

                            <div>
                                <h3 className="text-text mb-2 font-semibold">Cast</h3>
                                <p className="text-neutral-text">{movie.Actors}</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h3 className="text-text font-semibold">Language</h3>
                                    <p className="text-neutral-text">{movie.Language}</p>
                                </div>
                                <div>
                                    <h3 className="text-text font-semibold">Country</h3>
                                    <p className="text-neutral-text">{movie.Country}</p>
                                </div>
                                {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                                    <div>
                                        <h3 className="text-text font-semibold">Box Office</h3>
                                        <p className="text-neutral-text">{movie.BoxOffice}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch {
        notFound();
    }
}
