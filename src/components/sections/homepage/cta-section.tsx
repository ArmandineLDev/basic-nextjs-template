import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

export const CtaSection = () => {
    return(
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
    )
}