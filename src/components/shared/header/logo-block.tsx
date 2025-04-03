import Link from "next/link";
import Image from "next/image";

export const LogoBlock = () => {
    return (
        <Link
            href="/public"
            className="flex items-center gap-2 text-lg font-bold"
            aria-label="Retour à l'accueil">
            <Image
                src="/images/logos/logo-web-essentiel.png"
                alt="Web Essentiel Logo"
                width={40}
                height={40}
                className="w-auto h-auto"
            />
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Web Essentiel
          </span>
        </Link>
    )
}