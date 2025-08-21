import type { MovieDetail, SearchResponse } from "@/types";

const API_KEY = process.env.OMDB_API_KEY as string;
const BASE_URL = process.env.OMDB_API_URL as string;

export async function getMovies({ q, page = 1 }: { q: string; page?: number }): Promise<SearchResponse> {
    if (!API_KEY) {
        return {
            Search: [],
            totalResults: "0",
            Response: "False",
            Error: "OMDB_API_KEY environment variable is required. Please add your API key to continue.",
        };
    }

    const url = new URL(BASE_URL);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("s", q);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("type", "movie");

    const response = await fetch(url, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    const data: SearchResponse = await response.json();

    if (data.Response === "False") {
        throw new Error(data.Error || "Failed to fetch movies");
    }

    return data;
}

export async function getMovieById(imdbID: string): Promise<MovieDetail> {
    if (!API_KEY) {
        throw new Error("OMDB_API_KEY environment variable is required. Please add your API key to continue.");
    }

    const url = new URL(BASE_URL);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("i", imdbID);
    url.searchParams.set("plot", "full");

    const response = await fetch(url.toString(), {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    const data: MovieDetail = await response.json();

    if (data.Response === "False") {
        throw new Error("Movie not found");
    }

    return data;
}
