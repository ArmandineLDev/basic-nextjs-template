import {ContactForm} from "@/components/sections/contact-form";

export const ContactSection = () => {
    return(
        <section
        id="contact"
        className="w-full max-w-md mx-auto py-12"
        aria-labelledby="contact-heading"
    >
        <h2 id="contact-heading" className="text-2xl font-bold mb-6 text-center">
            Contactez-nous
        </h2>
<ContactForm/>
        </section>
    )
}