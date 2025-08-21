const Footer = () => {
    return (
        <footer className="border-border bg-surface border-t">
            <div className="container mx-auto px-4 py-6">
                <div className="text-neutral-text text-center">
                    <p>
                        © {new Date().getFullYear()} CineScope. Powered by{" "}
                        <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                            OMDb API
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
