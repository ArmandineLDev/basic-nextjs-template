// src/db/repositories/portfolio.ts
import { query, withTransaction } from '../client';
import { PortfolioItem } from '@/types/database';

export const getPortfolioItems = async (limit?: number, activeOnly: boolean = true): Promise<PortfolioItem[]> => {
    let sql = 'SELECT * FROM portfolio_items';
    const params: any[] = [];

    if (activeOnly) {
        sql += ' WHERE is_active = true';
    }

    sql += ' ORDER BY order_index ASC';

    if (limit) {
        sql += ' LIMIT $1';
        params.push(limit);
    }

    const result = await query(sql, params);
    return result;
};

export const getPortfolioItem = async (id: bigint): Promise<PortfolioItem | null> => {
    const result = await query(
        'SELECT * FROM portfolio_items WHERE portfolio_items_id = $1',
        [id]
    );
    return result.length > 0 ? result[0] : null;
};

export const createPortfolioItem = async (item: Omit<PortfolioItem, 'portfolio_items_id' | 'created_at' | 'updated_at'>): Promise<PortfolioItem> => {
    const fields = Object.keys(item);
    const placeholders = fields.map((_, index) => `$${index + 1}`);
    const values = fields.map(field => item[field as keyof typeof item]);

    const sql = `
    INSERT INTO portfolio_items (${fields.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
  `;

    const result = await query(sql, values);
    return result[0];
};

export const updatePortfolioItem = async (id: bigint, item: Partial<PortfolioItem>): Promise<PortfolioItem> => {
    const fields = Object.keys(item).filter(key =>
        key !== 'portfolio_items_id' && key !== 'created_at' && key !== 'updated_at'
    );

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`);
    const values = fields.map(field => item[field as keyof typeof item]);

    values.push(id);

    const sql = `
    UPDATE portfolio_items
    SET ${setClauses.join(', ')}, updated_at = NOW()
    WHERE portfolio_items_id = $${values.length}
    RETURNING *
  `;

    const result = await query(sql, values);
    return result[0];
};

export const deletePortfolioItem = async (id: bigint): Promise<boolean> => {
    const result = await query(
        'DELETE FROM portfolio_items WHERE portfolio_items_id = $1',
        [id]
    );
    return result.rowCount > 0;
};

export const reorderPortfolioItems = async (itemIds: bigint[]): Promise<boolean> => {
    return withTransaction(async client => {
        for (let i = 0; i < itemIds.length; i++) {
            await client.query(
                'UPDATE portfolio_items SET order_index = $1 WHERE portfolio_items_id = $2',
                [i, itemIds[i]]
            );
        }
        return true;
    });
};