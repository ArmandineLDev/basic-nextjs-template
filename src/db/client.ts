import { Pool, PoolClient } from 'pg';

// Configuration de la connexion
const pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : undefined,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        }
);

// Fonction pour obtenir une connexion du pool
export const getClient = async (): Promise<PoolClient> => {
    const client = await pool.connect();
    return client;
};

// Fonction utilitaire pour exécuter des requêtes simples
export const query = async (text: string, params?: any[]): Promise<any> => {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result.rows;
    } finally {
        client.release();
    }
};

// Gestionnaire de transactions
export const withTransaction = async <T>(callback: (client: PoolClient) => Promise<T>): Promise<T> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Fermer la connexion lors de l'arrêt de l'application
process.on('SIGINT', async () => {
    await pool.end();
    process.exit(0);
});