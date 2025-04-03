'use client';

import {useEffect, useState} from 'react';
import {cn} from '@/lib/utils';
import {MobileMenu} from "@/components/shared/header/mobile-menu";
import {RightBlock} from "@/components/shared/header/right-block";



export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);


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
           <RightBlock mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>

            {/* Menu mobile */}
            <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        </header>
    );
}