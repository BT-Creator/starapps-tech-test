import { FastifyInstance } from "fastify";
import { CompanyLastVisit } from "../types/CompanyLastVisit";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { DatabaseError } from "pg";

/**
 * 
 * @param fastify The fastify instance
 * @param userId The user ID of the selected user
 * @returns An array of all the companies the user has visited
 * @throws {
 *    BadRequestError: If the user ID is malformed,
 *    NotFoundError: If the user is not found,
 *    ServerError: If an unexpected error occurs
 * }
 */
export async function get100LatestVisitsByUser(fastify: FastifyInstance, userId: string): Promise<CompanyLastVisit[]> {
    let result: CompanyLastVisit[] = [];
    const client = await fastify.pg.connect();

    try {
        const res = await client.query<CompanyLastVisit>(`
            SELECT c.id, uv.visit_time
            FROM user_visits uv
            JOIN companies c on uv.company_id = c.id
            WHERE uv.user_id = $1
            ORDER BY uv.visit_time DESC
            LIMIT 100`,
            [userId]
        );
        if (res.rowCount) {
            result = res.rows;
        } if (await getUser(fastify, userId) === null) {
            throw new NotFoundError("User not found");
        }
    }
    catch (e) {
        if (e instanceof DatabaseError && e.code === '22P02') {
            throw new BadRequestError("Malformed User ID");
        }
        if (e instanceof NotFoundError) {
            throw e;
        }
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }

    return result;
}

export async function getUser(fastify: FastifyInstance, userId: string) {
    const client = await fastify.pg.connect();
    try {
        const res = await client.query(`
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
        console.error(e);
        throw new BadRequestError("Malformed User ID");
    } finally {
        client.release();
    }
}