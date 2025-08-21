import { isFavorite } from "@/lib/favorites";
import { addFavoriteAction, removeFavoriteAction } from "@/lib/actions";
import type { MovieDetail } from "@/types";

interface FavoriteButtonProps {
    movie: MovieDetail;
}

export async function FavoriteButton({ movie }: FavoriteButtonProps) {
    const isMovieFavorite = await isFavorite(movie.imdbID);

    const favoriteMovie = {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
    };
    return (
        <form>
            <button
                formAction={isMovieFavorite ? removeFavoriteAction.bind(null, movie.imdbID) : addFavoriteAction.bind(null, favoriteMovie)}
                className={`focus:ring-highlight/20 w-full cursor-pointer rounded-lg px-4 py-3 font-medium transition-colors focus:ring-2 focus:outline-none ${
                    isMovieFavorite ? "bg-red-600 text-white hover:bg-red-700" : "bg-highlight text-highlight-text hover:bg-highlight/90"
                }`}
            >
                {isMovieFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </form>
    );
}
