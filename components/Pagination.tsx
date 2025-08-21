import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    query: string;
}

const Pagination = ({ currentPage, totalPages, query }: PaginationProps) => {
    const getPageUrl = (page: number) => `/?q=${encodeURIComponent(query)}&page=${page}`;

    const renderPageNumbers = () => {
        const pages = [];
        const showPages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
        const endPage = Math.min(totalPages, startPage + showPages - 1);

        if (endPage - startPage + 1 < showPages) {
            startPage = Math.max(1, endPage - showPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Link
                    key={i}
                    href={getPageUrl(i)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${i === currentPage ? "bg-highlight text-highlight-text" : "text-neutral-text hover:text-text hover:bg-neutral"}`}
                >
                    {i}
                </Link>,
            );
        }

        return pages;
    };

    return (
        <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1">
                {currentPage > 1 && (
                    <Link href={getPageUrl(currentPage - 1)} className="text-neutral-text hover:text-text hover:bg-neutral rounded-md px-3 py-2 text-sm font-medium transition-colors">
                        Previous
                    </Link>
                )}

                {renderPageNumbers()}

                {currentPage < totalPages && (
                    <Link href={getPageUrl(currentPage + 1)} className="text-neutral-text hover:text-text hover:bg-neutral rounded-md px-3 py-2 text-sm font-medium transition-colors">
                        Next
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default Pagination;
