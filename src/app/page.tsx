// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {HeroSection} from "@/components/sections/homepage/hero";
import {FeatureSection} from "@/components/sections/homepage/feature-section";
import {CtaSection} from "@/components/sections/homepage/cta-section";
import {ProductSection} from "@/components/sections/homepage/product-section";
import {ContactSection} from "@/components/sections/homepage/contact-section";

export const metadata: Metadata = {
    title: 'Accueil',
    description: 'Web Essentiel - Solution web professionnelle pour entrepreneurs indépendants',
};

export default function HomePage() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <HeroSection/>

            {/* Features Section */}
            <FeatureSection/>

            <ProductSection/>

            {/* CTA Section */}
           <CtaSection/>
            <ContactSection/>
        </div>
    );
}