// src/app/layout.tsx
import {Inter as FontSans} from 'next/font/google';
import localFont from 'next/font/local';
import {ThemeProvider} from '@/components/ui/theme-provider';
import {cn} from '@/lib/utils';
import '@/styles/globals.css';
import Header from '@/components/shared/header';
import Footer from "@/components/shared/footer";
import {Metadata} from 'next';

// Police pour les utilisateurs dyslexiques
const fontDyslexic = localFont({
    src: [
        {
            path: '../assets/fonts/Lexend/Lexend-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
    ],
    variable: '--font-dyslexic',
    display: 'swap',
});

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: {
        default: 'Web Essentiel',
        template: '%s | Web Essentiel',
    },
    description: 'Site web professionnel pour entrepreneurs indépendants',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="fr"
            suppressHydrationWarning>
        <head>
            <link
                rel="icon"
                type="image/svg+xml"
                href="/favicon.svg"
            />
            <link
                rel="alternate icon"
                type="image/png"
                href="/favicon.png"
            />
        </head>
        <body
            className={cn(
                'min-h-screen font-sans antialiased',
                fontSans.variable,
                fontDyslexic.variable
            )}>
        {/* Fond avec dégradés légers */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-background to-background/80">
            {/* Formes décoratives subtiles */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl"></div>

            {/* Grille subtile */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>
        </div>

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
                <Header/>
                <div className="flex-1">
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground">
                        Aller au contenu principal
                    </a>
                    <main
                        id="main-content"
                        className="flex-1"
                        tabIndex={-1}>
                        {children}
                    </main>
                </div>
                <Footer/>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}