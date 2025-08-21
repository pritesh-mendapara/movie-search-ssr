"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite, selectIsFavorite } from "@/store/features/favoritesSlice";
import type { MovieDetail } from "@/lib/omdb";

interface FavoriteButtonProps {
    movie: MovieDetail;
}

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector((state) => selectIsFavorite(state, movie.imdbID));

    const handleToggle = () => {
        if (isFavorite) {
            dispatch(removeFavorite(movie.imdbID));
        } else {
            dispatch(
                addFavorite({
                    imdbID: movie.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    poster: movie.Poster,
                }),
            );
        }
    };
    return (
        <button
            onClick={handleToggle}
            className={`focus:ring-highlight/20 w-full cursor-pointer rounded-lg px-4 py-3 font-medium transition-colors focus:ring-2 focus:outline-none ${
                isFavorite ? "bg-red-600 text-white hover:bg-red-700" : "bg-highlight text-highlight-text hover:bg-highlight/90"
            }`}
        >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
