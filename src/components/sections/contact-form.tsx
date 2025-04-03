'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Schéma de validation avec Zod
const formSchema = z.object({
    name: z.string().min(1, { message: 'Le nom est requis' }),
    email: z.string()
        .min(1, { message: 'L\'email est requis' })
        .email({ message: 'Format d\'email invalide' }),
    message: z.string().min(1, { message: 'Le message est requis' }),
});

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialisation du formulaire avec React Hook Form + Zod
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    // Soumission du formulaire
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            // Simuler une requête API
            await new Promise(resolve => setTimeout(resolve, 1000));
            // TODO Ici, vous pouvez envoyer les données du formulaire à votre API
            console.log(values)
            // Afficher un toast de confirmation avec Sonner
            toast.success("Message envoyé", {
                description: "Nous avons bien reçu votre message et reviendrons vers vous rapidement.",
            });

            // Réinitialiser le formulaire
            form.reset();
        } catch (error) {
            toast.error("Erreur", {
                description: "Un problème est survenu lors de l'envoi du message. Veuillez réessayer.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
       <>

            <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isSubmitting && "Envoi en cours..."}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nom <span aria-hidden="true">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Votre nom"
                                        {...field}
                                        aria-required="true"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email <span aria-hidden="true">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="votre@email.com"
                                        {...field}
                                        aria-required="true"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Message <span aria-hidden="true">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Votre message..."
                                        className="min-h-32 resize-y"
                                        {...field}
                                        aria-required="true"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting ? "true" : "false"}
                    >
                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                    </Button>
                </form>
            </Form>
        </>
    );
};