// src/components/shared/footer.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeSwitch } from '@/components/shared/theme-switch';
import { Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-card border-t border-border relative overflow-hidden pt-16 pb-8">
            {/* Élément décoratif */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

            <div className="container">
                {/* Section CTA */}
                <div className="relative bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-10 mb-16 overflow-hidden border border-primary/20 backdrop-blur-sm">
                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-md">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Un projet en tête ?
                            </h2>
                            <p className="text-muted-foreground">
                                Discutons de la façon dont nous pouvons vous aider à concrétiser
                                votre vision et à créer une expérience web exceptionnelle.
                            </p>
                        </div>
                        <Button
                            asChild
                            className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg">
                            <Link
                                href="/contact"
                                className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <span>Prendre contact</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Navigation + Liens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">À propos</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Web Essentiel crée des expériences numériques accessibles, performantes et esthétiques qui répondent aux besoins des entrepreneurs indépendants.
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <span>Créé avec</span>
                            <Heart className="h-3 w-3 text-destructive fill-destructive" />
                            <span>en France</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Navigation</h3>
                        <ul className="space-y-2">
                            {[
                                'Accueil',
                                'À propos',
                                'Services',
                                'Contact',
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={
                                            item === 'Accueil'
                                                ? '/'
                                                : `/${item.toLowerCase().replace('à ', '')}`
                                        }
                                        className="text-muted-foreground hover:text-primary transition-colors duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Informations</h3>
                        <ul className="space-y-2">
                            {[
                                {
                                    name: 'Mentions Légales',
                                    path: '/mentions-legales',
                                },
                                {
                                    name: 'Politique de confidentialité',
                                    path: '/confidentialite',
                                },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-200">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact</h3>
                        <p className="text-muted-foreground text-sm">
                            Besoin d'aide ou d'informations ? N'hésitez pas à nous contacter.
                        </p>
                        <Button
                            asChild
                            className="rounded-full px-4 py-2 bg-primary hover:opacity-90">
                            <Link href="/contact">Nous contacter</Link>
                        </Button>

                        <div className="pt-4">
                            <h3 className="text-lg font-semibold mb-2">Préférences</h3>
                            <ThemeSwitch />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-border pt-6 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Web Essentiel. Tous droits réservés.</p>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={scrollToTop}
                            aria-label="Retour en haut de page">
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}