import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

export const HeroSection = () => {
    return (
        <section id="about" className="relative py-20 md:py-28">
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
    )
}