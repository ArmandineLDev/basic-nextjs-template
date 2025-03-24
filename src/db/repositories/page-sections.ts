// src/db/repositories/page-sections.ts
import { query, withTransaction } from '../client';
import { PageSection } from '@/types/database';

export const getPageSections = async (pageId: string): Promise<PageSection[]> => {
    const result = await query(
        'SELECT * FROM page_sections WHERE page_id = $1 ORDER BY order_index ASC',
        [pageId]
    );
    return result;
};

export const getPageSection = async (id: bigint): Promise<PageSection | null> => {
    const result = await query(
        'SELECT * FROM page_sections WHERE page_section_id = $1',
        [id]
    );
    return result.length > 0 ? result[0] : null;
};

export const createPageSection = async (section: Omit<PageSection, 'page_section_id' | 'created_at' | 'updated_at'>): Promise<PageSection> => {
    const fields = Object.keys(section);
    const placeholders = fields.map((_, index) => `$${index + 1}`);
    const values = fields.map(field => section[field as keyof typeof section]);

    const sql = `
    INSERT INTO page_sections (${fields.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
  `;

    const result = await query(sql, values);
    return result[0];
};

export const updatePageSection = async (id: bigint, section: Partial<PageSection>): Promise<PageSection> => {
    const fields = Object.keys(section).filter(key =>
        key !== 'page_section_id' && key !== 'created_at' && key !== 'updated_at'
    );

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`);
    const values = fields.map(field => section[field as keyof typeof section]);

    values.push(id);

    const sql = `
    UPDATE page_sections
    SET ${setClauses.join(', ')}, updated_at = NOW()
    WHERE page_section_id = $${values.length}
    RETURNING *
  `;

    const result = await query(sql, values);
    return result[0];
};

export const deletePageSection = async (id: bigint): Promise<boolean> => {
    const result = await query(
        'DELETE FROM page_sections WHERE page_section_id = $1',
        [id]
    );
    return result.rowCount > 0;
};

export const reorderPageSections = async (pageId: string, sectionIds: bigint[]): Promise<boolean> => {
    return withTransaction(async client => {
        for (let i = 0; i < sectionIds.length; i++) {
            await client.query(
                'UPDATE page_sections SET order_index = $1 WHERE page_section_id = $2 AND page_id = $3',
                [i, sectionIds[i], pageId]
            );
        }
        return true;
    });
};