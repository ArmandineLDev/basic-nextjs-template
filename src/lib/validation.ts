// src/lib/validation.ts
import { z } from 'zod';
import { SectionType } from '@/types/database';

// Schéma de validation pour la connexion utilisateur
export const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
});

// Schéma de validation pour la création d'utilisateur
export const userSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    role: z.string().default('user')
});

// Schéma de validation pour la configuration du site
export const siteConfigSchema = z.object({
    site_name: z.string().min(1, 'Le nom du site est requis'),
    primary_color: z.string().regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, 'Couleur hexadécimale invalide'),
    secondary_color: z.string().regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, 'Couleur hexadécimale invalide'),
    accent_color: z.string().regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, 'Couleur hexadécimale invalide'),
    logo_url: z.string().nullable().optional(),
    favicon_url: z.string().nullable().optional(),
    contact_email: z.string().email('Email invalide').nullable().optional(),
    contact_phone: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    social_links: z.record(z.string()).optional(),
    meta_description: z.string().nullable().optional(),
    meta_keywords: z.string().nullable().optional(),
});

// Schéma de validation pour les sections de page
export const pageSectionSchema = z.object({
    page_id: z.string(),
    section_type: z.nativeEnum(SectionType),
    title: z.string().nullable().optional(),
    subtitle: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    image_url: z.string().nullable().optional(),
    button_text: z.string().nullable().optional(),
    button_url: z.string().nullable().optional(),
    order_index: z.number().int(),
    is_active: z.boolean().default(true),
    additional_data: z.record(z.any()).optional(),
});

// Schéma de validation pour les éléments du portfolio
export const portfolioItemSchema = z.object({
    title: z.string().min(1, 'Le titre est requis'),
    description: z.string().nullable().optional(),
    image_url: z.string().min(1, 'L\'URL de l\'image est requise'),
    category: z.string().nullable().optional(),
    order_index: z.number().int(),
    is_active: z.boolean().default(true),
});

// Schéma de validation pour les messages de contact
export const contactMessageSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});