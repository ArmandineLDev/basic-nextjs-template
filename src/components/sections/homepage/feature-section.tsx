export const FeatureSection = () => {
    return (
        <section id="features" className="py-16 bg-secondary/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold">Une solution complète et sur mesure</h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Nous avons conçu Web Essentiel pour répondre parfaitement aux besoins des entrepreneurs
                        indépendants
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
    )
}