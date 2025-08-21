import { cookies } from "next/headers";
import type { Movie } from "@/types";

const FAVORITES_COOKIE = "cinescope-favorites";

export async function getFavorites(): Promise<Movie[]> {
    const cookieStore = await cookies();
    const favoritesData = cookieStore.get(FAVORITES_COOKIE);

    if (!favoritesData?.value) {
        return [];
    }

    try {
        return JSON.parse(favoritesData.value);
    } catch {
        return [];
    }
}

export async function addToFavorites(movie: Movie) {
    const cookieStore = await cookies();
    const favorites = await getFavorites();

    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (!exists) {
        const updatedFavorites = [...favorites, movie];
        cookieStore.set(FAVORITES_COOKIE, JSON.stringify(updatedFavorites), {
            maxAge: 60 * 60 * 24 * 365,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
    }
}

export async function removeFromFavorites(imdbID: string) {
    const cookieStore = await cookies();
    const favorites = await getFavorites();

    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
    cookieStore.set(FAVORITES_COOKIE, JSON.stringify(updatedFavorites), {
        maxAge: 60 * 60 * 24 * 365,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
}

export async function isFavorite(imdbID: string): Promise<boolean> {
    const favorites = await getFavorites();
    return favorites.some((fav) => fav.imdbID === imdbID);
}
