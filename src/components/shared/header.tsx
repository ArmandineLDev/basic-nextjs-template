// src/components/shared/header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeSwitch } from '@/components/shared/theme-switch';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full transition-all duration-300',
                scrolled
                    ? 'bg-background/80 backdrop-blur-lg border-b border-border/40 py-3'
                    : 'bg-transparent py-5'
            )}>
            <div className="container flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-bold"
                    aria-label="Retour à l'accueil">
                    <Image
                        src="/logo.png"
                        alt="Web Essentiel Logo"
                        width={40}
                        height={40}
                        className="w-auto h-10"
                    />
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Web Essentiel
          </span>
                </Link>

                {/* Navigation desktop */}
                <nav
                    className="hidden md:flex items-center gap-1"
                    aria-label="Navigation principale">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'px-4 py-2 rounded-md text-sm font-medium transition-colors relative group',
                                pathname === item.href
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                            aria-current={pathname === item.href ? 'page' : undefined}>
                            {pathname === item.href && (
                                <span className="absolute inset-0 rounded-md bg-primary/10"></span>
                            )}
                            <span className="relative">{item.name}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeSwitch />

                    {/* Bouton Contact (visible uniquement sur desktop) */}
                    <div className="hidden md:block">
                        <Button
                            asChild
                            className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
                            aria-label="Me contacter">
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </div>

                    {/* Bouton menu mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
                        {mobileMenuOpen ? (
                            <X
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        ) : (
                            <Menu
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                </div>
            </div>

            {/* Menu mobile */}
            {mobileMenuOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden absolute inset-x-0 top-16 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border">
                    <div className="container py-6 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'block py-2 text-base font-medium transition-colors',
                                    pathname === item.href
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                                aria-current={pathname === item.href ? 'page' : undefined}>
                                {item.name}
                            </Link>
                        ))}

                        <Button
                            asChild
                            className="w-full mt-4 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300">
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}