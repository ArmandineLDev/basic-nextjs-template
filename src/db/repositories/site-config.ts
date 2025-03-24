// src/db/repositories/site-config.ts
import { query, withTransaction } from '../client';
import { SiteConfig } from '@/types/database';

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
    const result = await query('SELECT * FROM site_config LIMIT 1');
    return result.length > 0 ? result[0] : null;
};

export const updateSiteConfig = async (config: Partial<SiteConfig>): Promise<SiteConfig> => {
    const fields = Object.keys(config).filter(key => key !== 'site_config_id' && key !== 'created_at');

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`);
    const values = fields.map(field => config[field as keyof SiteConfig]);

    const sql = `
    UPDATE site_config
    SET ${setClauses.join(', ')}, updated_at = NOW()
    RETURNING *
  `;

    const result = await query(sql, values);
    return result[0];
};