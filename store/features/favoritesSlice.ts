import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FavoriteMovie {
    imdbID: string;
    title: string;
    year: string;
    poster: string;
}

interface FavoritesState {
    movies: FavoriteMovie[];
    isHydrated: boolean;
}

const initialState: FavoritesState = {
    movies: [],
    isHydrated: false,
};

const loadFavorites = (): FavoriteMovie[] => {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem("cinescope-favorites");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveFavorites = (favorites: FavoriteMovie[]) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem("cinescope-favorites", JSON.stringify(favorites));
    } catch {}
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        hydrateFavorites: (state) => {
            state.movies = loadFavorites();
            state.isHydrated = true;
        },
        addFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
            const exists = state.movies.find((movie) => movie.imdbID === action.payload.imdbID);
            if (!exists) {
                state.movies.push(action.payload);
                saveFavorites(state.movies);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter((movie) => movie.imdbID !== action.payload);
            saveFavorites(state.movies);
        },
    },
});

export const { hydrateFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.movies;
export const selectIsFavorite = (state: RootState, imdbID: string) => state.favorites.movies.some((movie: FavoriteMovie) => movie.imdbID === imdbID);
export const selectIsHydrated = (state: RootState) => state.favorites.isHydrated;

export default favoritesSlice.reducer;
