const Footer = () => {
    return (
        <footer className="border-border bg-surface border-t">
            <div className="container mx-auto px-4 py-6">
                <div className="text-neutral-text text-center">
                    <p>
                        © {new Date().getFullYear()} CineScope. Made by <span className="text-text font-semibold">Pritesh Mendapara.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
