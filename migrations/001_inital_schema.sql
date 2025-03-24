-- Domaine pour les adresses email
CREATE DOMAIN TEXT_MAIL AS TEXT CHECK (
    VALUE ~ '^([a-z\d\.\-\_]+)@{1}([a-z\d\.\-]{2,})[.]([a-z]{2,5})$'
        AND LENGTH(VALUE) <= 150
    );

-- Domaine pour les couleurs hexadécimales (#FFF ou #FFFFFF)
CREATE DOMAIN TEXT_COLOR AS TEXT CHECK (
    VALUE ~ '^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$'
    );
-- Fonction pour générer des IDs de type Snowflake
CREATE OR REPLACE FUNCTION generate_snowflake_id() RETURNS BIGINT AS
$$
DECLARE
    our_epoch  BIGINT := 1672531200000; -- 2023-01-01 en millisecondes
    seq_id     BIGINT;
    now_millis BIGINT;
    shard_id   INT    := 1; -- ID de l'instance (1-1023)
BEGIN
    SELECT nextval('global_id_sequence') % 1024 INTO seq_id;
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    RETURN ((now_millis - our_epoch) << 23) | (shard_id << 10) | (seq_id);
END;
$$ LANGUAGE PLPGSQL;

-- Séquence globale pour les IDs
CREATE SEQUENCE global_id_sequence START 1;

-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users
(
    user_id       BIGINT PRIMARY KEY    DEFAULT generate_snowflake_id(),
    email         TEXT_MAIL    NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    firstname     VARCHAR(50)  NOT NULL,
    lastname      VARCHAR(100) NOT NULL,
    role          VARCHAR(50)  NOT NULL DEFAULT 'user',
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Création de la table des configurations du site
CREATE TABLE IF NOT EXISTS site_config
(
    site_config_id            BIGINT PRIMARY KEY    DEFAULT generate_snowflake_id(),
    site_name        VARCHAR(100) NOT NULL,
    primary_color    TEXT_COLOR            DEFAULT '#922525',
    secondary_color  TEXT_COLOR            DEFAULT '#0a4399',
    accent_color     TEXT_COLOR            DEFAULT '#D86A69',
    logo_url         TEXT,
    favicon_url      TEXT,
    contact_email    TEXT_MAIL,
    contact_phone    VARCHAR(20),
    address          TEXT,
    social_links     JSONB                 DEFAULT '{}',
    meta_description TEXT,
    meta_keywords    TEXT,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Création de la table des sections de page
CREATE TABLE IF NOT EXISTS page_sections
(
    page_section_id              BIGINT PRIMARY KEY                DEFAULT generate_snowflake_id(),
    page_id         VARCHAR(50)              NOT NULL,
    section_type    VARCHAR(50)              NOT NULL,
    title           VARCHAR(255),
    subtitle        TEXT,
    content         TEXT,
    image_url       TEXT,
    button_text     VARCHAR(100),
    button_url      VARCHAR(255),
    order_index     INTEGER                  NOT NULL,
    is_active       BOOLEAN                  NOT NULL DEFAULT TRUE,
    additional_data JSONB                             DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Création de la table du portfolio
CREATE TABLE IF NOT EXISTS portfolio_items
(
    portfolio_items_id          BIGINT PRIMARY KEY                DEFAULT generate_snowflake_id(),
    title       VARCHAR(255)             NOT NULL,
    description TEXT,
    image_url   TEXT                     NOT NULL,
    category    VARCHAR(100),
    order_index INTEGER                  NOT NULL,
    is_active   BOOLEAN                  NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Création de la table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages
(
    contact_message_id         BIGINT PRIMARY KEY                DEFAULT generate_snowflake_id(),
    name       VARCHAR(255)             NOT NULL,
    email      TEXT_MAIL                NOT NULL,
    message    TEXT                     NOT NULL,
    is_read    BOOLEAN                  NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insertion d'une configuration par défaut
INSERT INTO site_config (site_name)
VALUES ('Web Essentiel')
ON CONFLICT DO NOTHING;