import Link from "next/link";

const Header = () => {
    return (
        <header className="border-border bg-surface border-b">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-text text-2xl font-bold">
                        CineScope
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-neutral-text hover:text-text transition-colors">
                            Home
                        </Link>
                        <Link href="/favorites" className="text-neutral-text hover:text-text transition-colors">
                            Favorites
                        </Link>
                        <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-text hover:text-text transition-colors">
                            OMDb API
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
