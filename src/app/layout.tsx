import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Web Essentiel',
    description: 'Solution web clé en main pour entrepreneurs indépendants',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
        <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
            <header>
                {/* Header sera implémenté plus tard */}
            </header>
            <main className="flex-grow">
                {children}
            </main>
            <footer>
                {/* Footer sera implémenté plus tard */}
            </footer>
        </div>
        </body>
        </html>
    );
}