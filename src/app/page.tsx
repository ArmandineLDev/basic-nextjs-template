// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Accueil',
    description: 'Web Essentiel - Solution web professionnelle pour entrepreneurs indépendants',
};

export default function HomePage() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28">
                <div className="container max-w-5xl">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Votre présence en ligne,
                            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                simple et professionnelle
              </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                            Un site web clé en main, performant et élégant pour présenter votre activité
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-accent">
                                <Link href="/contact">
                                    Discutons de votre projet
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                                <Link href="/services">
                                    Découvrir nos services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-secondary/30">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Une solution complète et sur mesure</h2>
                        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                            Nous avons conçu Web Essentiel pour répondre parfaitement aux besoins des entrepreneurs indépendants
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Design moderne et professionnel",
                                description: "Une identité visuelle soignée et responsive pour une expérience utilisateur optimale"
                            },
                            {
                                title: "Formulaire de contact intégré",
                                description: "Facilitez la prise de contact pour vos prospects et clients avec un système sécurisé"
                            },
                            {
                                title: "Administration intuitive",
                                description: "Modifiez vous-même votre contenu sans connaissances techniques particulières"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="container max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Prêt à lancer votre présence en ligne ?</h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Offre exceptionnelle pour les 5 premiers clients : 540€ TTC au lieu de 720€ TTC
                        </p>
                        <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-accent">
                            <Link href="/contact">
                                Réserver cette offre
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}