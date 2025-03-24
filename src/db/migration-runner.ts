import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

// Pour obtenir l'équivalent de __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB,
    ssl: true
});
// Créer la table de suivi des migrations si elle n'existe pas
async function ensureMigrationsTable() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
  `);
}

// Récupérer les migrations déjà appliquées
async function getAppliedMigrations() {

    try {
        const result = await pool.query('SELECT name FROM migrations ORDER BY id');
        return result.rows.map((row: {name:string}) => row.name);
    } catch (error:unknown) {
        if (error instanceof Error) {
            console.log('Table des migrations non trouvée ou erreur de récupération:', error.message);
        } else {
            console.log('Table des migrations non trouvée ou erreur de récupération:', error);
        }
        return [];
    }
}

// Récupérer tous les fichiers de migration
function getMigrationFiles() {
    const migrationsDir = path.join(process.cwd(), 'migrations');
    if (!fs.existsSync(migrationsDir)) {
        console.error('Répertoire des migrations non trouvé!');
        return [];
    }

    return fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort(); // Tri alphabétique pour garantir l'ordre
}

// Exécuter une migration
async function applyMigration(fileName:string) {
    const filePath = path.join(process.cwd(), 'migrations', fileName);
    const sql = fs.readFileSync(filePath, 'utf8');

    const client = await pool.connect();
    try {
        // Démarrer une transaction
        await client.query('BEGIN');

        // Exécuter le SQL de la migration
        await client.query(sql);

        // Enregistrer la migration comme appliquée
        await client.query(
            'INSERT INTO migrations (name) VALUES ($1)',
            [fileName]
        );

        // Valider la transaction
        await client.query('COMMIT');
        console.log(`Migration appliquée: ${fileName}`);
    } catch (error) {
        // Annuler la transaction en cas d'erreur
        await client.query('ROLLBACK');
        console.error(`Erreur lors de l'application de la migration ${fileName}:`, error);
        throw error;
    } finally {
        client.release();
    }
}

// Fonction principale pour exécuter les migrations
async function runMigrations() {
    try {
        // S'assurer que la table des migrations existe
        await ensureMigrationsTable();

        // Récupérer les migrations déjà appliquées
        const appliedMigrations = await getAppliedMigrations();

        // Récupérer tous les fichiers de migration
        const migrationFiles = getMigrationFiles();

        // Filtrer les migrations qui n'ont pas encore été appliquées
        const pendingMigrations = migrationFiles.filter(
            file => !appliedMigrations.includes(file)
        );

        if (pendingMigrations.length === 0) {
            console.log('Aucune nouvelle migration à appliquer.');
            return;
        }

        console.log(`Application de ${pendingMigrations.length} migrations...`);

        // Appliquer les migrations dans l'ordre
        for (const migration of pendingMigrations) {
            await applyMigration(migration);
        }

        console.log('Migrations terminées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'exécution des migrations:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// En ESM, nous ne pouvons pas utiliser require.main === module
// Exécutons directement la fonction
runMigrations().catch(console.error);