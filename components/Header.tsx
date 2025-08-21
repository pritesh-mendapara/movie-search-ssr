"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/favorites", label: "Favorites" },
    { href: "/ai-recommendations", label: "AI Recommendations" },
];

const Header = () => {
    const pathname = usePathname();
    return (
        <header className="border-border bg-surface border-b">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-text text-2xl font-bold">
                        CineScope
                    </Link>
                    <div className="flex items-center space-x-4">
                        {navLinks.map((link) => {
                            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                            return (
                                <Link key={link.href} href={link.href} className={`transition-colors ${isActive ? "text-text font-semibold" : "text-neutral-text hover:text-text"}`}>
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
