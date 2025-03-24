// src/types/database.ts

// Type pour les utilisateurs
export type User = {
    user_id: bigint;
    email: string;
    password_hash: string;
    firstname: string;
    lastname: string;
    role: string;
    created_at: Date;
    updated_at: Date;
};

// Type pour la configuration du site
export type SiteConfig = {
    site_config_id: bigint;
    site_name: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    logo_url: string | null;
    favicon_url: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    address: string | null;
    social_links: Record<string, string>;
    meta_description: string | null;
    meta_keywords: string | null;
    created_at: Date;
    updated_at: Date;
};

// Types de sections disponibles
export enum SectionType {
    HERO = 'hero',
    ABOUT = 'about',
    SERVICES = 'services',
    FEATURES = 'features',
    PORTFOLIO = 'portfolio',
    TESTIMONIALS = 'testimonials',
    CONTACT = 'contact',
    CALL_TO_ACTION = 'cta',
    CUSTOM = 'custom'
}

// Type pour les sections de page
export type PageSection = {
    page_section_id: bigint;
    page_id: string;
    section_type: string;
    title: string | null;
    subtitle: string | null;
    content: string | null;
    image_url: string | null;
    button_text: string | null;
    button_url: string | null;
    order_index: number;
    is_active: boolean;
    additional_data: Record<string, any>;
    created_at: Date;
    updated_at: Date;
};

// Type pour les éléments du portfolio
export type PortfolioItem = {
    portfolio_items_id: bigint;
    title: string;
    description: string | null;
    image_url: string;
    category: string | null;
    order_index: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
};

// Type pour les messages de contact
export type ContactMessage = {
    contact_message_id: bigint;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: Date;
};