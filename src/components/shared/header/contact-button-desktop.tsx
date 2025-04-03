import {Button} from "@/components/ui/button";
import Link from "next/link";

export const ContactButtonDesktop = () => {
    return(
        <div className="hidden md:block">
            <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
                aria-label="Me contacter">
                <Link href="/contact">Contact</Link>
            </Button>
        </div>
    )
}