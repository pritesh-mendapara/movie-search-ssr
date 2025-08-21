import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/types";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link href={`/movie/${movie.imdbID}`}>
            <div className="group border-border bg-surface cursor-pointer overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[2/3] overflow-hidden">
                    {movie.Poster !== "N/A" ? (
                        <Image
                            src={movie.Poster || "/placeholder.png"}
                            alt={`${movie.Title} poster`}
                            width={300}
                            height={450}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="bg-neutral flex h-full items-center justify-center">
                            <span className="text-neutral-text">No poster</span>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-surface-text line-clamp-2 font-semibold">{movie.Title}</h3>
                    <p className="text-neutral-text text-sm">{movie.Year}</p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
