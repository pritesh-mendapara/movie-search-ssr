import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import { getMovies } from "@/lib/omdb";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import type { Movie } from "@/types";

interface HomePageProps {
    searchParams: {
        q?: string;
        page?: string;
    };
}

export default async function Home(props: HomePageProps) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || "";
    const page = Number.parseInt(searchParams.page || "1", 10);
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-text mb-4 text-4xl font-bold">CineScope</h1>
                <p className="text-neutral-text text-lg">Discover and explore movies from around the world</p>
            </div>

            <div className="mb-8">
                <SearchBar initialQuery={query} />
            </div>

            <MovieResults query={query} page={page} />
        </div>
    );
}

async function MovieResults({ query, page }: { query: string; page: number }) {
    if (!query) {
        return <EmptyState />;
    }

    try {
        const data = await getMovies({ q: query, page });

        if (!data.Search || data.Search.length === 0) {
            return (
                <div className="py-12 text-center">
                    <h2 className="mb-4 text-2xl font-semibold">No movies found</h2>
                    <p className="text-neutral-text">Try searching for a different movie title</p>
                </div>
            );
        }

        const totalPages = Math.ceil(Number.parseInt(data.totalResults) / 10);

        return (
            <>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {data.Search.map((movie: Movie, index) => (
                        <MovieCard key={movie.imdbID + index} movie={movie} />
                    ))}
                </div>
                {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} query={query} />}
            </>
        );
    } catch (error) {
        return (
            <div className="py-12 text-center">
                <h2 className="mb-4 text-2xl font-semibold text-red-600">Something went wrong</h2>
                <p className="text-neutral-text">Unable to fetch movies. Please check your API configuration.</p>
            </div>
        );
    }
}
