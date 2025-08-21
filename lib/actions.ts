"use server";

import { revalidatePath } from "next/cache";
import { addToFavorites, removeFromFavorites } from "./favorites";
import { generateMovieAnalysis, generateMovieTrivia } from "./ai";
import type { Movie, MovieDetail } from "@/types";

export async function addFavoriteAction(movie: Movie) {
    await addToFavorites(movie);
    revalidatePath("/favorites");
    revalidatePath("/movie/[imdbID]", "page");
}

export async function removeFavoriteAction(imdbID: string) {
    await removeFromFavorites(imdbID);
    revalidatePath("/favorites");
    revalidatePath("/movie/[imdbID]", "page");
}

export async function generateAnalysisAction(movie: MovieDetail) {
    return await generateMovieAnalysis(movie);
}

export async function generateTriviaAction(movie: MovieDetail) {
    return await generateMovieTrivia(movie);
}
