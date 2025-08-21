"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateFavorites, removeFavorite, selectFavorites, selectIsHydrated } from "@/store/features/favoritesSlice";

export default function FavoritesPage() {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(selectFavorites);
    const isHydrated = useAppSelector(selectIsHydrated);

    useEffect(() => {
        if (!isHydrated) {
            dispatch(hydrateFavorites());
        }
    }, [dispatch, isHydrated]);

    const handleRemoveFavorite = (imdbID: string) => {
        dispatch(removeFavorite(imdbID));
    };

    if (!isHydrated) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <div className="border-highlight mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                        <p className="text-neutral-text">Loading favorites...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-text mb-2 text-3xl font-bold">My Favorite Movies</h1>
                <p className="text-neutral-text">
                    {favorites.length === 0 ? "You haven't added any movies to your favorites yet." : `You have ${favorites.length} favorite movie${favorites.length === 1 ? "" : "s"}.`}
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="py-12 text-center">
                    <div className="mb-6">
                        <div className="bg-neutral mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                            <svg className="text-neutral-text h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-text mb-2 text-xl font-semibold">No favorites yet</h2>
                        <p className="text-neutral-text mb-6">Start exploring movies and add them to your favorites to see them here.</p>
                        <Link href="/" className="bg-highlight text-highlight-text hover:bg-highlight/90 inline-flex items-center rounded-lg px-4 py-2 transition-colors">
                            Browse Movies
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {favorites.map((movie) => (
                        <div key={movie.imdbID} className="bg-surface border-border overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
                            <Link href={`/movie/${movie.imdbID}`} className="block">
                                <div className="relative aspect-[2/3]">
                                    {movie.poster && movie.poster !== "N/A" ? (
                                        <Image
                                            src={movie.poster || "/placeholder.svg"}
                                            alt={`${movie.title} poster`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                                        />
                                    ) : (
                                        <div className="bg-neutral flex h-full w-full items-center justify-center">
                                            <svg className="text-neutral-text h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </Link>
                            <div className="p-4">
                                <Link href={`/movie/${movie.imdbID}`}>
                                    <h3 className="text-text hover:text-highlight mb-1 line-clamp-2 font-semibold transition-colors">{movie.title}</h3>
                                </Link>
                                <p className="text-neutral-text mb-3 text-sm">{movie.year}</p>
                                <button
                                    onClick={() => handleRemoveFavorite(movie.imdbID)}
                                    className="w-full rounded-md bg-red-600 px-3 py-2 text-sm text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
