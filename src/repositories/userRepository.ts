import { FastifyInstance } from 'fastify';
import { CompanyLastVisit } from '../types/CompanyLastVisit';
import { UserFull } from '../types/UserFull';
import { BadRequestError } from '../errors/BadRequestError';
import { DatabaseError } from 'pg';

/**
 * Fetches the latest visits of a users and can be limited to a maximum number of rows
 * @param fastify The Fastify instance
 * @param userId The user UUID
 * @param limit The row limit
 * @returns An array with 0 or more length of the latest visits of the user
 * @throws {
 *    BadRequestError: If the user ID is malformed
 * }
 */
export async function getLatestVisitsOfUser(fastify: FastifyInstance, userId: string, limit?:number): Promise<CompanyLastVisit[]> {
    const client = await fastify.pg.connect();
    try {
        const { rows } = await client.query<CompanyLastVisit>(`
            SELECT c.id, uv.visit_time
            FROM user_visits uv
            JOIN companies c on uv.company_id = c.id
            WHERE uv.user_id = $1
            ORDER BY uv.visit_time DESC
            ${limit ? `LIMIT $2` : ''}`,
            [userId, limit]
        );
        return rows;
    } catch(e) {
        if (e instanceof DatabaseError && e.code === '22P02') {
            throw new BadRequestError("Malformed User ID");
        } else {
            throw e;
        }
    } finally {
        client.release();
    }
}

export async function getUser(fastify: FastifyInstance, userId: string): Promise<UserFull | null> {
    const client = await fastify.pg.connect();
    try {
        const res = await client.query<UserFull>(`
            SELECT *
            FROM users
            WHERE id = $1`,
            [userId]
        );
        if (res.rowCount) {
            return res.rows[0];
        } else {
            return null;
        }
    }
    catch (e) {
        if (e instanceof DatabaseError && e.code === '22P02') {
            throw new BadRequestError("Malformed User ID");
        } else {
            throw e;
        }
    } finally {
        client.release();
    }
}