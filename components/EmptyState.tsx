const EmptyState = () => {
    return (
        <div className="py-12 text-center">
            <div className="mb-6">
                <div className="bg-neutral mx-auto flex h-24 w-24 items-center justify-center rounded-full">
                    <svg className="text-neutral-text h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <h2 className="text-text mb-4 text-2xl font-semibold">Start your movie search</h2>
            <p className="text-neutral-text mb-6">Enter a movie title in the search bar above to discover films</p>
            <div className="space-y-2">
                <p className="text-neutral-text text-sm">Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {["Batman", "Inception", "The Matrix", "Pulp Fiction"].map((suggestion) => (
                        <span key={suggestion} className="bg-neutral text-neutral-text rounded-full px-3 py-1 text-sm">
                            &quot;{suggestion}&rdquo;
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
