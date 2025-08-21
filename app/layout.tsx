import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/providers/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CineScope — Movie Search (SSR)",
    description: "Discover and explore movies with our server-side rendered movie search application",
    keywords: ["movies", "search", "cinema", "films", "OMDb"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-bg text-text min-h-screen antialiased`}>
                <ReduxProvider>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}
