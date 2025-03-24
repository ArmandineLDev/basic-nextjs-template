// src/db/repositories/contact.ts
import { query } from '../client';
import { ContactMessage } from '@/types/database';

export const getContactMessages = async (isRead?: boolean): Promise<ContactMessage[]> => {
    let sql = 'SELECT * FROM contact_messages';
    const params: any[] = [];

    if (isRead !== undefined) {
        sql += ' WHERE is_read = $1';
        params.push(isRead);
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return result;
};

export const getContactMessage = async (id: bigint): Promise<ContactMessage | null> => {
    const result = await query(
        'SELECT * FROM contact_messages WHERE contact_message_id = $1',
        [id]
    );
    return result.length > 0 ? result[0] : null;
};

export const createContactMessage = async (message: Omit<ContactMessage, 'contact_message_id' | 'is_read' | 'created_at'>): Promise<ContactMessage> => {
    const result = await query(
        'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [message.name, message.email, message.message]
    );
    return result[0];
};

export const markContactMessageAsRead = async (id: bigint, isRead: boolean = true): Promise<ContactMessage> => {
    const result = await query(
        'UPDATE contact_messages SET is_read = $1 WHERE contact_message_id = $2 RETURNING *',
        [isRead, id]
    );
    return result[0];
};

export const deleteContactMessage = async (id: bigint): Promise<boolean> => {
    const result = await query(
        'DELETE FROM contact_messages WHERE contact_message_id = $1',
        [id]
    );
    return result.rowCount > 0;
};