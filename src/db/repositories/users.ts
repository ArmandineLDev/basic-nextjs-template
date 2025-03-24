// src/db/repositories/users.ts
import { query } from '../client';
import { User } from '@/types/database';

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const result = await query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.length > 0 ? result[0] : null;
};

export const getUserById = async (id: bigint): Promise<User | null> => {
    const result = await query(
        'SELECT * FROM users WHERE user_id = $1',
        [id]
    );
    return result.length > 0 ? result[0] : null;
};

export const createUser = async (user: Omit<User, 'user_id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const result = await query(
        `INSERT INTO users (email, password_hash, firstname, lastname, role) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
        [user.email, user.password_hash, user.firstname, user.lastname, user.role]
    );
    return result[0];
};

export const updateUser = async (id: bigint, user: Partial<User>): Promise<User> => {
    const fields = Object.keys(user).filter(key =>
        key !== 'user_id' && key !== 'created_at' && key !== 'updated_at'
    );

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`);
    const values = fields.map(field => user[field as keyof typeof user]);

    values.push(id);

    const sql = `
    UPDATE users
    SET ${setClauses.join(', ')}, updated_at = NOW()
    WHERE user_id = $${values.length}
    RETURNING *
  `;

    const result = await query(sql, values);
    return result[0];
};

export const deleteUser = async (id: bigint): Promise<boolean> => {
    const result = await query(
        'DELETE FROM users WHERE user_id = $1',
        [id]
    );
    return result.rowCount > 0;
};